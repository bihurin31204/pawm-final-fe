import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Topics.css';
import { showLoginAlert } from '../utils/showLoginAlert';

function Topics() {
  const navigate = useNavigate();

  const topics = [
    { title: 'Gerak Parabola', id: 'projectile' },
    { title: 'Bandul Sederhana', id: 'pendulum' },
    { title: 'Gerak Harmonik Sederhana', id: 'harmonic' },
    { title: 'Hukum Newton', id: 'newton' },
    { title: 'Hukum Termodinamika', id: 'thermodynamics' },
    { title: 'Optika Geometris', id: 'optics' },
    { title: 'Gelombang dan Bunyi', id: 'waves' },
  ];

  const handleCardClick = async (topicId) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Gunakan POST untuk memperbarui lastSimulation
        const userData = { lastSimulation: topicId };
        await axios.post('https://pawm-final-be-production.up.railway.app/userstate', userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Setelah data berhasil diupdate, lakukan navigasi
        navigate(`/simulation/${topicId}`);
      } catch (error) {
        Swal.fire('Error', 'Terjadi kesalahan saat mengakses data.', 'error');
      }
    } else {
      showLoginAlert(() => navigate('/login')); // Tampilkan alert jika belum login
    }
  };

  return (
    <div className="topic-selection">
      <h2 className="section-title">Pilih Topik Simulasi</h2>
      <div className="grid-container">
        {topics.map((topic) => (
          <div key={topic.id} className="card" onClick={() => handleCardClick(topic.id)}>
            <h3>{topic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
