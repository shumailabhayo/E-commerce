import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API request to authenticate
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Handle successful login (e.g., save token, redirect)
        alert('Login successful!');
      } else {
        // Handle errors (invalid credentials)
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Box sx={{ maxWidth: 400, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography className='fw-bold' variant='h4' mb={2}>Sign In to E-Store</Typography>
        <Typography variant='h6' mb={3}>Welcome to FreshCart! Enter your email to get started.</Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              name='email'
              placeholder='Email'
              size='small'
              fullWidth
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
              type='password'
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
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
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>
        </form>

        <Typography className='mt-3' variant='h6'>
          Don’t have an account? <Link className='text-decoration-none' to="/sign-up">Sign Up</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default SignIn;
