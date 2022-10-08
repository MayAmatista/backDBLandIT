const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    yearOfDictation:{
        type: Number,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    theme:{
        type: String,
        required: true
    },
    students:{
        type: Array,
        required: true,
        default: []
    }
})


module.exports = mongoose.model('Course', courseSchema)
