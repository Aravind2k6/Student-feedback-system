import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, UserCheck, TrendingUp, BarChart3, PlusCircle, Rocket, Brain, Bell, FileText, Globe, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { feedbacks, availableCourses, availableInstructors, currentUser, createForm } = useApp();

    const [campaignTitle, setCampaignTitle] = useState('');
    const [posting, setPosting] = useState(false);

    const handleCreateCampaign = (e) => {
        e.preventDefault();
        if (!campaignTitle) return;
        setPosting(true);
        createForm({
            title: campaignTitle,
            published: true,
            fields: [] // Campaign metadata
        });
        setTimeout(() => {
            setPosting(false);
            setCampaignTitle('');
        }, 1000);
    };

    const stats = [
        { label: 'Total Feedbacks', value: feedbacks.length, icon: <Users size={22} />, color: '#22d3a5', bg: 'rgba(34,211,165,0.15)' },
        { label: 'Courses Tracked', value: availableCourses.length, icon: <BookOpen size={22} />, color: '#7c6cf5', bg: 'rgba(124,108,245,0.15)' },
        { label: 'Instructors', value: availableInstructors.length, icon: <UserCheck size={22} />, color: '#60a5fa', bg: 'rgba(96,165,250,0.15)' },
        { label: 'Avg Satisfaction', value: feedbacks.length > 0 ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1) : '0', icon: <TrendingUp size={22} />, color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
    ];

    const getCourseStats = (course) => {
        const courseFeedbacks = feedbacks.filter(f => f.course === course);
        const avg = courseFeedbacks.length > 0
            ? (courseFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / courseFeedbacks.length).toFixed(1)
            : '0';
        return { avg, count: courseFeedbacks.length };
    };

    return (
        <div>
            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1 className="page-title animate-fade-in">Admin Dashboard</h1>
                    <p className="page-subtitle animate-fade-in animate-delay-1" style={{ marginBottom: 0 }}>
                        Welcome back, <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>{currentUser?.name || 'Admin'}</span>! Monitor real-time student feedback.
                    </p>
                </div>
                <div className="animate-fade-in animate-delay-2">
                    <button className="btn-primary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.88rem' }} onClick={() => navigate('/admin/analysis')}>
                        <BarChart3 size={16} /> Data Analytics
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid-2 animate-fade-in" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '1.50rem', marginBottom: '2.5rem' }}>
                {/* Statistics Grid */}
                <div className="grid-2" style={{ gap: '1rem' }}>
                    {stats.map((s, i) => (
                        <div key={i} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.15rem', animationDelay: `${i * 0.08}s` }}>
                            <div className="stat-icon" style={{ background: s.bg, width: 40, height: 40, flexShrink: 0 }}><span style={{ color: s.color }}>{s.icon}</span></div>
                            <div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginBottom: '0.1rem' }}>{s.label}</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create New Campaign Widget */}
                <div className="glass-panel" style={{ border: '1px solid var(--accent-primary)', background: 'rgba(245,158,11,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
                            <PlusCircle size={18} />
                        </div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Create Feedback Campaign</h3>
                    </div>

                    <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label className="form-label" style={{ fontSize: '0.75rem' }}>Campaign Title</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. End-Semester Feedback"
                                value={campaignTitle}
                                onChange={e => setCampaignTitle(e.target.value)}
                                style={{ padding: '0.6rem' }}
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.7rem', fontSize: '0.85rem' }} disabled={posting || !campaignTitle}>
                            {posting ? 'Creating...' : 'Launch Campaign'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Course Ratings List */}
            <div className="glass-panel animate-fade-in animate-delay-2">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>📊 Course Rating Overview</h2>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th style={{ textAlign: 'center' }}>Avg Rating</th>
                                <th style={{ textAlign: 'center' }}>Submissions</th>
                                <th>Quality Status</th>
                                <th>Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableCourses.map((course) => {
                                const { avg, count } = getCourseStats(course);
                                return (
                                    <tr key={course}>
                                        <td>
                                            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{course}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Core Curriculum</div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{avg} / 4</div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{
                                                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                                                background: 'rgba(34,211,165,0.1)', border: '1px solid rgba(34,211,165,0.25)',
                                                borderRadius: 10, padding: '0.25rem 0.75rem', minWidth: 60,
                                            }}>
                                                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#22d3a5', lineHeight: 1 }}>{count}</span>
                                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>students</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${parseFloat(avg) >= 3 ? 'badge-success' : parseFloat(avg) >= 2 ? 'badge-warning' : 'badge-danger'}`}>
                                                {parseFloat(avg) >= 3.5 ? 'Excellent' : parseFloat(avg) >= 3 ? 'Good' : parseFloat(avg) >= 2 ? 'Average' : count === 0 ? 'No Data' : 'Poor'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-ghost" style={{ padding: '0.4rem 0.7rem', fontSize: '0.78rem' }} onClick={() => navigate('/admin/analysis')}>
                                                <BarChart3 size={13} /> Details
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upcoming Features */}
            <div className="glass-panel animate-fade-in animate-delay-3" style={{ marginTop: '2rem', border: '1px solid rgba(124,108,245,0.3)', background: 'rgba(124,108,245,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#7c6cf5,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                        <Rocket size={17} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.05rem' }}>Upcoming Features</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Planned improvements coming soon</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                    {[
                        { icon: <Brain size={16} />, color: '#a855f7', bg: 'rgba(168,85,247,0.12)', title: 'AI-Powered Insights', desc: 'Automatic analysis of feedback patterns using machine learning to suggest curriculum improvements.' },
                        { icon: <Bell size={16} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', title: 'Smart Notifications', desc: 'Auto-alert admins and teachers when course ratings drop below a configurable threshold.' },

                        { icon: <Globe size={16} />, color: '#00d4ff', bg: 'rgba(0,212,255,0.12)', title: 'Multi-Language Support', desc: 'Feedback forms in regional languages to improve accessibility for all students.' },

                    ].map((f, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.9rem', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ width: 34, height: 34, borderRadius: 9, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, flexShrink: 0 }}>{f.icon}</div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{f.title}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Privacy notice */}
            <div className="alert alert-info animate-fade-in animate-delay-3" style={{ marginTop: '1.5rem' }}>
                🔒 <strong>Privacy Notice:</strong> Student names and personal details are not stored. You can only see submission counts per form.
            </div>
        </div>
    );
};

export default AdminDashboard;
