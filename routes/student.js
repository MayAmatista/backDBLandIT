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

    courseSchema.findByIdAndUpdate(
        courseId,
        { $pull: { students: { _id: mongoose.mongo.ObjectId(studentId) } } },
        (error, success) => {
            if (error) {
                console.log(`el estudiante no se puede eliminar del curso ${error}`);
            } else {
                console.log('El estudiante fue eliminado del curso');
            }
        }
    )

    studentSchema.findByIdAndRemove(
        studentId,
        (error, success) => {
            if (error) {
                console.log(`El estudiante no pudo ser eliminado ${error}`);
            } else {
                console.log('El estudiante ha sido eliminado correctamente');
            }
        })

    courseSchema.findById(courseId, (error, course) => {
        console.log(course);
    })

})

//the best student of a course



module.exports = router;