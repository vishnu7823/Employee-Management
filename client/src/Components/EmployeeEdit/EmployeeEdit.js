import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./EmployeeEdit.css"

function EmployeeEditForm() {
    const { id } = useParams(); // Get the employee ID from the route
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [],
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/employees/${id}`)
            .then(response => response.json())
            .then(data => setEmployee(data))
            .catch(error => console.error('Error fetching employee data:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            course: checked
                ? [...prevEmployee.course, value]
                : prevEmployee.course.filter(course => course !== value)
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setEmployee({ ...employee, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        .then(response => {
            if (response.ok) {
                navigate('/employee-list');
            } else {
                console.error('Failed to update employee');
            }
        })
        .catch(error => console.error('Error updating employee:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={employee.name} onChange={handleChange} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={employee.email} onChange={handleChange} />
            </div>
            <div>
                <label>Mobile No</label>
                <input type="text" name="mobileNo" value={employee.mobileNo} onChange={handleChange} />
            </div>
            <div>
                <label>Designation</label>
                <select name="designation" value={employee.designation} onChange={handleChange}>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
            </div>
            <div>
                <label>Gender</label>
                <input type="radio" name="gender" value="M" checked={employee.gender === 'M'} onChange={handleChange} /> M
                <input type="radio" name="gender" value="F" checked={employee.gender === 'F'} onChange={handleChange} /> F
            </div>
            <div>
                <label>Course</label>
                <input type="checkbox" name="course" value="MCA" checked={employee.course.includes('MCA')} onChange={handleCheckboxChange} /> MCA
                <input type="checkbox" name="course" value="BCA" checked={employee.course.includes('BCA')} onChange={handleCheckboxChange} /> BCA
                <input type="checkbox" name="course" value="BSC" checked={employee.course.includes('BSC')} onChange={handleCheckboxChange} /> BSC
            </div>
            <div>
                <label>Image Upload</label>
                <input type="file" onChange={handleImageChange} />
            </div>
            <button type="submit">Update</button>
        </form>
    );
}

export default EmployeeEditForm;
