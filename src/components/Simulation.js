import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Simulation.css';

function Simulation() {
  const { topicId } = useParams();
  const canvasRef = useRef(null);
  const animationIdRef = useRef();

  // State variables for different simulations
  const [projectileParams, setProjectileParams] = useState({
    angle: 45,
    speed: 30,
  });

  const [pendulumParams, setPendulumParams] = useState({
    length: 200,
    angle: Math.PI / 4,
  });

  const [harmonicParams, setHarmonicParams] = useState({
    amplitude: 100,
    frequency: 0.05,
  });

  const [newtonParams, setNewtonParams] = useState({
    mass: 5,
    force: 20,
  });

  const [thermoParams, setThermoParams] = useState({
    temperature: 300,
  });

  const [opticsParams, setOpticsParams] = useState({
    objectDistance: 20,
    focalLength: 15,
  });

  const [wavesParams, setWavesParams] = useState({
    amplitude: 50,
    frequency: 0.02,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    switch (topicId) {
      case 'projectile':
        loadProjectileSimulation(ctx);
        break;
      case 'pendulum':
        loadPendulumSimulation(ctx);
        break;
      case 'harmonic':
        loadHarmonicSimulation(ctx);
        break;
      case 'newton':
        loadNewtonSimulation(ctx);
        break;
      case 'thermodynamics':
        loadThermodynamicsSimulation(ctx);
        break;
      case 'optics':
        loadOpticsSimulation(ctx);
        break;
      case 'waves':
        loadWavesSimulation(ctx);
        break;
      default:
        console.error('Topik tidak dikenali:', topicId);
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [
    topicId,
    projectileParams,
    pendulumParams,
    harmonicParams,
    newtonParams,
    thermoParams,
    opticsParams,
    wavesParams,
  ]);

  // Simulasi Gerak Parabola
  const loadProjectileSimulation = (ctx) => {
    const gravity = 9.8;
    let time = 0;
    const scale = 5;

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const { angle, speed } = projectileParams;
      const x = speed * Math.cos((angle * Math.PI) / 180) * time;
      const y =
        speed * Math.sin((angle * Math.PI) / 180) * time - 0.5 * gravity * time * time;

      ctx.beginPath();
      ctx.arc(x * scale, ctx.canvas.height - y * scale, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

      if (y >= 0) {
        time += 0.1;
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
    draw();
  };

  // Simulasi Bandul Sederhana
  const loadPendulumSimulation = (ctx) => {
    let { angle, length } = pendulumParams;
    const gravity = 9.8;
    const damping = 0.999;
    let angularVelocity = 0;

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const x = ctx.canvas.width / 2 + length * Math.sin(angle);
      const y = 50 + length * Math.cos(angle);

      // Draw the pendulum rod
      ctx.beginPath();
      ctx.moveTo(ctx.canvas.width / 2, 50);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Draw the pendulum bob
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();

      const angularAcceleration = (-1 * gravity / length) * Math.sin(angle);
      angularVelocity += angularAcceleration;
      angularVelocity *= damping;
      angle += angularVelocity;

      animationIdRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  // Simulasi Gerak Harmonik Sederhana
  const loadHarmonicSimulation = (ctx) => {
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const { amplitude, frequency } = harmonicParams;
      const x = amplitude * Math.sin(frequency * time);
      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2 + x, ctx.canvas.height / 2, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'green';
      ctx.fill();

      time += 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  // Simulasi Hukum Newton
  const loadNewtonSimulation = (ctx) => {
    const { mass, force } = newtonParams;
    const acceleration = force / mass;
    let velocity = 0;
    let position = 0;

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = 'orange';
      ctx.fillRect(position, ctx.canvas.height / 2 - 25, 50, 50);

      velocity += acceleration * 0.1;
      position += velocity;

      if (position + 50 < ctx.canvas.width) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
    draw();
  };

  // Simulasi Hukum Termodinamika
  const loadThermodynamicsSimulation = (ctx) => {
    const particles = [];
    const particleCount = 50;
    const { temperature } = thermoParams;
    const speed = Math.sqrt(temperature) / 2;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * ctx.canvas.width,
        y: Math.random() * ctx.canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= ctx.canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= ctx.canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'purple';
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  // Simulasi Optika Geometris
  const loadOpticsSimulation = (ctx) => {
    const { objectDistance, focalLength } = opticsParams;
    const scale = 5;
    const o = objectDistance;
    const f = focalLength;
    const i = (f * o) / (o - f);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw optical axis
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.strokeStyle = 'gray';
    ctx.stroke();

    // Draw lens
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - 100);
    ctx.quadraticCurveTo(ctx.canvas.width / 2 + 20, ctx.canvas.height / 2, ctx.canvas.width / 2, ctx.canvas.height / 2 + 100);
    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - 100);
    ctx.quadraticCurveTo(ctx.canvas.width / 2 - 20, ctx.canvas.height / 2, ctx.canvas.width / 2, ctx.canvas.height / 2 + 100);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw object
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 - o * scale, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width / 2 - o * scale, ctx.canvas.height / 2 - 80);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Draw image
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 + i * scale, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width / 2 + i * scale, ctx.canvas.height / 2 - (i / o) * 80);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // No animation needed for optics simulation
  };

  // Simulasi Gelombang dan Bunyi
  const loadWavesSimulation = (ctx) => {
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const { amplitude, frequency } = wavesParams;

      ctx.beginPath();

      for (let x = 0; x < ctx.canvas.width; x++) {
        const y = ctx.canvas.height / 2 + amplitude * Math.sin(frequency * (x + time));
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'blue';
      ctx.stroke();
      time += 5;
      animationIdRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  // Render controls based on the topic
  const renderControls = () => {
    switch (topicId) {
      case 'projectile':
        return (
          <div className="controls">
            <label>
              Sudut Peluncuran (°): {projectileParams.angle}
              <input
                type="range"
                min="0"
                max="90"
                value={projectileParams.angle}
                onChange={(e) =>
                  setProjectileParams({ ...projectileParams, angle: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              Kecepatan Awal (m/s): {projectileParams.speed}
              <input
                type="range"
                min="1"
                max="100"
                value={projectileParams.speed}
                onChange={(e) =>
                  setProjectileParams({ ...projectileParams, speed: parseInt(e.target.value) })
                }
              />
            </label>
          </div>
        );
      case 'pendulum':
        return (
          <div className="controls">
            <label>
              Panjang Tali (px): {pendulumParams.length}
              <input
                type="range"
                min="50"
                max="300"
                value={pendulumParams.length}
                onChange={(e) =>
                  setPendulumParams({ ...pendulumParams, length: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              Sudut Awal (°): {(pendulumParams.angle * 180) / Math.PI}
              <input
                type="range"
                min="-90"
                max="90"
                value={(pendulumParams.angle * 180) / Math.PI}
                onChange={(e) =>
                  setPendulumParams({
                    ...pendulumParams,
                    angle: (parseInt(e.target.value) * Math.PI) / 180,
                  })
                }
              />
            </label>
          </div>
        );
      case 'harmonic':
        return (
          <div className="controls">
            <label>
              Amplitudo: {harmonicParams.amplitude}
              <input
                type="range"
                min="10"
                max="200"
                value={harmonicParams.amplitude}
                onChange={(e) =>
                  setHarmonicParams({ ...harmonicParams, amplitude: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              Frekuensi: {harmonicParams.frequency.toFixed(2)}
              <input
                type="range"
                min="0.01"
                max="0.1"
                step="0.01"
                value={harmonicParams.frequency}
                onChange={(e) =>
                  setHarmonicParams({ ...harmonicParams, frequency: parseFloat(e.target.value) })
                }
              />
            </label>
          </div>
        );
      case 'newton':
        return (
          <div className="controls">
            <label>
              Massa (kg): {newtonParams.mass}
              <input
                type="range"
                min="1"
                max="10"
                value={newtonParams.mass}
                onChange={(e) =>
                  setNewtonParams({ ...newtonParams, mass: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              Gaya (N): {newtonParams.force}
              <input
                type="range"
                min="1"
                max="100"
                value={newtonParams.force}
                onChange={(e) =>
                  setNewtonParams({ ...newtonParams, force: parseInt(e.target.value) })
                }
              />
            </label>
          </div>
        );
      case 'thermodynamics':
        return (
          <div className="controls">
            <label>
              Temperatur (K): {thermoParams.temperature}
              <input
                type="range"
                min="100"
                max="500"
                value={thermoParams.temperature}
                onChange={(e) =>
                  setThermoParams({ ...thermoParams, temperature: parseInt(e.target.value) })
                }
              />
            </label>
          </div>
        );
      case 'optics':
        return (
          <div className="controls">
            <label>
              Jarak Benda (cm): {opticsParams.objectDistance}
              <input
                type="range"
                min="10"
                max="100"
                value={opticsParams.objectDistance}
                onChange={(e) =>
                  setOpticsParams({ ...opticsParams, objectDistance: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              Jarak Fokus (cm): {opticsParams.focalLength}
              <input
                type="range"
                min="5"
                max="50"
                value={opticsParams.focalLength}
                onChange={(e) =>
                  setOpticsParams({ ...opticsParams, focalLength: parseInt(e.target.value) })
                }
              />
            </label>
          </div>
        );
      case 'waves':
        return (
          <div className="controls">
            <label>
              Amplitudo: {wavesParams.amplitude}
              <input
                type="range"
                min="10"
                max="100"
                value={wavesParams.amplitude}
                onChange={(e) =>
                  setWavesParams({ ...wavesParams, amplitude: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              Frekuensi: {wavesParams.frequency.toFixed(2)}
              <input
                type="range"
                min="0.01"
                max="0.1"
                step="0.01"
                value={wavesParams.frequency}
                onChange={(e) =>
                  setWavesParams({ ...wavesParams, frequency: parseFloat(e.target.value) })
                }
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="simulation-container">
      <h2>Simulasi {topicId.charAt(0).toUpperCase() + topicId.slice(1)}</h2>
      {renderControls()}
      <canvas ref={canvasRef} id="simulation-canvas" width="800" height="400"></canvas>
    </div>
  );
}

export default Simulation;
