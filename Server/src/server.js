const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());

app.use(express.json()); // To parse JSON bodies

// Replace with your MongoDB Atlas connection string
const uri = 'mongodb+srv://vishnu7823:Classic350$@vishnu-cluster.wayza86.mongodb.net/?retryWrites=true&w=majority&appName=vishnu-cluster'

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define a schema for the employee
const employeeSchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuidv4 }, // Custom unique ID
    name: String,
    email: String,
    mobileNo: String,
    designation: String,
    gender: String,
    course: String,
    image: String, // Store image as a base64 string or URL
    createDate: { type: Date, default: Date.now }
});

// Create a model for the employee
const Employee = mongoose.model('Employee', employeeSchema);

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
    const { name, email, mobileNo, designation, gender, course, image } = req.body;

    const employee = new Employee({
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        image // Image as base64 string or URL
    });

    try {
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an employee by ID
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        await employee.remove();
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
