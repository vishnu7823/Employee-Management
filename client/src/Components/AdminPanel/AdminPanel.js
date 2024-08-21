import React, { useState } from 'react';
import './AdminPanel.css';
import CreateEmployee from '../CreateEmployee/CreateEmployee';
import EmployeeList from '../EmployeeList/EmployeeList'; // Import the EmployeeList component

function AdminPanel({ username, onLogout }) {
    const [activePage, setActivePage] = useState('home');

    const renderContent = () => {
        switch (activePage) {
            case 'home':
                return <h2>Welcome to Admin Panel</h2>;
            case 'createEmployee':
                return <CreateEmployee />;
            case 'employeeList':
                return <EmployeeList />; // Render EmployeeList when activePage is 'employeeList'
            default:
                return <h2>Welcome to Admin Panel</h2>;
        }
    };

    return (
        <div className="admin-panel">
            <nav className="navbar">
                <ul>
                    <li onClick={() => setActivePage('home')}>Home</li>
                    <li onClick={() => setActivePage('createEmployee')}>Create Employee</li>
                    <li onClick={() => setActivePage('employeeList')}>Employee List</li>
                </ul>
                <div className="user-info">
                    <span>{username}</span>
                    <button onClick={onLogout}>Logout</button>
                </div>
            </nav>
            <main className="content">
                {renderContent()}
            </main>
        </div>
    );
}

export default AdminPanel;
