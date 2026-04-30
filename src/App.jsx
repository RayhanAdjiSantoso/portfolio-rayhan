import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
// Foto profil  → letakkan di public/images/profile.jpg
// Thumbnail    → letakkan di public/images/thumb-1.jpg s/d thumb-6.jpg
const data = {
  name: "Rayhan Adji Santoso",
  title: "Data Scientist & Full-Stack Developer",
  bio: "Informatics Engineering graduate from Parahyangan Catholic University with expertise in Data Science and full-stack web development. Skilled in building analytics pipelines, BI dashboards, and data-driven web applications using Python, R, SQL, React.js, and PostgreSQL.",
  profilePhoto: "/images/profile.jpg",
  email: "rayhanadjis@gmail.com",
  phone: "+62 812-2240-4877",
  linkedin: "https://www.linkedin.com/in/rayhan-adji-santoso",
  github: "https://github.com/RayhanAdjiSantoso",
  instagram: "https://instagram.com/rayhanadjii",
  skills: [
    { name: "Python",             icon: "🐍", level: 85, category: "Programming Language" },
    { name: "R",                  icon: "📊", level: 80, category: "Programming Language" },
    { name: "SQL",                icon: "🗄️", level: 85, category: "Programming Language" },
    { name: "JavaScript",         icon: "⚡", level: 78, category: "Programming Language" },
    { name: "Java",               icon: "☕", level: 65, category: "Programming Language" },
    { name: "English",            icon: "🇬🇧", level: 88, category: "Language", badge: "TOEFL 557 · TOEIC 790" },
    { name: "Japanese",           icon: "🇯🇵", level: 45, category: "Language", badge: "JLPT N4" },
    { name: "React.js",           icon: "⚛️", level: 82, category: "Framework" },
    { name: "Node.js",            icon: "🟢", level: 75, category: "Framework" },
    { name: "PostgreSQL",         icon: "🐘", level: 80, category: "Database" },
    { name: "MySQL",              icon: "🐬", level: 75, category: "Database" },
    { name: "Data Analysis",      icon: "🔍", level: 85, category: "Analytics" },
    { name: "Data Visualization", icon: "📈", level: 82, category: "Analytics" },
    { name: "Machine Learning",   icon: "🤖", level: 75, category: "Analytics" },
    { name: "Dashboard Dev",      icon: "🖥️", level: 80, category: "Analytics" },
    { name: "REST API",           icon: "🔗", level: 78, category: "Web Dev" },
  ],
  experience: [
    {
      title: "Junior Analyst & Web Developer Intern",
      company: "PT Pos Indonesia (Persero)",
      period: "Aug 2025 – Dec 2025",
      location: "Bandung, Indonesia",
      description: "Engineered a web-based package delivery routing optimization system using OpenStreetMap and OSRM. Built interactive map visualizations and implemented QR code-based data privacy features, reducing unauthorized data exposure to near zero.",
      color: "#2563eb",
    },
    {
      title: "Data Analyst & Web Developer Intern",
      company: "The Jarrdin @Cihampelas Apartment",
      period: "Jan 2025 – Aug 2025",
      location: "Bandung, Indonesia",
      description: "Designed a full-stack IPL management system digitalizing payment tracking for 500+ residential units. Integrated PostgreSQL and MySQL, reducing report generation time from hours to minutes with interactive PDF visualizations.",
      color: "#7c3aed",
    },
    {
      title: "IT Support Intern",
      company: "PT LSP IND Logistik Indonesia",
      period: "Jul 2024 – Sep 2024",
      location: "Bandung, Indonesia",
      description: "Managed certification information systems and data. Provided maintenance and development of IT-based applications, along with technical assistance for certification activities.",
      color: "#0891b2",
    },
    {
      title: "System Administrator Intern",
      company: "PT Nur Ramadhan Bandung",
      period: "Mar 2024 – Jun 2024",
      location: "Bandung, Indonesia",
      description: "Managed and updated customer data, provided operational support for information systems and travel administration. Managed company content and digital systems.",
      color: "#059669",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Run Tracker Web Application",
      type: "Web-Based Programming Course",
      description: "Web app to record and manage running activities with CRUD, user auth, activity dashboards with charts, PDF export, and race management with participant rankings.",
      tech: ["JavaScript", "HTML", "CSS", "PostgreSQL"],
      videoUrl: "/videos/1st-Project.mp4",
      thumbnail: "/images/thumb-1.jpg",
      color: "#b91c1c",
    },
    {
      id: 2,
      title: "Citation Data Mining & Visualization",
      type: "Data Science Course Final Project",
      description: "Mined UNPAR lecturer citation data from Google Scholar and SINTA. Built a BI dashboard web application supporting data-driven academic decision-making.",
      tech: ["Python", "React.js", "Node.js", "PostgreSQL", "Google Scholar", "SINTA"],
      videoUrl: "/videos/2nd-Project.mp4",
      thumbnail: "/images/thumb-2.jpg",
      color: "#0f766e",
    },
    {
      id: 3,
      title: "Package Delivery Routing System",
      type: "PT Pos Indonesia Internship",
      description: "Web-based system automating geocoding and route calculation using OpenStreetMap and OSRM. Features interactive map visualizations and QR code-based customer data privacy.",
      tech: ["OpenStreetMap", "OSRM", "Nominatim", "QR Code", "Excel"],
      videoUrl: "/videos/3rd-Project.mp4",
      thumbnail: "/images/thumb-3.jpg",
      color: "#1d4ed8",
    },
    {
      id: 4,
      title: "IPL Management System",
      type: "The Jarrdin Internship",
      description: "Full-stack BI web application for Environmental Maintenance Fee (IPL) data visualization with role-based access control (Admin, Data Analyst, End User) and PDF export.",
      tech: ["React.js", "Node.js", "Express", "PostgreSQL", "MySQL"],
      videoUrl: "/videos/4th-Project.mp4",
      thumbnail: "/images/thumb-4.jpg",
      color: "#6d28d9",
    },
    {
      id: 5,
      title: "Bandung Traffic Monitor",
      type: "Self Project",
      description: "Full-stack AI-powered web application to monitor and predict real-time traffic congestion across strategic locations in Bandung using Random Forest Regressor (MAE ≈ 1.02 km/h).",
      tech: ["Python", "Random Forest", "TomTom API", "OpenWeatherMap", "PostgreSQL"],
      videoUrl: "/videos/5th-Project.mp4",
      thumbnail: "/images/thumb-5.jpg",
      color: "#1e40af",
    },
    {
      id: 6,
      title: "Chocolate Sales Dashboard",
      type: "Self Project",
      description: "End-to-end analytics pipeline with data cleaning, EDA, machine learning modeling (R² ≈ 0.80), and interactive dashboard with KPI cards, YoY tracking, and hierarchical sales analysis.",
      tech: ["Python", "Streamlit", "Plotly", "Random Forest", "Google Colab", "Ngrok"],
      videoUrl: null,
      thumbnail: "/images/thumb-6.jpg",
      color: "#92400e",
    },
  ],
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Skills", "Experience", "Projects", "Contact"];

const C = {
  bg:          "#f8fafc",
  bgAlt:       "#f1f5f9",
  surface:     "#ffffff",
  text:        "#0f172a",
  textMuted:   "rgba(15,23,42,0.55)",
  textFaint:   "rgba(15,23,42,0.35)",
  border:      "rgba(15,23,42,0.08)",
  accent:      "#3b82f6",
  accentLight: "rgba(59,130,246,0.08)",
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(248,250,252,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s ease",
      padding: "0 4rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: C.text, letterSpacing: "-0.5px" }}>
          RAS<span style={{ color: C.accent }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "4px 0",
              fontSize: 14, fontWeight: 600,
              color: activeSection === l.toLowerCase() ? C.accent : C.textMuted,
              borderBottom: `2px solid ${activeSection === l.toLowerCase() ? C.accent : "transparent"}`,
              transition: "all 0.2s",
            }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 120); }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 4rem", background: C.bg, position: "relative", overflow: "hidden",
    }}>
      {/* background blob */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 65% 55% at 68% 45%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        width: "100%", position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1fr 380px", gap: 80, alignItems: "center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)",
        transition: "all 0.75s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            background: C.accentLight, border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: 100, fontSize: 12, fontWeight: 700, color: C.accent,
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: "pulse 2s infinite" }} />
            Available for Work
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(46px, 4.8vw, 76px)",
            lineHeight: 1.05, fontWeight: 400, color: C.text,
            margin: "0 0 10px", letterSpacing: "-3px",
          }}>
            Rayhan Adji<br />
            <span style={{ color: C.accent }}>Santoso</span>
          </h1>

          <p style={{ fontSize: 19, color: C.accent, fontWeight: 700, margin: "0 0 22px" }}>
            {data.title}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.82, color: C.textMuted, maxWidth: 560, margin: "0 0 42px" }}>
            {data.bio}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
            <button onClick={() => scrollTo("projects")} style={{
              padding: "13px 30px", background: C.accent, color: "#fff",
              border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(59,130,246,0.28)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 30px rgba(59,130,246,0.38)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 20px rgba(59,130,246,0.28)"; }}>
              Lihat Project →
            </button>
            <button onClick={() => scrollTo("contact")} style={{
              padding: "13px 30px", background: "transparent", color: C.text,
              border: `1.5px solid ${C.border}`,
              borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; }}
              onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.text; }}>
              Hubungi Saya
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 44, paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
            {[["4", "Internships"], ["6", "Projects"], ["2.92", "GPA / 4.00"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, color: C.accent, letterSpacing: "-1.5px", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 12, color: C.textFaint, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 5 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — profile photo */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            {/* decorative ring */}
            <div style={{
              position: "absolute", inset: -14, borderRadius: "44px 44px 100px 44px",
              border: "2px solid rgba(59,130,246,0.12)",
            }} />
            {/* photo box */}
            <div style={{
              width: 340, height: 420, borderRadius: "32px 32px 80px 32px",
              overflow: "hidden", background: "linear-gradient(135deg,#dbeafe,#ede9fe)",
              border: `1px solid rgba(59,130,246,0.1)`,
              boxShadow: "0 24px 64px rgba(15,23,42,0.10)",
            }}>
              {!imgError ? (
                <img
                  src={data.profilePhoto}
                  alt="Rayhan Adji Santoso"
                  onError={() => setImgError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                  <div style={{ width: 90, height: 90, borderRadius: "50%", background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>👤</div>
                  <p style={{ fontSize: 12, color: C.textFaint, textAlign: "center", lineHeight: 1.6, padding: "0 24px" }}>
                    Letakkan foto di<br /><code style={{ background: C.accentLight, padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>public/images/profile.jpg</code>
                  </p>
                </div>
              )}
            </div>

            {/* floating badge */}
            <div style={{
              position: "absolute", bottom: -18, left: -18,
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: "10px 16px",
              boxShadow: "0 6px 24px rgba(15,23,42,0.08)",
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 12, fontWeight: 700, color: C.text, whiteSpace: "nowrap",
            }}>
              🎓 Parahyangan Catholic University
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, marginBottom: 12 }}>{subtitle}</p>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(30px, 3.2vw, 48px)", fontWeight: 400, color: C.text, margin: 0, letterSpacing: "-1px" }}>{title}</h2>
    </div>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
function Skills() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Programming Language", "Framework", "Database", "Analytics", "Web Dev", "Language"];
  const filtered = filter === "All" ? data.skills : data.skills.filter(s => s.category === filter);

  return (
    <section id="skills" style={{ padding: "100px 4rem", background: C.bgAlt }}>
      <div style={{ width: "100%" }}>
        <SectionTitle title="Skills & Expertise" subtitle="What I Work With" />

        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "8px 22px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              background: filter === c ? C.accent : "transparent",
              color: filter === c ? "#fff" : C.textMuted,
              border: `1.5px solid ${filter === c ? C.accent : C.border}`,
            }}>{c}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {filtered.map(skill => <SkillCard key={skill.name} skill={skill} />)}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: C.surface, borderRadius: 16, padding: "20px 20px 18px",
      border: `1px solid ${hov ? "rgba(59,130,246,0.25)" : C.border}`,
      boxShadow: hov ? "0 10px 30px rgba(59,130,246,0.09)" : "0 2px 6px rgba(15,23,42,0.03)",
      transform: hov ? "translateY(-4px)" : "none", transition: "all 0.22s",
    }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{skill.icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{skill.name}</div>

      {skill.badge ? (
        <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, marginBottom: 10, background: C.accentLight, display: "inline-block", padding: "3px 9px", borderRadius: 100 }}>
          {skill.badge}
        </div>
      ) : (
        <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>{skill.category}</div>
      )}

      <div style={{ height: 4, borderRadius: 4, background: "rgba(15,23,42,0.07)", marginTop: skill.badge ? 8 : 0 }}>
        <div style={{ height: "100%", borderRadius: 4, background: `linear-gradient(90deg, ${C.accent}, #6366f1)`, width: `${skill.level}%`, transition: "width 0.8s ease" }} />
      </div>
      <div style={{ fontSize: 11, color: C.textFaint, marginTop: 6, textAlign: "right" }}>{skill.level}%</div>
    </div>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 4rem", background: C.bg }}>
      <div style={{ width: "100%" }}>
        <SectionTitle title="Work Experience" subtitle="Professional Journey" />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: C.border, transform: "translateX(-50%)" }} />
          {data.experience.map((exp, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 48, position: "relative" }}>
              {i % 2 === 0 ? (
                <>
                  <div style={{ paddingRight: 44 }}><ExpCard exp={exp} align="right" /></div>
                  <div style={{ paddingLeft: 44, paddingTop: 26 }}>
                    <div style={{ fontSize: 13, color: C.textFaint, fontWeight: 600 }}>{exp.period}</div>
                    <div style={{ fontSize: 13, color: C.textFaint, marginTop: 4 }}>📍 {exp.location}</div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ paddingRight: 44, paddingTop: 26, textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: C.textFaint, fontWeight: 600 }}>{exp.period}</div>
                    <div style={{ fontSize: 13, color: C.textFaint, marginTop: 4 }}>📍 {exp.location}</div>
                  </div>
                  <div style={{ paddingLeft: 44 }}><ExpCard exp={exp} align="left" /></div>
                </>
              )}
              <div style={{
                position: "absolute", left: "50%", top: 24, transform: "translateX(-50%)",
                width: 14, height: 14, borderRadius: "50%", background: exp.color,
                border: `3px solid ${C.bg}`, boxShadow: `0 0 0 3px ${exp.color}30`, zIndex: 1,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpCard({ exp, align }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: C.surface, borderRadius: 16, padding: "22px 24px",
      border: `1px solid ${hov ? `${exp.color}30` : C.border}`,
      borderLeft: align === "left" ? `3px solid ${exp.color}` : undefined,
      borderRight: align === "right" ? `3px solid ${exp.color}` : undefined,
      boxShadow: hov ? `0 10px 30px ${exp.color}12` : "0 2px 6px rgba(15,23,42,0.03)",
      transform: hov ? "translateY(-3px)" : "none", transition: "all 0.22s",
    }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{exp.title}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: exp.color, marginBottom: 12 }}>{exp.company}</div>
      <p style={{ fontSize: 13, lineHeight: 1.72, color: C.textMuted, margin: 0 }}>{exp.description}</p>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function Projects() {
  const [modal, setModal] = useState(null);
  return (
    <section id="projects" style={{ padding: "100px 4rem", background: C.bgAlt }}>
      <div style={{ width: "100%" }}>
        <SectionTitle title="Featured Projects" subtitle="What I've Built" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 22 }}>
          {data.projects.map(p => <ProjectCard key={p.id} project={p} onOpen={setModal} />)}
        </div>
      </div>
      {modal && <VideoModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const emoji = ["🏃","📚","📦","🏢","🗺️","📊"][project.id - 1];

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: C.surface, borderRadius: 20, overflow: "hidden",
      border: `1px solid ${hov ? `${project.color}35` : C.border}`,
      boxShadow: hov ? `0 18px 48px ${project.color}14` : "0 2px 8px rgba(15,23,42,0.04)",
      transform: hov ? "translateY(-6px)" : "none", transition: "all 0.25s",
    }}>
      {/* Thumbnail */}
      <div style={{
        height: 200, position: "relative", cursor: "pointer", overflow: "hidden",
        background: `linear-gradient(135deg,${project.color}18,${project.color}06)`,
        borderBottom: `1px solid ${project.color}15`,
      }} onClick={() => onOpen(project)}>

        {project.thumbnail && !imgErr ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            onError={() => setImgErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hov ? "scale(1.05)" : "scale(1)", transition: "transform 0.4s ease" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 52, opacity: 0.3 }}>{emoji}</span>
          </div>
        )}

        {/* play overlay */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.44)", opacity: hov ? 1 : 0, transition: "opacity 0.22s", pointerEvents: "none",
        }}>
          <div style={{
            width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, paddingLeft: 3,
            transform: hov ? "scale(1)" : "scale(0.8)", transition: "transform 0.22s",
          }}>▶</div>
        </div>

        {/* badge */}
        <div style={{
          position: "absolute", top: 12, right: 12, padding: "4px 11px",
          background: "rgba(255,255,255,0.93)", borderRadius: 100,
          fontSize: 11, fontWeight: 700, color: project.color, backdropFilter: "blur(4px)",
        }}>
          {project.type}
        </div>
      </div>

      {/* content */}
      <div style={{ padding: "20px 22px 22px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>{project.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: C.textMuted, margin: "0 0 16px" }}>{project.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.slice(0, 4).map(t => (
            <span key={t} style={{ fontSize: 11, padding: "3px 10px", background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 100, color: C.textMuted, fontWeight: 600 }}>{t}</span>
          ))}
          {project.tech.length > 4 && <span style={{ fontSize: 11, padding: "3px 9px", color: C.accent, fontWeight: 700 }}>+{project.tech.length - 4}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── VIDEO MODAL ─────────────────────────────────────────────────────────────
function VideoModal({ project, onClose }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => { setPlaying(false); }, [project.id]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, background: "rgba(15,23,42,0.72)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem", backdropFilter: "blur(8px)",
    }} onClick={onClose}>
      <div style={{
        background: C.surface, borderRadius: 24, overflow: "hidden",
        maxWidth: 740, width: "100%", boxShadow: "0 40px 80px rgba(15,23,42,0.22)",
      }} onClick={e => e.stopPropagation()}>

        <div style={{ position: "relative", background: "#000" }}>
          {project.videoUrl ? (
            <>
              <video
                key={project.videoUrl} ref={videoRef}
                style={{ width: "100%", display: "block", maxHeight: 420, background: "#000" }}
                controls preload="metadata" playsInline
                onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
              >
                <source src={project.videoUrl} type="video/mp4" />
                <source src={project.videoUrl} type="video/webm" />
              </video>
              {!playing && (
                <div style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 14,
                  background: "rgba(0,0,0,0.5)", cursor: "pointer",
                }} onClick={() => { setPlaying(true); videoRef.current?.play(); }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, paddingLeft: 5 }}>▶</div>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500 }}>Klik untuk memutar video</span>
                </div>
              )}
            </>
          ) : (
            <div style={{ height: 280, background: `linear-gradient(135deg,${project.color}20,${project.color}06)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <p style={{ fontSize: 14, color: C.textMuted, fontWeight: 600 }}>Video belum tersedia</p>
              <p style={{ fontSize: 12, color: C.textFaint, textAlign: "center", maxWidth: 280, lineHeight: 1.65 }}>
                Tambahkan <code style={{ background: C.accentLight, padding: "1px 6px", borderRadius: 4 }}>videoUrl</code> di data project untuk menampilkan demo.
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: "22px 26px 26px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: C.text, margin: "0 0 3px" }}>{project.title}</h3>
              <span style={{ fontSize: 12, color: project.color, fontWeight: 700 }}>{project.type}</span>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.textFaint, padding: "4px 6px", borderRadius: 8 }}>✕</button>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.72, color: C.textMuted, margin: "0 0 14px" }}>{project.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontSize: 12, padding: "4px 12px", background: `${project.color}0f`, border: `1px solid ${project.color}28`, borderRadius: 100, color: project.color, fontWeight: 700 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const contacts = [
    { label: "Email",     value: data.email,            href: `mailto:${data.email}`,         icon: "✉️" },
    { label: "WhatsApp",  value: data.phone,             href: `https://wa.me/6281222404877`,  icon: "💬" },
    { label: "LinkedIn",  value: "Rayhan Adji Santoso",  href: data.linkedin,                  icon: "🔗" },
    { label: "GitHub",    value: "RayhanAdjiSantoso",  href: data.github,                    icon: "⚙️" },
    { label: "Instagram", value: "@rayhanadjii",         href: data.instagram,                 icon: "📸" },
  ];

  return (
    <section id="contact" style={{ padding: "100px 4rem", background: C.bg }}>
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <SectionTitle title="Let's Connect" subtitle="Get In Touch" />
        <p style={{ fontSize: 17, lineHeight: 1.82, color: C.textMuted, marginBottom: 20 }}>
          Terbuka untuk peluang kerja, kolaborasi proyek, atau diskusi seputar data science dan pengembangan web. Jangan ragu untuk menghubungi saya!
        </p>

        {/* click hint */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 44,
          padding: "8px 18px", background: C.accentLight,
          border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100,
          fontSize: 13, color: C.accent, fontWeight: 600,
        }}>
          <span>👆</span> Klik kartu di bawah untuk langsung membuka kontak
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14, marginBottom: 44 }}>
          {contacts.map(c => <ContactCard key={c.label} c={c} />)}
        </div>

        {/* <a href={`mailto:${data.email}`} style={{
          display: "inline-block", padding: "14px 38px", background: C.accent, color: "#fff",
          borderRadius: 14, textDecoration: "none", fontSize: 15, fontWeight: 700,
          boxShadow: "0 4px 20px rgba(59,130,246,0.28)", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,130,246,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,0.28)"; }}>
          Kirim Email →
        </a> */}
      </div>
    </section>
  );
}

function ContactCard({ c }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={c.href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "block", textDecoration: "none",
        background: C.surface,
        border: `1px solid ${hov ? "rgba(59,130,246,0.35)" : C.border}`,
        borderRadius: 16, padding: "20px 18px",
        boxShadow: hov ? "0 10px 30px rgba(59,130,246,0.1)" : "0 2px 6px rgba(15,23,42,0.03)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all 0.22s", cursor: "pointer",
      }}>
      <div style={{ fontSize: 26, marginBottom: 10 }}>{c.icon}</div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.accent, marginBottom: 5 }}>{c.label}</div>
      <div style={{ fontSize: 13, color: hov ? C.accent : C.textMuted, wordBreak: "break-all", fontWeight: hov ? 600 : 400, transition: "color 0.2s" }}>{c.value}</div>
      <div style={{ marginTop: 10, fontSize: 12, color: C.accent, opacity: hov ? 1 : 0, transition: "opacity 0.2s", fontWeight: 700 }}>Buka →</div>
    </a>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "28px 4rem", borderTop: `1px solid ${C.border}`, textAlign: "center", fontSize: 13, color: C.textFaint, background: C.bg }}>
      © 2026 Rayhan Adji Santoso · Built with React.js
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 1100); }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach(l => {
      const el = document.getElementById(l.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: C.text, letterSpacing: "-2px" }}>
          RAS<span style={{ color: C.accent }}>.</span>
        </div>
        <div style={{ width: 200, height: 2, background: C.border, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", background: C.accent, borderRadius: 4, animation: "load 1.1s ease-in-out forwards" }} />
        </div>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
          @keyframes load { from{width:0%} to{width:100%} }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 3px; }
        @media (max-width: 900px) {
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          nav { padding: 0 1.5rem !important; }
        }
      `}</style>
      <Navbar activeSection={activeSection} />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}