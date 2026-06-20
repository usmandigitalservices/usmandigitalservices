'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function UsmanDigitalAgency() {
  const v7_canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State Management
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; msg: string }>({
    type: 'idle',
    msg: ''
  });

  // Handle form submission through the secure server API route
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', msg: 'Please fill out all fields.' });
      return;
    }

    setFormStatus({ type: 'loading', msg: 'Sending Message , This may take a while...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setFormStatus({ type: 'success', msg: 'Message Sent Successfully. Our team will contact you shortly.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Database rejection');
      }
    } catch (error) {
      console.error(error);
      setFormStatus({
        type: 'error',
        msg: 'Connection issue. Looks like our servers are currently busy, please try again later...'
      });
    }
  };

  useEffect(() => {
    // Client-side Three.js dynamic script initialization
    import('three').then((THREE) => {
      if (!v7_canvasRef.current) return;

      const tiger_scene = new THREE.Scene();
      const owl_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      owl_camera.position.z = 6;

      const shark_renderer = new THREE.WebGLRenderer({
        canvas: v7_canvasRef.current,
        alpha: true,
        antialias: true
      });
      shark_renderer.setSize(window.innerWidth, window.innerHeight);
      shark_renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const lion_particleCount = 240;
      const eagle_geometry = new THREE.BufferGeometry();
      const wolf_positions = new Float32Array(lion_particleCount * 3);

      for (let i = 0; i < lion_particleCount * 3; i++) {
        wolf_positions[i] = (Math.random() - 0.5) * 14;
      }

      eagle_geometry.setAttribute('position', new THREE.BufferAttribute(wolf_positions, 3));

      const panther_material = new THREE.PointsMaterial({
        color: 0xa3e635,
        size: 0.035,
        transparent: true,
        opacity: 0.75
      });

      const bear_particleMesh = new THREE.Points(eagle_geometry, panther_material);
      tiger_scene.add(bear_particleMesh);

      let fox_mouseX = 0;
      let fox_mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        fox_mouseX = (event.clientX / window.innerWidth) - 0.5;
        fox_mouseY = (event.clientY / window.innerHeight) - 0.5;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const handleResize = () => {
        if (!v7_canvasRef.current) return;
        owl_camera.aspect = window.innerWidth / window.innerHeight;
        owl_camera.updateProjectionMatrix();
        shark_renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      const hawk_clock = new THREE.Clock();

      const animate = () => {
        const elapsedTime = hawk_clock.getElapsedTime();
        bear_particleMesh.rotation.y = elapsedTime * 0.04;
        bear_particleMesh.rotation.x = elapsedTime * 0.015;

        bear_particleMesh.position.x += (fox_mouseX * 1.2 - bear_particleMesh.position.x) * 0.05;
        bear_particleMesh.position.y += (-fox_mouseY * 1.2 - bear_particleMesh.position.y) * 0.05;

        shark_renderer.render(tiger_scene, owl_camera);
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        eagle_geometry.dispose();
        panther_material.dispose();
        shark_renderer.dispose();
      };
    });
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
        }

        .shark_logo span {
          color: #a3e635;
        }

        .lion_hero {
          padding: 10rem 0 8rem 0;
          max-width: 850px;
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
          margin-bottom: 2rem;
          letter-spacing: 0.05em;
        }

        .spark_icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .lion_title {
          font-size: 4rem;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 2.5rem;
        }

        .section_container {
          padding: 8rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section_header_label {
          color: #a3e635;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          display: block;
        }

        .section_main_heading {
          font-size: 2.5rem;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 3rem;
          max-width: 600px;
        }

        .zigzag_row {
          display: flex;
          align-items: center;
          gap: 4rem;
          margin-bottom: 8rem;
        }

        .zigzag_row.reverse {
          flex-direction: row-reverse;
        }

        .zigzag_content, .zigzag_visual_frame {
          flex: 1;
        }

        .zigzag_feature_title {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }

        .zigzag_feature_description {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .zigzag_visual_frame {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .zigzag_visual_grid_overlay {
          position: absolute;
          width: 200%;
          height: 200%;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 20px 20px;
          transform: rotate(-12deg);
        }

        .zigzag_visual_accent_shape {
          width: 140px;
          height: 140px;
          border: 1px solid rgba(163, 230, 53, 0.3);
          transform: rotate(45deg);
        }

        .zigzag_visual_accent_shape.sphere {
          border-radius: 50%;
        }

        .projects_deck_grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
        }

        .project_deck_card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .project_deck_card:hover {
          border-color: #a3e635;
        }

        .project_preview_box {
          height: 320px;
          background: #111216;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project_meta_box {
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .project_meta_title {
          font-size: 1.35rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .project_meta_tag {
          font-size: 0.8rem;
          color: #a3e635;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .team_layout_grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .team_member_card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 2.5rem;
          border-radius: 4px;
          text-align: center;
        }

        .team_member_avatar_placeholder {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 1px solid rgba(163, 230, 53, 0.4);
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(163, 230, 53, 0.02);
          color: #a3e635;
        }

        .team_member_name {
          font-size: 1.35rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .team_member_role {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }

        .team_member_expertise_badge {
          display: inline-block;
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          color: #a3e635;
        }

        .contact_form_layout_wrapper {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
        }

        .contact_info_sidebar_desc {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .contact_native_form {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .form_field_input_element {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.25rem;
          border-radius: 4px;
          color: #ffffff;
          font-family: 'Google Sans', sans-serif;
          font-size: 0.95rem;
          transition: border-color 0.3s ease;
        }

        .form_field_input_element:focus {
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

        .smart_cta_container {
          background: radial-gradient(circle at top right, rgba(163, 230, 53, 0.03), transparent);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 5rem;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 6rem;
        }

        .smart_cta_title {
          font-size: 3rem;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }

        .smart_cta_desc {
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 2.5rem auto;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .panther_cta_btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background-color: #ffffff;
          color: #060709;
          padding: 1.2rem 2.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-size: 1rem;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .panther_cta_btn:hover {
          background-color: #a3e635;
          transform: translateY(-2px);
        }

        @media (max-width: 968px) {
          .zigzag_row, .zigzag_row.reverse, .contact_form_layout_wrapper {
            flex-direction: column;
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .team_layout_grid, .projects_deck_grid {
            grid-template-columns: 1fr;
          }
          .lion_title { font-size: 2.75rem; }
          .smart_cta_title { font-size: 2.25rem; }
        }
      `}</style>

      {/* Embedded SVG Gemini Spark Asset Path Definition */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="gemini-spark" viewBox="0 0 24 24">
          <path d="M12 2c-.3 0-.6.2-.7.5L9.1 7.9 3.7 10.1c-.5.2-.7.7-.5 1.2.1.3.4.5.7.5l5.4 2.2 2.2 5.4c.2.5.7.7 1.2.5.3-.1.5-.4.5-.7l2.2-5.4 5.4-2.2c.5-.2.7-.7.5-1.2-.1-.3-.4-.5-.7-.5l-5.4-2.2-2.2-5.4c-.1-.3-.4-.5-.7-.5z" />
        </symbol>
      </svg>

      {/* Background Interactive Canvas Layer */}
      <canvas ref={v7_canvasRef} className="tiger_canvas_container" />

      {/* Base Structural View Layer UI */}
      <div className="owl_ui_layer">

        {/* Navigation Bar */}
        <header className="shark_navbar">
          <div className="shark_logo">
            Usman Digital Services<span>.</span>
          </div>
          <a href="/contact" className="panther_cta_btn">
            <svg className="spark_icon"><use href="#gemini-spark" /></svg>
            Start a Project
          </a>
        </header>

        {/* Hero Section */}
        <main>
          <section className="lion_hero">
            <div className="spark_badge">
              <svg className="spark_icon"><use href="#gemini-spark" /></svg>
              We Build Impressive Web Apps
            </div>
            <h1 className="lion_title">
              Everything You Need to Create a Website, Our Engineers, Freelancers and Developers Will take it from Here !
            </h1>
          </section>

          {/* About Us Section */}
          <section id="about" className="section_container">
            <span className="section_header_label">Performance Optimization For Everyone</span>
            <h2 className="section_main_heading">Our Engineers and Developers Will First Focus on Performance then Focus on Deployment</h2>
            <div className="zigzag_row">
              <div className="zigzag_content">
                <h3 className="zigzag_feature_title">Our Vision is our Support</h3>
                <p className="zigzag_feature_description">
                  At Usman Digital Services, we focus on deleviring high quality websites we do not just focus on development and deployment we actually focus on performance optimization, testing and making the websites bug-free and user-friendly to engage customers in a peaceful manner
                </p>
              </div>
              <div className="zigzag_visual_frame">
                <div className="zigzag_visual_grid_overlay" />
                <div className="zigzag_visual_accent_shape" />
              </div>
            </div>
          </section>

          {/* Zig-Zag Features Engine Array */}
          <section id="features" className="section_container">
            <span className="section_header_label">Budget Freindly Solutions for Business Owners</span>
            <h2 className="section_main_heading">Our Engineers and Developers Help Business Owners to Grow Online in Low Budget</h2>

            {/* Feature Node 1: Text Left / Image Right */}
            <div className="zigzag_row">
              <div className="zigzag_content">
                <div className="spark_badge">
                  <svg className="spark_icon"><use href="#gemini-spark" /></svg>
                  Our Main Service
                </div>
                <h3 className="zigzag_feature_title">Web Application Development</h3>
                <p className="zigzag_feature_description">
                  Our Engineers and Developers are truely focused on building smarter web applications in low-budget, we are interested to build AI powered web applications which launch SAAS to other peoples, we definity focus on solving the problems of users while using our apps
                </p>
              </div>
              <div className="">
                <Image
                  src="https://media.istockphoto.com/id/1491196684/photo/business-people-celebrating-success-in-an-office.jpg?s=612x612&w=0&k=20&c=zQ5Ps5nQWi3S2futnwyOoqLMFxPzE8B04WltyPB6RyI="
                  alt="img-performance"
                  width={640}
                  height={420}
                  className="responsive-image"
                />
              </div>
            </div>

            {/* Feature Node 2: Image Left / Text Right */}
            <div className="zigzag_row reverse">
              <div className="zigzag_content">
                <div className="spark_badge">
                  <svg className="spark_icon"><use href="#gemini-spark" /></svg>
                  Our AI Services
                </div>
                <h3 className="zigzag_feature_title">Next-Gen Whatsapp Bots</h3>
                <p className="zigzag_feature_description">
                  We primarly focused on building whatsapp chatbots for small and large businesses having their business 24/7 presence, our emergable AI chatbot helps the people to drive sales and get the rapid customers faster
                </p>
              </div>
              <div className="zigzag_visual_frame">
                <Image
                  src="https://burst.shopifycdn.com/photos/business-meeting-over-coffee.jpg?width=1000&format=pjpg&exif=0&iptc=0"
                  alt="img-chatbots"
                  width={640}
                  height={420}
                  className="responsive-image"
                />
              </div>
            </div>

            {/* Feature Node 3: Text Left / Image Right */}
            <div className="zigzag_row">
              <div className="zigzag_content">
                <div className="spark_badge">
                  <svg className="spark_icon"><use href="#gemini-spark" /></svg>
                  Our Another Premium Service
                </div>
                <h3 className="zigzag_feature_title">High-Fidelity 3D Modeling</h3>
                <p className="zigzag_feature_description">
                  We develop high fieldity Game Assets like 3D Models, characters, elements and other type of game assets, we are love to see our clients and customers happy when buying game assets from us and that is why we made our assets truely workable
                </p>
              </div>
              <div className="">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLjyIBKjkaQHTZN8qZ9BbYBzxy_-ypxN9bwGBXKOqwzXoXGhWPV_8NF_0&s=10"
                  alt="business-img"
                  width={640}
                  height={420}
                  className="responsive-image"
                />
              </div>
            </div>
          </section>

          {/* Recent Projects Section */}
          <section id="projects" className="section_container">
            <span className="section_header_label">Our Recent Works</span>
            <h2 className="section_main_heading">Here is What We Have Done in Last 6 Months for Clients</h2>
            <div className="projects_deck_grid">
              <div className="project_deck_card">
                <div className="">
                  <Image
                    src="https://sendbird.imgix.net/cms/best-chat-apps-to-know.jpg"
                    alt="chat-app"
                    width={640}
                    height={420}
                    className="responsive-image"
                  />
                </div>
                <div className="project_meta_box">
                  <h4 className="project_meta_title">24 Hours Chat App</h4>
                  <span className="project_meta_tag">PHP MySQL + Gemini API Integration</span>
                </div>
              </div>
              <div className="project_deck_card">
                <div>
                  <Image
                    src="https://www.typingcore.com/assets/img/custom-typing-test.webp"
                    alt="typing-test"
                    width={640}
                    height={420}
                    className="responsive-image"
                  />
                </div>
                <div className="project_meta_box">
                  <h4 className="project_meta_title">Typing Test PK</h4>
                  <span className="project_meta_tag">Next JS + Supabase</span>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="section_container">
            <span className="section_header_label">Our Respective Team Members</span>
            <h2 className="section_main_heading">We Have the Team to Take on Multiple Projects at a Time</h2>
            <div className="team_layout_grid">

              {/* Member 1 */}
              <div className="team_member_card">
                <div className="team_member_avatar_placeholder">
                  <Image src="/usman-img.png" alt="Muhammed Usman" width={110} height={110} />
                </div>
                <h4 className="team_member_name">Muhammed Usman</h4>
                <p className="team_member_role">Full Stack Developer</p>
                <span className="team_member_expertise_badge">MERN & Next.js Systems</span>
              </div>

              {/* Member 2 */}
              <div className="team_member_card">
                <div className="team_member_avatar_placeholder">
                  <Image src="/ali-img.png" alt="Ali Ahmed Khan" width={110} height={110} />
                </div>
                <h4 className="team_member_name">Ali Ahmed Khan</h4>
                <p className="team_member_role">Senior WordPress Developer</p>
                <span className="team_member_expertise_badge">Elementor and Themes</span>
              </div>

              {/* Member 3 */}
              <div className="team_member_card">
                <div className="team_member_avatar_placeholder">
                  <Image src="/husnain-img.png" alt="Husnain Ahmed Khan" width={110} height={110} />
                </div>
                <h4 className="team_member_name">Husnain Ahmed Khan</h4>
                <p className="team_member_role">3D Model Artist</p>
                <span className="team_member_expertise_badge">Blender and .GLB Models</span>
              </div>

            </div>
          </section>

          {/* Smart CTA Component Section */}
          <section className="section_container">
            <div className="smart_cta_container">
              <h2 className="smart_cta_title">Ready to launch your website?</h2>
              <p className="smart_cta_desc">
                Are you ready to see your first website live on your desired URL? We are here to help you to build and publish your website and drive sales rapidly through it
              </p>
              <a href="/contact" className="panther_cta_btn">
                <svg className="spark_icon"><use href="#gemini-spark" /></svg>
                Get Free Consultation
              </a>
            </div>
          </section>

          {/* Contact Section accompanied by Realtime Firebase Lead Submission Engine */}
          <section id="contact" className="section_container">
            <span className="section_header_label">We Are Available For You</span>
            <h2 className="section_main_heading">Contact Us to See Your Website Live, Our Engineers Will Take it From Here.</h2>

            <div className="contact_form_layout_wrapper">
              <div>
                <p className="contact_info_sidebar_desc">
                  Have a project in your mind? Lets connect and build something amazing that drive sales, keep the user prefrences maintained and keep the system secure for your business
                </p>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  <p style={{ marginBottom: '0.5rem' }}>Phone Number / Whatsapp: +923312021709</p>
                  <p>Facebook : https://www.facebook.com/profile.php?id=61591059058150</p>
                  <p>Instagram : https://www.instagram.com/usman_digitalservices/</p>
                </div>
              </div>

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
                  <textarea
                    placeholder="What is in your Mind ?"
                    className="form_field_input_element"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  {formStatus.type !== 'idle' && (
                    <div className={`form_status_notification_box ${formStatus.type}`}>
                      {formStatus.msg}
                    </div>
                  )}

                  <button type="submit" className="form_submit_trigger_button">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}