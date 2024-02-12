import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Registration() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    profileImage: null,
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const form = new FormData();
        for (let key in formData) {
          form.append(key, formData[key]);
        }
        console.log("formData");
        console.log(formData);
        const response = await fetch('http://103.148.157.74:33178/EcommerceWebApp/rest/userregisterapi/userRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data' // Specify Content-Type as multipart/form-data
          },
          body:form
        });
        if (response.ok) {
          // Registration successful, clear errors and form fields
          setErrors({});
          setFormData({
            fullName: '',
            mobileNumber: '',
            profileImage: null,
            emailAddress: '',
            password: '',
            confirmPassword: ''
          });
          alert('Registration successful');
          navigate("/login")
        } else {
          // Registration failed, handle error
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  const validateForm = (data) => {
    let errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!data.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(data.mobileNumber)) {
      errors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!data.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(data.emailAddress)) {
      errors.emailAddress = 'Email address is invalid';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const formDataToFormData = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };
  return (
    <div>
      <>
  {/* Checkout Start */}
  <div className="registration-container" style={{marginTop:"40px"}}>
  <div
  className="wrapper"
  style={{ backgroundImage: 'url("img/w13.jpg")' }}
>
      <div className="inner">
      <div className="image-holder">
  <img src="img/w14.jpg" alt=""  style={{ maxWidth:"100%"}}/>
  {/* Your content here */}
</div>
<form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
          />
          <i className="zmdi zmdi-account" />
          {errors.fullName && <span className="error" style={{color:"red"}}>{errors.fullName}</span>}
        </div>
        <div className="form-wrapper">
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            className="form-control"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <i className="zmdi zmdi-email" />
          {errors.mobileNumber && <span className="error" style={{color:"red"}}>{errors.mobileNumber}</span>}
        </div>
        <div className="form-wrapper text-left bg-color-dark">
          <p>Profile Image</p>
          <input
            type="file"
            name="profileImage"
            className="form-control"
            onChange={handleImageChange}
          />
          <i className="zmdi zmdi-email" />
          {errors.profileImage && <span className="error" style={{color:"red"}}>{errors.profileImage}</span>}
        </div>
        <div className="form-wrapper">
          <input
            type="text"
            name="emailAddress"
            placeholder="Email Address"
            className="form-control"
            value={formData.emailAddress}
            onChange={handleChange}
          />
          <i className="zmdi zmdi-email" />
          {errors.emailAddress && <span className="error" style={{color:"red"}}>{errors.emailAddress}</span>}
        </div>
        <div className="form-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
          <i className="zmdi zmdi-lock" />
          {errors.password && <span className="error" style={{color:"red"}}>{errors.password}</span>}
        </div>
        <div className="form-wrapper">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <i className="zmdi zmdi-lock" />
          {errors.confirmPassword && <span className="error" style={{color:"red"}}>{errors.confirmPassword}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
      </div>
    </div>
  </div>
  {/* Checkout End */}
</>

    </div>
  )
}