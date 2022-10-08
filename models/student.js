const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    dni:{
        type: Number,
        required: true,
    },
    adress:{
        type: String,
        required: true,
    },
    note:{
        type: Number,
        require: false,
    }
})


module.exports = mongoose.model('Student', studentSchema)
