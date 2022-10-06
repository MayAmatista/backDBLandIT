const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    year_of_dictation:{
        type: Number,
        required: true,
        default: 2022
    },
    duration:{
        type: String,
        required: true,
        default: ''
    },
    theme:{
        type: String,
        required: true,
        default: ''
    },
    students:{
        type: Array,
        required: true,
        default: []
    }
})


module.exports = mongoose.model('Course', courseSchema)
