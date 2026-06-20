'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Firebase configuration is stored securely on the server.

export default function ContactUsPage() {
  const v7_canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State Management Configuration
  const [formData, setFormData] = useState({ name: '', email: '', service: 'web-design', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; msg: string }>({
    type: 'idle',
    msg: ''
  });

  // Handle Form Submission via Firebase REST API
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', msg: 'Please fill out all fields !' });
      return;
    }

    setFormStatus({ type: 'loading', msg: 'Sending Message , this may take a while...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({ type: 'success', msg: 'Message Sent Successfully !' });
        setFormData({ name: '', email: '', service: 'web-design', message: '' });
      } else {
        throw new Error('Looks Like Server is busy, please try again or contact us for quick support : +923312021709');
      }
    } catch (error) {
      console.error(error);
      setFormStatus({
        type: 'error',
        msg: 'Looks Like Server is busy, please try again or contact us for quick support : +923312021709'
      });
    }
  };

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let shark_renderer: any = null;
    let owl_camera: any = null;
    let eagle_geometry: any = null;
    let panther_material: any = null;
    let bear_particleMesh: any = null;
    let animationFrameId: number | null = null;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    let fox_mouseX = 0;
    let fox_mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      fox_mouseX = event.clientX / window.innerWidth - 0.5;
      fox_mouseY = event.clientY / window.innerHeight - 0.5;
    };

    const handleResize = () => {
      if (!v7_canvasRef.current || !owl_camera || !shark_renderer) return;
      owl_camera.aspect = window.innerWidth / window.innerHeight;
      owl_camera.updateProjectionMatrix();
      shark_renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const initThree = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const THREE = await import('three');
      if (!v7_canvasRef.current) return;

      const tiger_scene = new THREE.Scene();
      owl_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      owl_camera.position.z = 5;

      shark_renderer = new THREE.WebGLRenderer({
        canvas: v7_canvasRef.current,
        alpha: true,
        antialias: true
      });
      shark_renderer.setSize(window.innerWidth, window.innerHeight);
      shark_renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const lion_particleCount = 120;
      eagle_geometry = new THREE.BufferGeometry();
      const wolf_positions = new Float32Array(lion_particleCount * 3);
      for (let i = 0; i < lion_particleCount * 3; i++) {
        wolf_positions[i] = (Math.random() - 0.5) * 10;
      }
      eagle_geometry.setAttribute('position', new THREE.BufferAttribute(wolf_positions, 3));

      panther_material = new THREE.PointsMaterial({
        color: 0xa3e635,
        size: 0.035,
        transparent: true,
        opacity: 0.6
      });

      bear_particleMesh = new THREE.Points(eagle_geometry, panther_material);
      tiger_scene.add(bear_particleMesh);

      const hawk_clock = new THREE.Clock();

      const animate = () => {
        if (!bear_particleMesh || !shark_renderer || !owl_camera) return;
        const elapsedTime = hawk_clock.getElapsedTime();
        bear_particleMesh.rotation.y = elapsedTime * 0.03;
        bear_particleMesh.rotation.x = elapsedTime * 0.01;

        bear_particleMesh.position.x += (fox_mouseX - bear_particleMesh.position.x) * 0.05;
        bear_particleMesh.position.y += (-fox_mouseY - bear_particleMesh.position.y) * 0.05;

        shark_renderer.render(tiger_scene, owl_camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      animate();
    };

    initThree();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (eagle_geometry) eagle_geometry.dispose();
      if (panther_material) panther_material.dispose();
      if (shark_renderer) shark_renderer.dispose();
    };
  }, []);

  return (
    <div className="v7_agency_wrapper">
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/google-sans');
        
        .v7_agency_wrapper {
          font-family: 'Google Sans', sans-serif;
          font-weight: 400;
          font-style: normal;
          background-color: #060709;
          color: #f1f5f9;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .tiger_canvas_container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .owl_ui_layer {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .shark_navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.5rem 0;
        }

        .shark_logo {
          font-size: 1.25rem;
          color: #ffffff;
          letter-spacing: -0.025em;
          text-decoration: none;
        }

        .shark_logo span {
          color: #a3e635;
        }

        .contact_hero_container {
          padding: 6rem 0 4rem 0;
        }

        .spark_badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(163, 230, 53, 0.06);
          border: 1px solid rgba(163, 230, 53, 0.2);
          color: #a3e635;
          font-size: 0.85rem;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
        }

        .spark_icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .contact_main_title {
          font-size: 3.5rem;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .contact_subtitle {
          color: #94a3b8;
          font-size: 1.1rem;
          max-width: 600px;
          line-height: 1.6;
        }

        .contact_split_grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 5rem;
          padding: 4rem 0 8rem 0;
        }

        .sidebar_cards_stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar_info_card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 4px;
        }

        .card_label_text {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #a3e635;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 0.75rem;
        }

        .card_main_detail_text {
          font-size: 1.2rem;
          color: #ffffff;
          line-height: 1.5;
        }

        .contact_native_form {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3.5rem;
          border-radius: 6px;
        }

        .form_field_input_element, .form_field_select_element {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.25rem;
          border-radius: 4px;
          color: #ffffff;
          font-family: 'Google Sans', sans-serif;
          font-size: 0.95rem;
          transition: border-color 0.3s ease;
        }

        .form_field_select_element option {
          background-color: #060709;
          color: #ffffff;
        }

        .form_field_input_element:focus, .form_field_select_element:focus {
          outline: none;
          border-color: #a3e635;
        }

        .form_submit_trigger_button {
          background: #ffffff;
          color: #060709;
          padding: 1.25rem;
          border-radius: 4px;
          border: none;
          font-family: 'Google Sans', sans-serif;
          font-size: 0.95rem;
          cursor: pointer;
          font-weight: 400;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .form_submit_trigger_button:hover {
          background: #a3e635;
          transform: translateY(-1px);
        }

        .form_status_notification_box {
          padding: 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .form_status_notification_box.success {
          background: rgba(163, 230, 53, 0.1);
          border: 1px solid rgba(163, 230, 53, 0.3);
          color: #a3e635;
        }

        .form_status_notification_box.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .form_status_notification_box.loading {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
        }

        .back_home_link_btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .back_home_link_btn:hover {
          color: #a3e635;
        }

        @media (max-width: 968px) {
          .contact_split_grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact_main_title {
            font-size: 2.5rem;
          }
          .contact_native_form {
            padding: 2rem;
          }
        }
      `}</style>

      {/* Embedded SVG Gemini Spark Asset Path Definition */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="gemini-spark" viewBox="0 0 24 24">
          <path d="M12 2c-.3 0-.6.2-.7.5L9.1 7.9 3.7 10.1c-.5.2-.7.7-.5 1.2.1.3.4.5.7.5l5.4 2.2 2.2 5.4c.2.5.7.7 1.2.5.3-.1.5-.4.5-.7l2.2-5.4 5.4-2.2c.5-.2.7-.7.5-1.2-.1-.3-.4-.5-.7-.5l-5.4-2.2-2.2-5.4c-.1-.3-.4-.5-.7-.5z" />
        </symbol>
      </svg>

      {/* 3D WebGL Background Canvas */}
      <canvas ref={v7_canvasRef} className="tiger_canvas_container" />

      {/* Main Content Interface Layer */}
      <div className="owl_ui_layer">

        {/* Navbar */}
        <header className="shark_navbar">
          <Link href="/" className="shark_logo">
            Usman Digital Services<span>.</span>
          </Link>
          <Link href="/" className="back_home_link_btn">
            ← Return to Home
          </Link>
        </header>

        {/* Hero Header Area */}
        <section className="contact_hero_container">
          <div className="spark_badge">
            <svg className="spark_icon"><use href="#gemini-spark" /></svg>
            Contact Us
          </div>
          <h1 className="contact_main_title">Build Something Amazing Together.</h1>
          <p className="contact_subtitle">
            Contact our engineers , freelancers and developers to get the benefit of free 30 minutes consulation and get a free landing page for your product, we are happy to welcome you !
          </p>
        </section>

        {/* Contact Page Content Split Layout */}
        <section className="contact_split_grid">

          {/* Left Column: Essential Corporate Info Nodes */}
          <div className="sidebar_cards_stack">
            <div className="sidebar_info_card">
              <span className="card_label_text">Where we are currently based</span>
              <p className="card_main_detail_text">Karachi, Pakistan</p>
            </div>

            <div className="sidebar_info_card">
              <span className="card_label_text">Our Email ( Recommended for Fast Response )</span>
              <p className="card_main_detail_text">usmandigitalservices@gmail.com</p>
            </div>

            <div className="sidebar_info_card">
              <span className="card_label_text">Our Phone Number:</span>
              <p className="card_main_detail_text" style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
                +923312021709
              </p>
            </div>
          </div>

          {/* Right Column: High-Fidelity Firebase Web Form */}
          <div>
            <form className="contact_native_form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="form_field_input_element"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="form_field_input_element"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <select
                className="form_field_select_element"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="web-design">Web Design & Full-Stack Development</option>
                <option value="ai-agents">n8n AI Agents & Ecosystem Automation</option>
                <option value="wordpress">WordPress Customized Systems</option>
                <option value="3d-modeling">Spatial 3D Asset Modeling</option>
                <option value="visuals-motion">Graphic Design & Video Editing Production</option>
              </select>

              <textarea
                placeholder="What's in your Mind ?"
                className="form_field_input_element"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              {formStatus.type !== 'idle' && (
                <div className={`form_status_notification_box ${formStatus.type}`}>
                  {formStatus.msg}
                </div>
              )}

              <button type="submit" className="form_submit_trigger_button">
                <svg className="spark_icon"><use href="#gemini-spark" /></svg>
                Send a Message
              </button>
            </form>
          </div>

        </section>
      </div>
    </div>
  );
}