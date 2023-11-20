
const mongoose = require('mongoose');
let userSchema = mongoose.Schema(
    {
        name :String,
        age: Number,
    }
);

// model
module.exports = mongoose.model('User', userSchema);