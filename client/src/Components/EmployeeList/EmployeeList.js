import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/employees') // Ensure the URL matches your backend
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching employee data:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/employees/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setEmployees(employees.filter(employee => employee._id !== id));
            } else {
                console.error('Failed to delete employee');
                // Optionally, you can throw an error here to trigger the catch block
                throw new Error('Failed to delete employee');
            }
        })
        .catch(error => {
            console.error('Error deleting employee:', error);
            // Optionally, you can show an error message to the user here
        });
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.mobileNo.includes(searchTerm)
    );

    const handleCreateEmployee = () => {
        navigate('/create-employee');
    };

    return (
        <div className="employee-list-container">
            <header className="employee-list-header">
                <h1>Employee List</h1>
                <div className="header-actions">
                    <div>Total Count: {employees.length}</div>
                    <button className="create-employee-button" onClick={handleCreateEmployee}>Create Employee</button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter Search Keyword"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.uniqueId}</td>
                            <td><img src={employee.image || "/path/to/default/avatar.png"} alt={employee.name} className="employee-avatar" /></td>
                            <td>{employee.name}</td>
                            <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
                            <td>{employee.mobileNo}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course}</td>
                            <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-employee/${employee._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
