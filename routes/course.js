const express = require('express');
const courseSchema = require('../models/course');
const bodyParser = require('body-parser');
const { Router } = require('express');
const { db } = require('../models/course');

const router = express.Router();
const jsonParser = bodyParser.json()

//get all courses simplified

function getSimplifiedCourses(courses){
    return courses.map(course => {
        return { 
            "theme": course.theme, 
            "yearOfDictation": course.yearOfDictation 
        }
    })
}

router.get('/courses', (req, res) => {
    courseSchema
    .find()
    .then((data) => getSimplifiedCourses(data))
    .then((data) => res.json(data))
    .catch((error) => res.json({ message:error }));
})

//get all students in a course


router.get('/courses/:id/students', (req, res) => {
    const {id} = req.params;
    courseSchema
    .findById(id)
    .then(((data) => res.json(data.students)))
    .catch((error) => res.json({ message: error }));
})

//get a course
router.get('/courses/:id', (req, res) => {
    const {id} = req.params;
    courseSchema
    .findById(id)
    .then(((data) => res.json(data)))
    .catch((error) => res.json({ message: error }));
})

//add a course
router.post('/courses', jsonParser, (req, res) => {
    const course = courseSchema(req.body);
    course.save()
    .then(((data) => res.json(data)))
    .catch((error) => res.json({ message: error }));
})

//delete a course
router.delete('/courses/:id', (req, res) => {
    let courseId = req.params.id;

    courseSchema
    .findById(courseId, (error, course) => {
        if (error) res.status(500).send({message: `Error al borrar el curso ${error}`})

        course.remove(error => {
            if (error) res.status(500).send({message: `Error al borrar el curso ${error}`})
            res.status(200).send({message: 'El curso ha sido eliminado correctamente'})
        })
    })
})


module.exports = router;