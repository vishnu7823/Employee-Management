import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import CreateEmployee from './Components/CreateEmployee/CreateEmployee';
import EmployeeEdit from './Components/EmployeeEdit/EmployeeEdit'; // Import the new component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EmployeeEdit />} /> {/* New route for editing an employee */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
