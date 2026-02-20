import { useState, useMemo } from 'react';
import { ClipboardList, CheckCircle2, AlertCircle, Send, Award, BookOpen, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const RatingWidget = ({ value, onChange }) => {
    return (
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            {[1, 2, 3, 4].map(n => (
                <button key={n} type="button"
                    onClick={() => onChange(n)}
                    style={{
                        width: 44, height: 44, borderRadius: 10, fontSize: '1.1rem', fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'var(--transition)', cursor: 'pointer',
                        border: `2px solid ${value === n ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                        background: value === n ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                        color: value === n ? '#fff' : 'var(--text-secondary)',
                        boxShadow: value === n ? '0 8px 20px rgba(249,115,22,0.3)' : 'none',
                    }}
                >
                    {n}
                </button>
            ))}
            {value > 0 && (
                <span style={{ marginLeft: '0.8rem', fontSize: '0.9rem', color: 'var(--accent-secondary)', fontWeight: 800, textTransform: 'uppercase' }}>
                    {['', 'Poor', 'Average', 'Good', 'Excellent'][value]}
                </span>
            )}
        </div>
    );
};

const StudentDashboard = () => {
    const { publishedForms, submitForm, currentUser, hasStudentSubmitted, availableCourses, availableInstructors } = useApp();
    const student = (currentUser && currentUser.name) ? currentUser : { name: 'Student', id: 'STU-DEMO', dept: 'Computer Science', semester: '6th Semester' };

    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [rating, setRating] = useState(0);
    const [remarks, setRemarks] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const submissionKey = useMemo(() => {
        if (!selectedCampaign || !selectedCourse || !selectedInstructor) return null;
        return `fb-${selectedCampaign.id}-${selectedCourse}-${selectedInstructor}`.toLowerCase().replace(/\s+/g, '-');
    }, [selectedCampaign, selectedCourse, selectedInstructor]);

    const isAlreadySubmitted = useMemo(() => {
        return submissionKey ? hasStudentSubmitted(submissionKey) : false;
    }, [submissionKey, hasStudentSubmitted]);

    const courses = availableCourses;
    const instructors = availableInstructors;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCourse || !selectedInstructor || rating === 0) {
            setError('Please select Course, Instructor and Rating.');
            return;
        }

        // Submit using the unique key and pass data for Admin to see
        submitForm(submissionKey, {
            course: selectedCourse,
            instructor: selectedInstructor,
            rating,
            remarks
        });

        setSubmitted(true);
        setError('');

        // Reset after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setSelectedCourse('');
            setSelectedInstructor('');
            setRating(0);
            setRemarks('');
        }, 3000);
    };

    return (
        <div>
            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1 className="page-title animate-fade-in">Student Dashboard</h1>
                    <p className="page-subtitle animate-fade-in animate-delay-1" style={{ marginBottom: 0 }}>
                        Welcome back, <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>{student.name}</span>!
                    </p>
                </div>
                <div className="badge badge-purple animate-fade-in animate-delay-2" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
                    <Award size={14} /> {student.semester}
                </div>
            </div>

            <div className="grid-2 animate-fade-in animate-delay-2" style={{ gap: '1.5rem', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)' }}>
                {/* Feedback Selection Widget */}
                <div className="glass-panel">
                    {!selectedCampaign ? (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                                    <ClipboardList size={22} />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>Active Campaigns</h2>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Select an evaluation type to begin.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {publishedForms.length === 0 ? (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--glass-border)', borderRadius: 12 }}>
                                        No active feedback campaigns at the moment.
                                    </div>
                                ) : (
                                    publishedForms.map(form => (
                                        <button key={form.id} onClick={() => setSelectedCampaign(form)} className="card animate-scale-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '1.25rem' }}>
                                            <div style={{ textAlign: 'left' }}>
                                                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{form.title}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Launched {new Date(form.createdAt).toLocaleDateString()}</div>
                                            </div>
                                            <div style={{ color: 'var(--accent-primary)' }}>
                                                Fill Feedback ➜
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <ClipboardList size={22} />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedCampaign.title}</h2>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Providing feedback for this requirement.</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedCampaign(null)} className="btn-ghost" style={{ fontSize: '0.8rem' }}>
                                    Change Campaign
                                </button>
                            </div>

                            {submitted ? (
                                <div className="animate-scale-in" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,211,165,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#22d3a5' }}>
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Feedback Submitted!</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>Thank you for helping us improve our quality.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                                    <div className="grid-2" style={{ gap: '1.1rem' }}>
                                        <div>
                                            <label className="form-label">Select Course</label>
                                            <select className="form-input" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                                                <option value="">Choose Course…</option>
                                                {courses.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="form-label">Select Instructor</label>
                                            <select className="form-input" value={selectedInstructor} onChange={e => setSelectedInstructor(e.target.value)}>
                                                <option value="">Choose Instructor…</option>
                                                {instructors.map(ins => <option key={ins} value={ins}>{ins}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {isAlreadySubmitted ? (
                                        <div className="glass-panel" style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)', padding: '1.5rem', textAlign: 'center' }}>
                                            <div style={{ color: 'var(--error)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                                <AlertCircle size={32} />
                                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Feedback Already Submitted</div>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                                                    You have already provided feedback for <strong>{selectedCourse}</strong> with <strong>{selectedInstructor}</strong> in this campaign.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="form-label" style={{ marginBottom: '0.85rem' }}>Your Rating</label>
                                                <RatingWidget value={rating} onChange={setRating} />
                                            </div>

                                            <div>
                                                <label className="form-label">Remarks / Suggestions</label>
                                                <textarea className="form-input" style={{ minHeight: 100 }}
                                                    placeholder="Share your experience or suggestions for improvement..."
                                                    value={remarks} onChange={e => setRemarks(e.target.value)} />
                                            </div>

                                            {error && (
                                                <div style={{ color: 'var(--error)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <AlertCircle size={14} /> {error}
                                                </div>
                                            )}

                                            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.8rem 2.2rem', gap: '0.6rem' }}>
                                                <Send size={18} /> Submit Feedback
                                            </button>
                                        </>
                                    )}
                                </form>
                            )}
                        </div>
                    )}
                </div>

                {/* Profile column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel">
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem' }}>👤 My Profile</h2>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: 70, height: 70, borderRadius: '50%', background: 'var(--accent-gradient)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem',
                                fontSize: '1.5rem', fontWeight: 800, color: '#fff', boxShadow: '0 8px 25px rgba(108,92,231,0.4)'
                            }}>
                                {student.name ? student.name.charAt(0) : 'S'}
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{student.name}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{student.id}</div>
                        </div>
                        {[
                            { label: 'Department', value: student.dept },
                            { label: 'Semester', value: student.semester },
                            { label: 'Role', value: 'Student' },
                        ].map((row, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0',
                                borderBottom: i < 2 ? '1px solid var(--glass-border)' : 'none', fontSize: '0.85rem'
                            }}>
                                <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{row.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel" style={{ background: 'rgba(34,211,165,0.06)', borderColor: 'rgba(34,211,165,0.2)' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(34,211,165,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3a5' }}>
                                <UserCheck size={18} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#16a085' }}>Anonymity Guaranteed</h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>Individual responses are never linked to names.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
