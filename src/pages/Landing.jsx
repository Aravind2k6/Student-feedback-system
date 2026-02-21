import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    BookOpen, MessageSquare, BarChart3, ShieldCheck, Users, TrendingUp,
    Star, ArrowRight, CheckCircle, Zap, Bell, ChevronRight, ChevronUp, Mail,
    Phone, MapPin, Github, Twitter, Linkedin, Menu, X
} from 'lucide-react';

/* ── Navbar ──────────────────────────────────────────── */
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    {/* Logo */}
                    <div className="navbar-logo">
                        <div className="navbar-logo-icon">
                            <BookOpen size={18} color="#f59e0b" strokeWidth={2.5} />
                        </div>
                        <span>EduFeedback</span>
                    </div>

                    {/* Links */}
                    <div className="navbar-links">
                        {['home', 'features', 'about', 'contact'].map(id => (
                            <a key={id} className="navbar-link" onClick={() => scrollTo(id)} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
                                {id}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="navbar-actions">
                        <button className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }} onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.88rem' }} onClick={() => navigate('/login')}>
                            Get Started <ArrowRight size={15} />
                        </button>
                        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X size={22} color="var(--text-primary)" /> : <Menu size={22} color="var(--text-secondary)" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="animate-fade" style={{
                    position: 'fixed', top: 'var(--navbar-height)', left: 0, right: 0,
                    background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(20px)',
                    zIndex: 999, padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)'
                }}>
                    {['home', 'features', 'about', 'contact'].map(id => (
                        <a key={id} className="navbar-link" onClick={() => scrollTo(id)}
                            style={{ display: 'block', padding: '0.8rem 0', borderBottom: '1px solid var(--glass-border)', cursor: 'pointer', textTransform: 'capitalize' }}>
                            {id}
                        </a>
                    ))}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button className="btn-ghost" style={{ flex: 1 }} onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</button>
                        <button className="btn-primary" style={{ flex: 1 }} onClick={() => { navigate('/login'); setMenuOpen(false); }}>Get Started</button>
                    </div>
                </div>
            )}
        </>
    );
};

/* ── Hero Section ─────────────────────────────────────── */
const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section id="home" className="hero-section">
            <div className="bg-blob blob-1" />
            <div className="bg-blob blob-2" />
            <div className="bg-blob blob-3" />

            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <div className="hero-tag animate-fade-in" style={{ justifyContent: 'center' }}>
                    <span className="hero-tag-dot" />
                    Smart Feedback Platform for Education
                </div>

                <h1 className="hero-title animate-fade-in animate-delay-1" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1.15 }}>
                    <span className="gradient-text">Student Feedback</span><br />
                    & Evaluation System
                </h1>

                <p className="hero-subtitle animate-fade-in animate-delay-2" style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem' }}>
                    A modern, intuitive platform for institutions to gather, analyze, and act on student feedback — turning insights into educational excellence.
                </p>

                <div className="hero-buttons animate-fade-in animate-delay-3" style={{ justifyContent: 'center' }}>
                    <button className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }} onClick={() => navigate('/login')}>
                        Student Login <ArrowRight size={18} />
                    </button>
                    <button className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }} onClick={() => navigate('/login')}>
                        <ShieldCheck size={18} /> Admin Portal
                    </button>
                </div>

                <p className="animate-fade-in animate-delay-4" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '1.25rem', letterSpacing: '0.02em' }}>
                    Feedback that fuels educational excellence.
                </p>

            </div>
        </section>
    );
};

/* ── Features Section ─────────────────────────────────── */
const FeaturesSection = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const features = [
        {
            icon: <MessageSquare size={24} />, title: 'Submit Feedback',
            desc: 'Students can easily submit structured feedback for every course with an intuitive rating system.',
            color: '#00d4ff', bg: 'rgba(0,212,255,0.12)',
            points: [
                'Students can rate courses quickly. No long forms to fill.',
                'Feedback is private. Only teachers and admins can see it.',
                'Simple ratings: Poor, Average, Good, or Excellent. Easy to choose.',
                'Students can add extra comments if they want to say more.',
            ],
        },
        {
            icon: <BarChart3 size={24} />, title: 'Analytics Dashboard',
            desc: 'Real-time charts and analytics help administrators understand trends and improve teaching quality.',
            color: '#00e5a0', bg: 'rgba(0,229,160,0.12)',
            points: [
                'Charts show feedback as it comes in. Updates in real time.',
                'Compare courses and teachers. Find what works and what does not.',
                'Use real data to decide. No guesswork needed.',
                'See how students feel over time. Track progress clearly.',
            ],
        },
        {
            icon: <ShieldCheck size={24} />, title: 'Secure & Private',
            desc: 'Role-based authentication ensures only authorized users access sensitive feedback data.',
            color: '#0088ff', bg: 'rgba(0,136,255,0.12)',
            points: [
                'Only admins and teachers see the feedback. Students cannot see others\' answers.',
                'Each user sees only what they are allowed to see. No extra access.',
                'Student feedback is kept safe. We protect their privacy.',
                'System is built to be secure. Students can share honestly.',
            ],
        },
        {
            icon: <BookOpen size={24} />, title: 'Custom Forms',
            desc: 'Admins can create tailored feedback forms for specific courses with multiple question types.',
            color: '#ffb800', bg: 'rgba(255,184,0,0.12)',
            points: [
                'Admins create forms for each course. No fixed template. Make it fit your needs.',
                'Add rating scales, text boxes, or multiple choice. Mix and match as needed.',
                'Create and edit forms easily. No coding or tech skills required.',
                'Set different forms for different departments, semesters, or teachers.',
            ],
        },
        {
            icon: <TrendingUp size={24} />, title: 'View Reports',
            desc: 'Generate comprehensive reports with export options to track institutional performance over time.',
            color: '#ff4d6a', bg: 'rgba(255,77,106,0.12)',
            points: [
                'Get a full report with one click. No need to add numbers by hand.',
                'Download as PDF or Excel. Use in meetings or presentations.',
                'Compare results across semesters and courses. See who is doing well.',
                'Track how the college is doing over time. Clear numbers and charts.',
            ],
        },
        {
            icon: <Users size={24} />, title: 'Student Management',
            desc: 'Admins can manage student records, monitor activity, and group feedback by cohort or subject.',
            color: '#a855f7', bg: 'rgba(168,85,247,0.12)',
            points: [
                'See which students have given feedback and which have not. Easy to follow up.',
                'Group feedback by batch, course, or subject. Find patterns quickly.',
                'Check all student activity in one screen. No need to search.',
                'Student details are organized. Admins can find what they need fast.',
            ],
        },
    ];

    return (
        <section id="features" className="section" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}>
            <div className="section-inner">
                <div className="section-header">
                    <p className="section-label">Features</p>
                    <h2 className="section-title">Everything You Need for<br /><span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Better Education</span></h2>
                    <p className="section-description">Powerful tools designed to bridge the gap between students and educators through actionable insights.</p>
                </div>

                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {features.map((f, i) => (
                        <div key={i} className="feature-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="feature-icon-wrap" style={{ background: f.bg }}>
                                <span style={{ color: f.color }}>{f.icon}</span>
                            </div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>

                            <button type="button" onClick={() => setExpandedIndex(i)} style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: f.color, fontSize: '0.85rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'var(--transition)' }}
                                onMouseOver={e => { e.currentTarget.style.opacity = '0.85'; }}
                                onMouseOut={e => { e.currentTarget.style.opacity = '1'; }}>
                                Learn more <ChevronRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup modal for Learn more */}
            {expandedIndex !== null && (() => {
                const f = features[expandedIndex];
                return (
                    <div className="animate-fade" style={{
                        position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '1.5rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
                    }} onClick={() => setExpandedIndex(null)}>
                        <div style={{
                            width: '100%', maxWidth: 480,
                            background: 'var(--bg-card)', border: `1px solid rgba(148,163,184,0.15)`, borderRadius: 18,
                            padding: '2rem 2.25rem', boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                            position: 'relative',
                        }} onClick={e => e.stopPropagation()}>
                            <button type="button" onClick={() => setExpandedIndex(null)} style={{
                                position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none',
                                cursor: 'pointer', color: 'var(--text-muted)', padding: 4,
                            }}><X size={20} /></button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>{f.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{f.title}</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {f.points.map((point, pi) => (
                                    <div key={pi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                                        <span style={{ color: f.color, flexShrink: 0 }}>•</span>
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => setExpandedIndex(null)} style={{
                                marginTop: '1.5rem', padding: '0.6rem 1.5rem', borderRadius: 10, background: f.bg, color: f.color,
                                border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
                            }}>Close</button>
                        </div>
                    </div>
                );
            })()}
        </section>
    );
};

/* ── How It Works ─────────────────────────────────────── */
const HowItWorks = () => {
    const steps = [
        { n: '01', title: 'Admin Creates Forms', desc: 'Administrators design custom evaluation forms for each course or faculty member.' },
        { n: '02', title: 'Students Submit Feedback', desc: 'Students log in securely and submit honest ratings and comments for their courses.' },
        { n: '03', title: 'Analyze & Improve', desc: 'Admins review analytics dashboards and generate reports to drive improvements.' },
    ];

    return (
        <section className="section">
            <div className="section-inner">
                <div className="section-header">
                    <p className="section-label">How It Works</p>
                    <h2 className="section-title">Simple. Smart. Effective.</h2>
                    <p className="section-description">Three easy steps to revolutionize your institution's feedback collection process.</p>
                </div>

                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    {steps.map((s, i) => (
                        <div key={i} className="glass-panel step-card animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                            <div className="step-number">{s.n}</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{s.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ── About Section ────────────────────────────────────── */
const AboutSection = () => (
    <section id="about" className="section" style={{ background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)' }}>
        <div className="section-inner">
            <div className="animate-fade-in" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
                <p className="section-label">About</p>
                <h2 className="section-title">
                    Empowering Educational Excellence Through Data
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
                    EduFeedback was built to give every student a voice and every educator the insights they need to grow. Our platform replaces paper-based surveys with a dynamic, real-time digital system — adapting to institutions of every size while keeping things simple and private.
                </p>
            </div>

            <div className="animate-fade-in animate-delay-1" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
            }}>
                {[
                    { icon: <Zap size={22} />, label: 'Real-time Feedback', desc: 'Instant results as students submit responses.', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                    { icon: <ShieldCheck size={22} />, label: 'Secure & Private', desc: 'Role-based access keeps data protected.', color: '#00d4ff', bg: 'rgba(0,212,255,0.1)' },
                    { icon: <BarChart3 size={22} />, label: 'Export Reports', desc: 'Download insights as PDF or Excel anytime.', color: '#00e5a0', bg: 'rgba(0,229,160,0.1)' },
                    { icon: <Bell size={22} />, label: 'Mobile Responsive', desc: 'Works seamlessly on any device or screen.', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
                ].map((item, i) => (
                    <div key={i} className="glass-panel animate-fade-in" style={{
                        padding: '1.6rem 1.4rem', borderRadius: 16,
                        animationDelay: `${i * 0.1}s`,
                        borderTop: `2px solid ${item.color}55`,
                    }}>
                        <div style={{
                            width: 46, height: 46, borderRadius: 12,
                            background: item.bg, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: item.color, marginBottom: '1rem',
                        }}>{item.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>{item.label}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ── Contact Section ──────────────────────────────────── */
const ContactSection = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="section">
            <div className="section-inner">
                <div className="section-header">
                    <p className="section-label">Team</p>
                    <h2 className="section-title">Developed By</h2>
                    <p className="section-description">Built with passion by our development team.</p>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="animate-fade-in glass-panel" style={{ padding: '2.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            {[
                                { icon: <Users size={20} />, label: '2400030040', val: 'Aravind' },
                                { icon: <Users size={20} />, label: '2400030439', val: 'Jaswanth' },
                                { icon: <Users size={20} />, label: '2400032357', val: 'Anish' },
                            ].map((c, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                                        {c.icon}
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{c.label}</div>
                                    <div style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 600 }}>{c.val}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '2.5rem', textAlign: 'center', padding: '1rem', borderRadius: 12, background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.15)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            🎓 Built as part of a <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Student Feedback System</span> project to streamline academic feedback collection.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ── Footer ───────────────────────────────────────────── */
const Footer = () => {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                            <div style={{ background: 'var(--accent-gradient)', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BookOpen size={16} color="#0f172a" />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>EduFeedback</span>
                        </div>
                        <p>Empowering educators and students with smart feedback tools to improve educational experiences.</p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" style={{ width: 36, height: 36, border: '1px solid var(--glass-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'var(--transition)' }}
                                    onMouseOver={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; }}
                                    onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Navigation</h4>
                        {['Home', 'Features', 'About', 'Contact'].map(l => (
                            <a key={l} href="#" onClick={e => { e.preventDefault(); scrollTo(l.toLowerCase()); }}>{l}</a>
                        ))}
                    </div>

                    <div className="footer-col">
                        <h4>Platform</h4>
                        {['Student Portal', 'Admin Dashboard', 'Analytics', 'Reports'].map(l => <a key={l} href="#">{l}</a>)}
                    </div>

                    <div className="footer-col">
                        <h4>Support</h4>
                        {['Documentation', 'Help Center', 'Privacy Policy', 'Terms of Use'].map(l => <a key={l} href="#">{l}</a>)}
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 EduFeedback. All rights reserved.</span>
                    <span style={{ color: 'var(--accent-primary)' }}>Built for better education ✦</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Learn. Feedback. Grow.
                </div>
            </div>
        </footer>
    );
};

/* ── Main Landing Page ────────────────────────────────── */
const Landing = () => (
    <div style={{ position: 'relative' }}>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <AboutSection />
        <ContactSection />
        <Footer />
    </div>
);

export default Landing;
