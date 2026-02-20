import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/* ─── Default seed forms so the app has data out of the box ─── */
const SEED_FORMS = [
    {
        id: 'campaign-seed-1',
        title: 'Mid-Semester Feedback 2024',
        description: 'Help us improve course quality by sharing your mid-term honest feedback.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        published: true,
        fields: [
            { id: 'f1', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
            { id: 'f2', label: 'Student ID', type: 'text', required: true, placeholder: 'e.g. STU-2024-042' },
            { id: 'f3', label: 'Course', type: 'text', required: true, placeholder: 'e.g. FSAD' },
            { id: 'f4', label: 'Instructor name', type: 'text', required: true, placeholder: 'e.g. Ramu' },
            { id: 'f5', label: 'Department', type: 'select', required: true, options: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'] },
            { id: 'f6', label: 'Overall Course Rating', type: 'rating', required: true },
            { id: 'f7', label: 'Was the course content relevant to your goals?', type: 'yesno', required: true },
            { id: 'f8', label: 'Additional Comments', type: 'textarea', required: false, placeholder: 'Any suggestions or feedback...' },
        ],
    },
    {
        id: 'campaign-seed-2',
        title: 'End-Semester Evaluation',
        description: 'Help us improve course quality by sharing your final honest feedback.',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        published: true,
        fields: [
            { id: 'g1', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
            { id: 'g2', label: 'Student ID', type: 'text', required: true, placeholder: 'e.g. STU-2024-042' },
            { id: 'g3', label: 'Course', type: 'text', required: true, placeholder: 'e.g. Data Structures' },
            { id: 'g4', label: 'Instructor name', type: 'text', required: true, placeholder: 'e.g. Ganesh' },
            { id: 'g5', label: 'Faculty Knowledge Rating', type: 'rating', required: true },
            { id: 'g6', label: 'Communication Clarity', type: 'rating', required: true },
            { id: 'g7', label: 'Would you recommend this faculty?', type: 'yesno', required: true },
            { id: 'g8', label: 'Suggestions for Faculty', type: 'textarea', required: false, placeholder: 'What could be improved?' },
        ],
    },
];

/* ─── Helpers ─── */
const load = (key, fallback) => {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
};
const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { }
};

/* ─── Context ─── */
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [forms, setForms] = useState(() => {
        const stored = load('edu_forms', null);
        // Seed only if nothing stored yet
        if (!stored) { save('edu_forms', SEED_FORMS); return SEED_FORMS; }
        return stored;
    });

    const [availableCourses] = useState(['FSAD', 'CIS', 'DBMS', 'OS', 'AIML']);
    const [availableInstructors] = useState(['Ramu', 'Ganesh', 'Abhinav', 'Raghavendra', 'Sai']);

    // Detailed submissions: Array of { id, course, instructor, rating, remarks, timestamp }
    const [feedbacks, setFeedbacks] = useState(() => load('edu_feedbacks', []));

    // submissions: { [submissionKey]: number } - kept for backward compatibility and fast "already submitted" checks
    const [submissionCounts, setSubmissionCounts] = useState(() =>
        load('edu_submission_counts', { 'fb-fsad-ramu': 12, 'fb-cis-ganesh': 8 })
    );

    // track which keys this student has already submitted in this session
    const [submittedByStudent, setSubmittedByStudent] = useState(() =>
        load('edu_student_submitted', [])
    );

    // Track the currently logged in user (student or admin)
    const [currentUser, setCurrentUser] = useState(() => load('edu_current_user', null));

    // Persist whenever state changes
    useEffect(() => { save('edu_forms', forms); }, [forms]);
    useEffect(() => { save('edu_feedbacks', feedbacks); }, [feedbacks]);
    useEffect(() => { save('edu_submission_counts', submissionCounts); }, [submissionCounts]);
    useEffect(() => { save('edu_student_submitted', submittedByStudent); }, [submittedByStudent]);
    useEffect(() => { save('edu_current_user', currentUser); }, [currentUser]);

    /* ── Auth: Login / Logout ── */
    const loginUser = useCallback((user) => {
        setCurrentUser(user);
    }, []);

    const logoutUser = useCallback(() => {
        setCurrentUser(null);
    }, []);

    /* ── Admin: create / delete form ── */
    const createForm = useCallback((formData) => {
        const newForm = {
            ...formData,
            id: `form-${Date.now()}`,
            createdAt: new Date().toISOString(),
            published: true,
        };
        setForms(prev => [newForm, ...prev]);
        return newForm.id;
    }, []);

    const deleteForm = useCallback((id) => {
        setForms(prev => prev.filter(f => f.id !== id));
        setSubmissionCounts(prev => { const n = { ...prev }; delete n[id]; return n; });
    }, []);

    /* ── Student: submit feedback ── */
    const submitForm = useCallback((submissionKey, feedbackData) => {
        // Increment count
        setSubmissionCounts(prev => ({ ...prev, [submissionKey]: (prev[submissionKey] || 0) + 1 }));

        // Save detailed feedback if provided
        if (feedbackData) {
            setFeedbacks(prev => [{
                id: `fb-${Date.now()}`,
                ...feedbackData,
                timestamp: new Date().toISOString()
            }, ...prev]);
        }

        // Track for the current session/student
        setSubmittedByStudent(prev => [...new Set([...prev, submissionKey])]);
    }, []);

    const hasStudentSubmitted = useCallback(
        (formId) => submittedByStudent.includes(formId),
        [submittedByStudent]
    );

    /* ── Derived stats ── */
    const totalForms = forms.length;
    const totalSubmissions = Object.values(submissionCounts).reduce((a, b) => a + b, 0);
    const publishedForms = forms.filter(f => f.published);

    return (
        <AppContext.Provider value={{
            forms, publishedForms,
            availableCourses, availableInstructors,
            feedbacks,
            submissionCounts,
            totalForms, totalSubmissions,
            createForm, deleteForm,
            submitForm, hasStudentSubmitted,
            currentUser, loginUser, logoutUser,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used inside AppProvider');
    return ctx;
};
