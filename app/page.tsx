"use client";
import { useEffect, useRef, useState } from 'react';

// Logoların linklerini kalabalık yapmaması için buraya aldık
const icons = {
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  matplotlib: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  hadoop: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
};

// DİL SÖZLÜĞÜ (Tüm yazıları buradan kolayca değiştirebilirsin)
const translations = {
  tr: {
    nav: { about: "Hakkımda", skills: "Yetenekler", projects: "Projeler", contact: "İletişim", toggle: "EN" },
    hero: { greeting: "Merhaba, Ben", name: "Hasan Can Karadağ", role: "Büyük Veri Analistliği Öğrencisi | Veri Analizi & Veri Bilimi" },
    about: { 
      title: "Hakkımda", 
      desc: "Merhaba, ben Hasan Can Karadağ. Büyük Veri Analistliği bölümü öğrencisi olarak, verilerden anlamlı hikayeler çıkarmaya ve yazılım süreçlerine tutkuyla bağlıyım. Akademik eğitimim boyunca Python, SQL ve C++ ile sağlam bir algoritma temeli inşa ettim. Bireysel projelerimde Pandas ve Matplotlib kullanarak geniş veri setlerini analiz ediyor; MySQL, Hadoop ve MongoDB gibi teknolojilerle veritabanı yönetimi ve büyük veri işleme süreçleri üzerine pratikler yapıyorum. Versiyon kontrol sistemlerine (Git) ve modern geliştirme araçlarına aşinayım. Amacım, edindiğim teorik analitik becerileri gerçek dünya verileriyle buluşturabileceğim bir staj programında yer almak ve veriye dayalı stratejik çözümler üreten ekiplerde aktif görev almak."
    },
    education: {
      title: "Eğitim",
      school: "Celal Bayar Üniversitesi",
      department: "Büyük Veri Analistliği",
      date: "2025 – Devam ediyor",
      desc: "Veri analizi, veritabanı teknolojileri, büyük veri, algoritmalar ve makine öğrenmesi üzerine eğitim alıyorum."
    },
    skills: { 
      title: "Yeteneklerim",
      groups: [
        { title: "Programlama", items: [{ name: "Python", icon: icons.python }, { name: "C++", icon: icons.cpp }, { name: "C", icon: icons.c }] },
        { title: "Veri Analizi", items: [{ name: "Pandas", icon: icons.pandas }, { name: "NumPy", icon: icons.numpy }, { name: "Matplotlib", icon: icons.matplotlib }, { name: "Excel", icon:"https://img.icons8.com/color/48/microsoft-excel-2019--v1.png"}] },
        { title: "Veri & DB", items: [{ name: "Hadoop", icon: icons.hadoop }, { name: "MySQL", icon: icons.mysql }, { name: "MongoDB", icon: icons.mongodb }] },
        { title: "Araçlar", items: [{ name: "Git", icon: icons.git }, { name: "Jupyter", icon: icons.jupyter }, { name: "VS Code", icon: icons.vscode }] },
      ]
    },
    projects: {
      title: "Projelerim",
      items: [
        { 
          title: "Hava Kalitesi Tahminleyicisi", 
          desc: "Geçmiş hava durumu ve kirlilik verilerini işleyerek gelecekteki hava kalitesini tahmin eden bir model tasarladım. Bu projede büyük veri setleri üzerinde veri temizleme, manipülasyon ve görselleştirme adımlarını uyguladım.", 
          tags: ["Python", "Pandas", "Veri Analizi"], 
          img: "https://picsum.photos/id/844/600/400"
        },
      ],
    },
    contact: { 
      title: "Benimle İletişime Geç", 
      desc: "Staj fırsatları, proje fikirleri veya sadece teknoloji üzerine sohbet etmek için bana her zaman ulaşabilirsin.", 
      emailBtn: "E-posta Gönder", 
      rights: "Tüm hakları saklıdır." 
    }
  },
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", contact: "Contact", toggle: "TR" },
    hero: { greeting: "Hello, I'm", name: "Hasan Can Karadağ", role: "Big Data Analytics Student | Data Analysis & Data Science" },
    about: { 
      title: "About Me", 
      desc: "Hello, I am Hasan Can Karadağ. As a Big Data Analytics student, I am passionate about extracting meaningful stories from data and engaging in software development processes. Throughout my academic education, I have built a solid algorithmic foundation using Python, SQL, and C++. In my personal projects, I analyze large datasets using Pandas and Matplotlib, and practice database management and big data processing with technologies like MySQL, Hadoop, and MongoDB. I am familiar with version control systems (Git) and modern development tools. My goal is to join an internship program where I can combine my theoretical analytical skills with real-world data and take an active role in teams producing data-driven strategic solutions. I am eager to learn, a team player, and passionate about creating innovative solutions." 
    },
    education: {
      title: "Education",
      school: "Celal Bayar University",
      department: "Big Data Analytics",
      date: "2025 – Present",
      desc: "I am studying data analysis, database technologies, big data, algorithms, and machine learning."
    },
    skills: { 
      title: "My Skills",
      groups: [
        { title: "Programming", items: [{ name: "Python", icon: icons.python }, { name: "C++", icon: icons.cpp }, { name: "C", icon: icons.c }] },
        { title: "Data Analysis", items: [{ name: "Pandas", icon: icons.pandas }, { name: "NumPy", icon: icons.numpy }, { name: "Matplotlib", icon: icons.matplotlib }] },
        { title: "Data & DB", items: [{ name: "Hadoop", icon: icons.hadoop }, { name: "MySQL", icon: icons.mysql }, { name: "MongoDB", icon: icons.mongodb }] },
        { title: "Tools", items: [{ name: "Git", icon: icons.git }, { name: "Jupyter", icon: icons.jupyter }, { name: "VS Code", icon: icons.vscode }] },
      ]
    },
    projects: {
      title: "My Projects",
      items: [
        { 
          title: "Air Quality Predictor", 
          desc: "I designed a model that predicts future air quality by processing historical weather and pollution data. In this project, I applied data cleaning, manipulation, and visualization steps on large datasets.", 
          tags: ["Python", "Pandas"], 
          img: "https://picsum.photos/id/844/600/400" 
        },
       
      ]
    },
    contact: { 
      title: "Contact Me", 
      desc: "You can always reach out to me for internship opportunities, project ideas, or just to chat about technology.", 
      emailBtn: "Send Email", 
      rights: "All rights reserved." 
      
    }
  }
};

export default function Home() {
  const canvasRef = useRef(null);
  // DİL STATE'İ (Varsayılan olarak 'tr' yani Türkçe başlar)
  const [lang, setLang] = useState('tr');
  const t = translations[lang]; // Seçili dilin sözlüğünü koda aktarır

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(103, 232, 249, 0.8)';
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          let p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(103, 232, 249, ${1 - distance / 120})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-950 via-cyan-400 to-cyan-950 text-white font-sans selection:bg-white selection:text-cyan-900 scroll-smooth">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-60" />

      <div className="relative z-10 min-h-screen bg-black/10">

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-cyan-200/20 py-4">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <span className="text-xl font-bold text-white tracking-wider drop-shadow-md">hasancankaradag.</span>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-6 text-sm font-medium text-cyan-50">
                <a href="#hakkimda" className="hover:text-cyan-300 transition-colors drop-shadow-sm">{t.nav.about}</a>
                <a href="#yetenekler" className="hover:text-cyan-300 transition-colors drop-shadow-sm">{t.nav.skills}</a>
                <a href="#projeler" className="hover:text-cyan-300 transition-colors drop-shadow-sm">{t.nav.projects}</a>
                <a href="#iletisim" className="hover:text-cyan-300 transition-colors drop-shadow-sm">{t.nav.contact}</a>
              </div>
              
              {/* DİL DEĞİŞTİRME BUTONU */}
              <button 
                onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                className="flex items-center gap-1.5 bg-black/40 hover:bg-black/70 text-cyan-50 border border-cyan-500/40 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {t.nav.toggle}
              </button>
            </div>
          </div>
        </nav>
        
        {/* 1. Karşılama */}
        <header className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 pt-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            {t.hero.greeting} <span className="text-cyan-100">{t.hero.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50 drop-shadow-md max-w-2xl font-light">
            {t.hero.role}
          </p>
        </header>

        {/* 2. Hakkımda */}
        <section id="hakkimda" className="max-w-4xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-8 border-b border-cyan-200/30 pb-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-sm">{t.about.title}</h2>
          </div>
          <p className="text-lg leading-relaxed text-white drop-shadow-md bg-black/30 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl hover:border-cyan-400/50 transition-colors duration-500">
            {t.about.desc}
          </p>
        </section>
        {/* EĞİTİM BÖLÜMÜ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
            </svg>
            {t.education.title}
          </h2>
          <div className="bg-black/40 border border-cyan-500/20 p-6 rounded-2xl hover:border-cyan-500/50 transition-all shadow-[0_0_15px_rgba(34,211,238,0.05)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-xl font-bold text-gray-100">{t.education.school}</h3>
              <span className="text-cyan-400 text-sm font-semibold bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full mt-2 md:mt-0">
                {t.education.date}
              </span>
            </div>
            <h4 className="text-lg text-cyan-200 mb-3">{t.education.department}</h4>
            <p className="text-gray-400 leading-relaxed">{t.education.desc}</p>
          </div>
        </section>

        {/* 3. Yetenekler */}
        <section id="yetenekler" className="max-w-4xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-10 border-b border-cyan-200/30 pb-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-sm">{t.skills.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.skills.groups.map((group) => (
              <div key={group.title} className="bg-black/40 backdrop-blur-md border border-cyan-200/30 p-8 rounded-2xl shadow-xl">
                <h3 className="text-lg font-bold text-cyan-100 mb-6 drop-shadow-md">{group.title}</h3>
                <div className="flex flex-wrap gap-4">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="group/skill flex flex-col items-center justify-center bg-black/50 border border-cyan-500/30 w-20 h-20 rounded-2xl hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 cursor-pointer">
                      <img src={skill.icon} alt={skill.name} className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] font-medium text-cyan-50 opacity-70 group-hover:opacity-100 transition-opacity">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Projeler */}
        <section id="projeler" className="max-w-4xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-10 border-b border-cyan-200/30 pb-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-sm">{t.projects.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.projects.items.map((project, idx) => (
              <div key={idx} className="group overflow-hidden bg-black/40 backdrop-blur-md border border-cyan-200/30 rounded-2xl hover:border-cyan-300 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(34,211,238,0.2)]">
                <div className="w-full h-48 overflow-hidden">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md group-hover:text-cyan-200 transition-colors">{project.title}</h3>
                  <p className="text-cyan-50 mb-6 drop-shadow-sm text-sm leading-relaxed">{project.desc}</p>
                  <div className="flex gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className={`text-xs font-semibold py-1.5 px-3 rounded-full ${tagIdx === 0 ? 'bg-cyan-900/80 text-cyan-50 border border-cyan-400/50' : 'bg-black/50 text-cyan-50 border border-white/5'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. İletişim */}
        <section id="iletisim" className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-md">{t.contact.title}</h2>
          <p className="text-cyan-50 mb-10 text-lg drop-shadow-sm max-w-xl mx-auto">{t.contact.desc}</p>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <a href="https://github.com/hsnckrdg-ai" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-black/50 backdrop-blur-md border border-cyan-500/30 py-3.5 px-8 rounded-full hover:bg-black/80 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-1 transition-all duration-300">
              <svg className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="font-semibold text-white group-hover:text-cyan-50">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/hasancankaradag" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-black/50 backdrop-blur-md border border-cyan-500/30 py-3.5 px-8 rounded-full hover:bg-black/80 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-1 transition-all duration-300">
              <svg className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span className="font-semibold text-white group-hover:text-cyan-50">LinkedIn</span>
            </a>
            <a href="mailto:hsnckrdg@gmail.com" className="group flex items-center gap-3 bg-white border border-cyan-500/30 py-3.5 px-8 rounded-full hover:bg-cyan-50 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300">
              <svg className="w-6 h-6 text-cyan-950" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span className="font-bold text-cyan-950">{t.contact.emailBtn}</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 py-8 text-center bg-black/40">
          <p className="text-sm text-cyan-100/60">© 2026 {t.hero.name}. {t.contact.rights}</p>
        </footer>
      </div>
    </div>
  );
}