import React, { useState } from 'react';
import { Layout } from './Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [userRole, setUserRole] = useState('user');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: userRole,
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
    const value = e.target.value;
    const { type } = formData;
    setFormData({ ...formData, [type]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Perform form validations
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const storedData = JSON.parse(localStorage.getItem('usersData')) || [];
      const isEmailUnique = storedData.every((user) => user.email !== formData.email);

      if (isEmailUnique) {
        const newData = [...storedData, formData];
        localStorage.setItem('usersData', JSON.stringify(newData));
        console.log('Form data stored in local storage:', formData);
        toast.success('Register Success');
        setTimeout(()=>{
            navigate("/login")
        },1000)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          type: 'user',
          phone: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        console.log('Email is not unique. Handle accordingly.');
        toast.error('Email Already Exist');
      }
    }
  };

  return (
    <Layout>
      <div className="container-fluid bg-info p-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="p-4 border rounded" onSubmit={handleSubmit}>
              <h4 className="text-center mb-4">Register Form</h4>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? 'is-invalid' : ''
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="userType" className="form-label">
                  Category:
                </label>
                <select className="w-100" value={userRole} onChange={handleRoleChange}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
