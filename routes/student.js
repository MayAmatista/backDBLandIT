const express = require('express');
const studentSchema = require('../models/student');
const courseSchema = require('../models/course')
const bodyParser = require('body-parser');
const { Router } = require('express');
const { db, findById } = require('../models/student');
const { default: mongoose } = require('mongoose');

const router = express.Router();
const jsonParser = bodyParser.json()

//add a student

router.post('/courses/:id/students', jsonParser, (req, res) => {
    let courseId = req.params.id;

    const student = studentSchema(req.body);
    student.save()
        .then(((data) => res.json(data)))
        .catch((error) => res.json({ message: error }));

    courseSchema.findByIdAndUpdate(
        courseId,
        { $push: { students: student } },
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        }
    )

})

//delete a student

router.delete('/courses/:id/students/:idStudent', (req, res) => {
    let studentId = req.params.idStudent;
    let courseId = req.params.id;

    studentSchema.findByIdAndRemove(studentId)
    
    courseSchema.findByIdAndUpdate(
        courseId,
        { $pull: { students: { _id: mongoose.mongo.ObjectId(studentId) } } },
        (error, success) => {
            if (error) {
                res.json(error);
            } else {
                res.json(success);
            }
        }
    )
})


module.exports = router;