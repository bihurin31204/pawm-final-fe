// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Topics from './Topics';
import Simulation from './Simulation';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fungsi login
  const login = async (credentials) => {
    try {
      const response = await axios.post('https://pawm-final-be-production.up.railway.app/login', credentials);
      const { token, userData } = response.data;
      localStorage.setItem('token', token); // Simpan token di localStorage
      setUser(userData);
      setIsAuthenticated(true); // Setel status otentikasi
      navigate('/'); // Alihkan ke halaman utama setelah login
    } catch (error) {
      console.error("Login gagal:", error.response?.data?.error);
    }
  };

  // Fungsi register
  const register = async (userData) => {
    try {
      await axios.post('https://pawm-final-be-production.up.railway.app/register', userData);
      alert('Registrasi berhasil. Silakan login.');
    } catch (error) {
      console.error("Registrasi gagal:", error.response?.data?.error);
    }
  };

  // Fungsi logout
  const logout = () => {
    localStorage.removeItem('token'); // Hapus token
    setUser(null);
    setIsAuthenticated(false); // Reset status otentikasi
    navigate('/'); // Alihkan ke halaman utama
  };

  // Fetch user data saat komponen mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://pawm-final-be-production.up.railway.app/userstate', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Gagal mengambil data pengguna:", error);
          logout();
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <Link to="/" className="logo">V-<span>Lab Fisika</span></Link>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/topics">Simulasi</Link>
          {isAuthenticated ? (
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics isAuthenticated={isAuthenticated} />} />
        <Route path="/simulation/:topicId" element={<Simulation />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register register={register} />} />
      </Routes>
    </div>
  );
}

export default App;
