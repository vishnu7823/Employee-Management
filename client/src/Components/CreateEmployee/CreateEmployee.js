import React, { useState } from 'react';
import './createEmployee.css';

function CreateEmployee() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        courses: [],
        image: null
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            let updatedCourses = [...formData.courses];
            if (checked) {
                updatedCourses.push(value);
            } else {
                updatedCourses = updatedCourses.filter(course => course !== value);
            }
            setFormData({ ...formData, courses: updatedCourses });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Mobile validation
        if (!formData.mobileNo.trim()) {
            newErrors.mobileNo = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            newErrors.mobileNo = 'Mobile number should be 10 digits';
        }

        // Designation validation
        if (!formData.designation) {
            newErrors.designation = 'Designation is required';
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        // Course validation
        if (formData.courses.length === 0) {
            newErrors.courses = 'At least one course must be selected';
        }

        // Image validation
        if (!formData.image) {
            newErrors.image = 'Image is required';
        } else if (!['image/jpeg', 'image/png'].includes(formData.image.type)) {
            newErrors.image = 'Only JPG and PNG files are allowed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the data to your server
            console.log('Form submitted:', formData);
            // Simulating an API call to check for duplicate email
            await new Promise(resolve => setTimeout(resolve, 1000));
            const isDuplicateEmail = false; // This should be checked on the server
            if (isDuplicateEmail) {
                setErrors({ ...errors, email: 'This email is already in use' });
            } else {
                alert('Employee created successfully!');
                // Reset form or redirect
            }
        }
    };

    return (
        <div className="create-employee">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="mobileNo">Mobile No</label>
                    <input
                        type="tel"
                        id="mobileNo"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                    />
                    {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <select
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {errors.designation && <span className="error">{errors.designation}</span>}
                </div>

                <div className="gender-course-container">
                    <div className="gender-group">
                        <label>Gender</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            /> Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            /> Female
                        </label>
                        {errors.gender && <span className="error">{errors.gender}</span>}
                    </div>

                    <div className="course-group">
                        <label>Course</label>
                        <label>
                            <input
                                type="checkbox"
                                name="courses"
                                value="MCA"
                                checked={formData.courses.includes('MCA')}
                                onChange={handleChange}
                            /> MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="courses"
                                value="BCA"
                                checked={formData.courses.includes('BCA')}
                                onChange={handleChange}
                            /> BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="courses"
                                value="BSC"
                                checked={formData.courses.includes('BSC')}
                                onChange={handleChange}
                            /> BSC
                        </label>
                        {errors.courses && <span className="error">{errors.courses}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image Upload</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/jpeg,image/png"
                        onChange={handleChange}
                    />
                    {errors.image && <span className="error">{errors.image}</span>}
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default CreateEmployee;
