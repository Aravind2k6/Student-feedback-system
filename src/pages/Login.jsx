import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowRight, Lock, BookOpen, Eye, EyeOff, X, Mail, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

/* ── Forgot Password Modal ─────────────────────────────── */
const ForgotModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 3000, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', padding: '1.5rem',
        }} onClick={onClose}>
            <div className="animate-fade-in" style={{
                width: '100%', maxWidth: 420, background: 'rgba(30,41,59,0.98)',
                border: '1px solid rgba(245,158,11,0.25)', borderRadius: 20,
                padding: '2.25rem', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', position: 'relative',
            }} onClick={e => e.stopPropagation()}>
                <button type="button" onClick={onClose} style={{
                    position: 'absolute', top: '1.1rem', right: '1.1rem',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4,
                }}><X size={20} /></button>

                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: 14, background: 'rgba(245,158,11,0.15)',
                        border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--accent-primary)',
                    }}><Mail size={22} /></div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.3rem' }}>Forgot Password?</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem' }}>
                        Enter your email and we'll send a reset link.
                    </p>
                </div>

                {sent ? (
                    <div style={{
                        padding: '1rem', borderRadius: 12, textAlign: 'center',
                        background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)',
                        color: 'var(--success)', fontSize: '0.9rem', lineHeight: 1.6,
                    }}>
                        ✓ Reset link sent! Check your inbox.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="email" className="form-input" placeholder="you@example.com"
                                    style={{ paddingLeft: '2.7rem' }} value={email}
                                    onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                            Send Reset Link <ArrowRight size={16} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

/* ── Create Account Modal ──────────────────────────────── */
const CreateAccountModal = ({ onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'student' });
    const [done, setDone] = useState(false);
    const [err, setErr] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) { setErr('Passwords do not match.'); return; }
        setDone(true);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 3000, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', padding: '1.5rem',
        }} onClick={onClose}>
            <div className="animate-fade-in" style={{
                width: '100%', maxWidth: 440, background: 'rgba(30,41,59,0.98)',
                border: '1px solid rgba(245,158,11,0.25)', borderRadius: 20,
                padding: '2.25rem', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', position: 'relative',
                maxHeight: '90vh', overflowY: 'auto',
            }} onClick={e => e.stopPropagation()}>
                <button type="button" onClick={onClose} style={{
                    position: 'absolute', top: '1.1rem', right: '1.1rem',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4,
                }}><X size={20} /></button>

                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: 14, background: 'rgba(245,158,11,0.15)',
                        border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--accent-primary)',
                    }}><UserPlus size={22} /></div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.3rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem' }}>Join EduFeedback today.</p>
                </div>

                {done ? (
                    <div style={{
                        padding: '1rem', borderRadius: 12, textAlign: 'center',
                        background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)',
                        color: 'var(--success)', fontSize: '0.9rem', lineHeight: 1.6,
                    }}>
                        ✓ Account created! You can now sign in.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {err && <div className="alert alert-error animate-fade">{err}</div>}

                        {/* Role picker */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', background: 'rgba(245,158,11,0.08)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '0.25rem' }}>
                            {[{ r: 'student', label: 'Student', Icon: User }, { r: 'admin', label: 'Admin', Icon: ShieldCheck }].map(({ r, label, Icon }) => (
                                <button key={r} type="button" onClick={() => setForm(f => ({ ...f, role: r }))}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                        padding: '0.55rem', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem',
                                        border: 'none', cursor: 'pointer', transition: 'var(--transition)',
                                        background: form.role === r ? 'var(--accent-gradient)' : 'transparent',
                                        color: form.role === r ? '#0f172a' : 'var(--text-secondary)',
                                        boxShadow: form.role === r ? '0 4px 14px rgba(245,158,11,0.3)' : 'none',
                                    }}>
                                    <Icon size={15} /> {label}
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="form-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="text" className="form-input" placeholder="Your name"
                                    style={{ paddingLeft: '2.7rem' }} value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="email" className="form-input" placeholder="you@example.com"
                                    style={{ paddingLeft: '2.7rem' }} value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="password" className="form-input" placeholder="Create a password"
                                    style={{ paddingLeft: '2.7rem' }} value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="password" className="form-input" placeholder="Repeat your password"
                                    style={{ paddingLeft: '2.7rem' }} value={form.confirm}
                                    onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.15rem' }}>
                            Create Account <ArrowRight size={16} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

/* ── Main Login Page ───────────────────────────────────── */
const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const { loginUser } = useApp();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const validStudents = ['student', 'aravind', 'jaswanth', 'anish'];
            const matchedStudent = validStudents.find(s => s.toLowerCase() === username.toLowerCase());

            if (role === 'student' && matchedStudent && password === 'student123') {
                const displayName = matchedStudent === 'student' ? 'Student Demo' : matchedStudent.charAt(0).toUpperCase() + matchedStudent.slice(1);
                const ids = { 'aravind': '2400030040', 'jaswanth': '2400030439', 'anish': '2400032357', 'student': 'STU-DEMO' };
                loginUser({ name: displayName, id: ids[matchedStudent.toLowerCase()], role: 'student', dept: 'Computer Science', semester: '6th Semester' });
                navigate('/student');
            } else if (role === 'admin' && (username.toLowerCase() === 'admin' || username.toLowerCase() === 'ram') && password === 'admin123') {
                loginUser({ name: 'Ram', role: 'admin' });
                navigate('/admin');
            } else {
                setError('Invalid username or password. Please try again.');
            }
        }, 650);
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', padding: '1.5rem', overflow: 'hidden',
            background: 'linear-gradient(140deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)',
        }}>
            <div className="bg-blob blob-1" style={{ opacity: 0.22 }} />
            <div className="bg-blob blob-2" style={{ opacity: 0.18 }} />
            <div className="bg-blob blob-3" style={{ opacity: 0.12 }} />

            {/* Back to home */}
            <a href="/" style={{ position: 'absolute', top: '1.5rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--accent-secondary)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <BookOpen size={15} /> EduFeedback
            </a>

            <div className="animate-fade-in" style={{ maxWidth: '450px', width: '100%' }}>
                <div style={{
                    background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(245,158,11,0.25)', borderRadius: 24,
                    padding: '2.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Top glow line */}
                    <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)' }} />

                    {/* Icon + heading */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 25px rgba(245,158,11,0.25)' }}>
                            <BookOpen size={28} color="#0f172a" strokeWidth={2.2} />
                        </div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Sign in to your EduFeedback account</p>
                    </div>

                    {/* Role toggle */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', marginBottom: '1.75rem', background: 'rgba(245,158,11,0.08)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '0.28rem' }}>
                        {[
                            { r: 'student', label: 'Student', Icon: User },
                            { r: 'admin', label: 'Admin', Icon: ShieldCheck },
                        ].map(({ r, label, Icon }) => (
                            <button key={r} type="button" onClick={() => { setRole(r); setError(''); }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', padding: '0.65rem', borderRadius: 9,
                                    fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer', transition: 'var(--transition)',
                                    background: role === r ? 'var(--accent-gradient)' : 'transparent',
                                    color: role === r ? '#0f172a' : 'var(--text-secondary)',
                                    boxShadow: role === r ? '0 4px 14px rgba(245,158,11,0.3)' : 'none',
                                }}>
                                <Icon size={16} /> {label}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="alert alert-error animate-fade" style={{ marginBottom: '1.25rem' }}>{error}</div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        {/* Username */}
                        <div>
                            <label className="form-label">Username</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="text" className="form-input" placeholder={role === 'student' ? 'e.g. Aravind' : 'e.g. Ram'}
                                    style={{ paddingLeft: '2.7rem' }} value={username} onChange={e => setUsername(e.target.value)} required />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                <label className="form-label" style={{ margin: 0 }}>Password</label>
                                <button type="button" onClick={() => setShowForgot(true)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600, padding: 0 }}>
                                    Forgot password?
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type={showPass ? 'text' : 'password'} className="form-input"
                                    placeholder="Enter your password"
                                    style={{ paddingLeft: '2.7rem', paddingRight: '2.7rem' }}
                                    value={password} onChange={e => setPassword(e.target.value)} required />
                                <button type="button" onClick={() => setShowPass(p => !p)}
                                    style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ width: '100%', padding: '0.9rem', marginTop: '0.25rem', opacity: loading ? 0.7 : 1 }}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <svg width="17" height="17" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
                                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeDashoffset="20" strokeLinecap="round" />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : (<>Sign in as {role === 'student' ? 'Student' : 'Admin'} <ArrowRight size={16} /></>)}
                        </button>
                    </form>

                    {/* Create account link */}
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.87rem', color: 'var(--text-muted)' }}>
                        Don't have an account?{' '}
                        <button type="button" onClick={() => setShowCreate(true)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.87rem', padding: 0 }}>
                            Create account
                        </button>
                    </p>
                </div>
            </div>

            {showForgot && <ForgotModal onClose={() => setShowForgot(false)} />}
            {showCreate && <CreateAccountModal onClose={() => setShowCreate(false)} />}
        </div>
    );
};

export default Login;
