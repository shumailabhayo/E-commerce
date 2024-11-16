import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const SignUp = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Simple form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.secondName) newErrors.secondName = 'Second Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is not valid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Don't submit if form is invalid

    setLoading(true);
    // Here, you would call your API for registration
    try {
      // Assuming you're using fetch to call your backend API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        alert('Sign Up successful!');
      } else {
        // Handle error (e.g., user already exists)
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error during sign-up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Box sx={{ maxWidth: 400, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography className='fw-bold' variant='h4' mb={2}>Get Started Shopping</Typography>
        <Typography variant='h6' mb={3}>Welcome to FreshCart! Enter your email to get started.</Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              name='firstName'
              placeholder='First Name'
              size='small'
              fullWidth
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Box>

          <Box mb={2}>
            <TextField
              name='secondName'
              placeholder='Second Name'
              size='small'
              fullWidth
              value={formData.secondName}
              onChange={handleInputChange}
              error={!!errors.secondName}
              helperText={errors.secondName}
            />
          </Box>

          <Box mb={2}>
            <TextField
              name='email'
              placeholder='Email'
              size='small'
              fullWidth
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>

          <Box mb={2}>
            <TextField
              name='password'
              placeholder='Password'
              size='small'
              fullWidth
              type={ShowPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={() => setShowPassword(!ShowPassword)} sx={{ cursor: 'pointer' }}>
                    <VisibilityIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={3}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            Already have an account? <a href="/login">Log In</a>
          </Typography>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;