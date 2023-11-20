const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const User = require("./models/user")


//connection a mongodb atlas
const MONGODB_URL= process.env.MONGODB_URL;

class Database {
  constructor() {
    this._connect()
  }
_connect() {
    mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("mongodb connecter");
}).catch(err=> console.log("erreur de connexion" + err))
  }
}
module.exports = new Database();

// User.create([
//     {
//         name:"halia",
//         age:13,
//     },
//     {
//         name:"osko",
//         age:68
//     },

//     {
//         name:"willeme",
//         age:46
//     }
// ]);


//creer les routes

// afficher
router.get('/userList', function(req, res) {    
    User.find({}, function (err, user) {
        res.send(user);
    });
});

// create new user
router.post('/create', function(req, res, next) {

    let user = new User({
        name:"issa",
        age:12,
    })
    user.save().then(()=> {
        console.log('creer');
        return res.json({
            success: true,
            response : "user creer avec succes"
        })
    })
    .catch(err => {
        console.error(err);
        return res.json({
            success : false,
            response : err.message
        }, 500)
    })

})

// methode put

const updateUser = async (req,res,next) => {
    if (req.params.id === req.user.id) {
      try {
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
          $set:req.body,
        })
        res.status(200).json(updateuser)
      } catch (error) {
        next(error)
      }
    }
  }
router.put("/",()=>{
    res.send(updateUser)
})


//delete

router.delete("/delete", function(req,res){
    var issa = req.body.userIssa;
    User.remove({name: issa }, function(err, user){
        if(err){
            console.log(err)
        } else {
            console.log(user);
        }
    }).exec();
});

module.exports = router;

app.get("/",(req,res)=>{
    res.send("bienvenue ")
})

app.listen(PORT,()=>{
    console.log("connection reussir "+ PORT);
})