const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Replace with your MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://sehrishfuad:2winklE%40@cluster0.w5cuin6.mongodb.net/formData?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Define a schema for the form data
const formSchema = new mongoose.Schema({
    name: String,
    whatsapp: String,
    email: String
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const formData = new FormData({
        name: req.body.name,
        whatsapp: req.body.whatsapp,
        email: req.body.email
    });

    try {
        await formData.save();
        res.send('Form data received and saved.');
    } catch (err) {
        console.error('Error saving data:', err.message);
        res.status(500).send('Error saving data.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
