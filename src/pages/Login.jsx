import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowRight, Lock, BookOpen, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginUser } = useApp();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const validStudents = ['student', 'aravind', 'jaswanth', 'anish'];

            // Normalize exactly how we store the name (Capitalized for display)
            const matchedStudent = validStudents.find(s => s.toLowerCase() === username.toLowerCase());

            if (role === 'student' && matchedStudent && password === 'student123') {
                const displayName = matchedStudent === 'student' ? 'Student Demo' : matchedStudent.charAt(0).toUpperCase() + matchedStudent.slice(1);

                // Demo mapping for generic IDs
                const ids = { 'aravind': '2400030040', 'jaswanth': '2400030439', 'anish': '2400032357', 'student': 'STU-DEMO' };
                const studentId = ids[matchedStudent.toLowerCase()];

                loginUser({
                    name: displayName,
                    id: studentId,
                    role: 'student',
                    dept: 'Computer Science',
                    semester: '6th Semester'
                });

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
            background: 'linear-gradient(140deg, #fff8f0 0%, #fff3e0 55%, #ffe8cc 100%)',
        }}>
            {/* blobs */}
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
                    background: 'rgba(255,251,245,0.98)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(249,115,22,0.20)', borderRadius: 24,
                    padding: '2.5rem', boxShadow: '0 20px 60px rgba(180,80,0,0.14)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Top glow line */}
                    <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)' }} />

                    {/* Icon + heading */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 25px rgba(249,115,22,0.40)' }}>
                            <BookOpen size={28} color="#fff" strokeWidth={2.2} />
                        </div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Sign in to your EduFeedback account</p>
                    </div>

                    {/* Role toggle */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', marginBottom: '1.75rem', background: 'rgba(124,108,245,0.06)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '0.28rem' }}>
                        {[
                            { r: 'student', label: 'Student', Icon: User },
                            { r: 'admin', label: 'Admin', Icon: ShieldCheck },
                        ].map(({ r, label, Icon }) => (
                            <button key={r} type="button" onClick={() => { setRole(r); setError(''); }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', padding: '0.65rem', borderRadius: 9,
                                    fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer', transition: 'var(--transition)',
                                    background: role === r ? 'var(--accent-gradient)' : 'transparent',
                                    color: role === r ? '#fff' : 'var(--text-secondary)',
                                    boxShadow: role === r ? '0 4px 14px rgba(249,115,22,0.40)' : 'none',
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
                                <input type="text" className="form-input" placeholder={role === 'student' ? 'e.g. student' : 'e.g. Ram'}
                                    style={{ paddingLeft: '2.7rem' }} value={username} onChange={e => setUsername(e.target.value)} required />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="form-label">Password</label>
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

                    {/* Demo credentials */}
                    <div style={{ marginTop: '1.75rem', padding: '1rem', background: 'rgba(249,115,22,0.06)', borderRadius: 10, border: '1px solid rgba(249,115,22,0.18)', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ color: 'var(--accent-secondary)', fontWeight: 700, marginBottom: '0.4rem' }}>Demo Students (pass: student123)</div>
                            <div>user: <b style={{ color: 'var(--text-secondary)' }}>Aravind</b></div>
                            <div>user: <b style={{ color: 'var(--text-secondary)' }}>Jaswanth</b></div>
                            <div>user: <b style={{ color: 'var(--text-secondary)' }}>Anish</b></div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--accent-secondary)', fontWeight: 700, marginBottom: '0.4rem' }}>Admin</div>
                            <div>user: <b style={{ color: 'var(--text-secondary)' }}>Ram</b></div>
                            <div>pass: <b style={{ color: 'var(--text-secondary)' }}>admin123</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
