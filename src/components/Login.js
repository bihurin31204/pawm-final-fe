// src/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AuthForm.css';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ username, password });
    } catch (error) {
      console.error("Login Error:", error); // Log error for debugging
      Swal.fire({
        title: 'Login Gagal',
        text: error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : 'Terjadi kesalahan saat login. Coba lagi.',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">
          Belum punya akun? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
