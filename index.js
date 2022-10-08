const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const coursesRoutes = require('./routes/course');
const studentsRoutes = require('./routes/student')


const app = express();
const port = process.PORT || 4000;
app.use(cors());
app.use(coursesRoutes);
app.use(studentsRoutes);

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to Mongo DB Atlas'))
.catch((error) => console.error(error));

app.listen(4000, () => {
    console.log('Server started', port)
});