import React, { useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Checkbox, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../assets/scss/pages/_auth.scss';
import googleIcon from "../assets/images/pages/google.svg";
import facebookIcon from "../assets/images/pages/facebook.svg";
import appleIcon from "../assets/images/pages/apple.svg";
import bgImage from "../assets/images/pages/bg-01.png";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { loggedIN } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    const [responseError, setResponseError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setResponseError('');

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username: formData.username,
      password: formData.password,
    });

    const access_token = response.data.access_token;
    const userData = response.data.user;

    // save token + user
    loggedIN(access_token, userData);

    // redirect
    navigate("/dashboard");

  } catch (error) {
    let errorMessage = "Login failed. Please try again.";

    // if server returned a response
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "Invalid username or password.";
      } else if (error.response.status === 422) {
        errorMessage = "Validation error. Please check your input.";
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
    } 
    // if no response (network/server down)
    else if (error.request) {
      errorMessage = "No response from server. Please try again later.";
    } 
    // request setup issue
    else {
      errorMessage = error.message;
    }

    setResponseError(errorMessage);
  } finally {
    setLoading(false);
  }
};


  const handleRoleSelect = (role) => {
    console.log(`Selected role: ${role}`); // Replace with actual role-setting logic
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`); // Replace with actual social login logic
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card-content">
          <div className="form-section">
            <div className="form-content">
              <h2 className="title">Sign in</h2>
              <p className="subtitle">Enter your credentials to log in</p>

              <div className="lbl-alert" style={{ marginBottom: '30px' }}>
                <Button
                  variant="contained"
                  className="adminBtn"
                  onClick={() => handleRoleSelect('admin')}
                  sx={{ marginRight: '10px' }} // Space between buttons
                >
                  Admin
                </Button>
                <Button
                  variant="contained"
                  className="doctorBtn"
                  onClick={() => handleRoleSelect('doctor')}
                  sx={{ marginRight: '10px' }} // Space between buttons
                >
                  Doctor
                </Button>
                <Button
                  variant="contained"
                  className="patientBtn"
                  onClick={() => handleRoleSelect('patient')}
                >
                  Patient
                </Button>
              </div>


             <form onSubmit={handleSubmit} className="auth-form">
  <TextField
    label="Username"
    variant="outlined"
    name="username"
    value={formData.username}
    onChange={handleChange}
    fullWidth
    margin="normal"
    required
    error={formData.username === '' && error}
    helperText={formData.username === '' && error ? 'Username is required' : ''}
    className="form-field"
  />
  <TextField
    label="Password"
    variant="outlined"
    name="password"
    type={showPassword ? 'text' : 'password'}
    value={formData.password}
    onChange={handleChange}
    fullWidth
    margin="normal"
    required
    error={formData.password === '' && error}
    helperText={formData.password === '' && error ? 'Password is required' : ''}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    className="form-field"
  />

  <div className="remember-forgot">
    <Checkbox
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      name="rememberMe"
    />
    <span>Remember me</span>
    <a
      href="/authentication/forgot-password"
      className="forgot-password-link"
      onClick={(e) => {
        e.preventDefault();
        navigate('/authentication/forgot-password');
      }}
    >
      Forgot Password?
    </a>
  </div>

  <Button
    variant="contained"
    type="submit"
    className="create-btn"
    disabled={formData.username === '' || formData.password === '' || loading}
  >
    {loading ? <CircularProgress size={20} className="btn-spinner" /> : 'Login'}
  </Button>

  {/* ✅ Show backend error here */}
  {responseError && (
    <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
      {responseError}
    </div>
  )}
</form>


              <div className="login-link">
                <span>Don't have an account? </span>
                <a
                  href="/authentication/signup"
                  className="login-text"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/authentication/signup');
                  }}
                >
                  Sign up
                </a>
              </div>

              <div className="social-login">
                <IconButton
                  className="social-btn"
                  onClick={() => handleSocialLogin('google')}
                >
                  <img
                    src={googleIcon}
                    alt="Google login"
                    width="20"
                    height="20"
                  />
                </IconButton>
                <IconButton
                  className="social-btn"
                  onClick={() => handleSocialLogin('facebook')}
                >
                  <img
                    src={facebookIcon}
                    alt="Facebook login"
                    width="20"
                    height="20"
                  />
                </IconButton>
                <IconButton
                  className="social-btn"
                  onClick={() => handleSocialLogin('apple')}
                >
                  <img
                    src={appleIcon}
                    alt="Apple login"
                    width="20"
                    height="20"
                  />
                </IconButton>
              </div>
            </div>
          </div>

          <div className="right-side-section">
            <img
              src={bgImage}
              alt="Login"
              className="right-side-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;