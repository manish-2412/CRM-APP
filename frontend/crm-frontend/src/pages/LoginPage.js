import React from 'react';
import { useNavigate } from 'react-router-dom';  // Use `useNavigate` from React Router v6
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();  // Use navigate instead of history

  // Handle Google login button click
  const handleGoogleLogin = () => {
    // Redirect to the backend Google OAuth route
    window.location.href = 'http://localhost:3000/auth/google';
  };

  // Handle form-based login
  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:3000/api/login', data);

      if (response.data.success) {
        // On successful login, navigate to the profile page
        navigate('/profile');
      } else {
        // Show an alert if credentials are invalid
        alert('Invalid credentials');
      }
    } catch (err) {
      // Show an alert if there's an error with the request
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="google-login-btn"
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          backgroundColor: '#4285F4',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Login with Google
      </button>

      <div className="divider" style={{ textAlign: 'center', margin: '20px 0' }}>
        <span style={{ fontSize: '14px', color: '#888' }}>OR</span>
      </div>

      {/* Manual Login Form */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ fontSize: '14px', color: '#555' }}>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px',
            }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ fontSize: '14px', color: '#555' }}>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
