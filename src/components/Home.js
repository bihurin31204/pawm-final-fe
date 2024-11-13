// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Menggunakan App.css untuk konsistensi

function Home() {
  return (
    <section className="home">
      <div className="content">
        <h3>Virtual Lab Fisika</h3>
        <p>
          Virtual Lab Fisika adalah platform inovatif yang digunakan sebagai media pembelajaran
          dan praktikum fisika berbasis digital. Platform ini menyediakan berbagai simulasi
          interaktif untuk membantu memahami konsep fisika dengan lebih mudah dan menyenangkan.
        </p>
        <Link to="/topics" className="btn">Mulai Belajar</Link>
      </div>
    </section>
  );
}

export default Home;
