import React, { useState, useEffect } from 'react';
import { AppContext } from './AppContext';

// Dummy Data
const dummyEvents = [
    {
        id: 1,
        title: "Global Tech Summit 2026",
        category: "Tech",
        date: "2026-04-15",
        time: "09:00 AM",
        venue: "Main Auditorium, Block A",
        description: "Join industry leaders to discuss the latest advancements in AI, Web3, and quantum computing. A great place to network and learn.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: false
    },
    {
        id: 2,
        title: "Annual Cultural Fest: Resonance",
        category: "Cultural",
        date: "2026-05-02",
        time: "06:00 PM",
        venue: "Open Air Theatre",
        description: "Experience a night of mesmerizing performances ranging from classical dance to modern rock bands. Food stalls and activities included.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: true
    },
    {
        id: 3,
        title: "Inter-College Basketball Championship",
        category: "Sports",
        date: "2026-03-20",
        time: "10:00 AM",
        venue: "Indoor Sports Complex",
        description: "Cheer for your college team as they battle it out for the ultimate championship trophy. Final match at 5 PM.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1190&q=80",
        isFree: true
    },
    {
        id: 4,
        title: "React & Next.js Masterclass",
        category: "Workshops",
        date: "2026-03-25",
        time: "02:00 PM",
        venue: "Computer Lab 3, IT Dept",
        description: "A hands-on workshop on building modern web applications using React and Next.js. Prerequisites: Basic HTML/CSS/JS.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: false
    },
    {
        id: 5,
        title: "HackTheFuture 48-Hour Hackathon",
        category: "Hackathons",
        date: "2026-04-10",
        time: "08:00 AM",
        venue: "Innovation Center",
        description: "Build innovative solutions to global problems in 48 hours. Mentorship, food, and huge prize pools awaited!",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: true
    },
    {
        id: 6,
        title: "Literature Society Meetup",
        category: "Clubs",
        date: "2026-03-18",
        time: "04:30 PM",
        venue: "Central Library Room 2",
        description: "Monthly discussion focusing on contemporary dystopian literature and poetry readings. New members welcome.",
        image: "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: true
    },
    {
        id: 7,
        title: "Cybersecurity Basics Seminar",
        category: "Tech",
        date: "2026-03-22",
        time: "11:00 AM",
        venue: "Seminar Hall, CSE Dept",
        description: "Learn about network vulnerabilities, ethical hacking, and how to protect digital assets from prominent industry experts.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: true
    },
    {
        id: 8,
        title: "Standup Comedy Night",
        category: "Cultural",
        date: "2026-04-05",
        time: "07:30 PM",
        venue: "Student Activity Center",
        description: "Take a break from academics and enjoy an evening of hilarious standup comedy by popular local artists.",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: false
    },
    {
        id: 9,
        title: "Data Science & ML Bootcamp",
        category: "Workshops",
        date: "2026-04-20",
        time: "09:00 AM",
        venue: "Online (Hybrid)",
        description: "Intensive bootcamp covering Python, Pandas, Scikit-Learn, and building your first neural network.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: false
    },
    {
        id: 10,
        title: "Robotics Club Expo",
        category: "Clubs",
        date: "2026-03-30",
        time: "10:00 AM",
        venue: "Mechanical Dept Courtyard",
        description: "Showcase of autonomous robots, drones, and mechatronic projects built by students over the year.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        isFree: true
    }
];

export const AppProvider = ({ children }) => {
    // Global State initialized directly from localStorage
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('eventMateUser');
            return stored ? JSON.parse(stored) : {
                isAuthenticated: false,
                name: '',
                email: '',
                year: '',
                department: '',
                interests: [],
            };
        } catch {
            return {
                isAuthenticated: false,
                name: '',
                email: '',
                year: '',
                department: '',
                interests: [],
            };
        }
    });

    const [events] = useState(dummyEvents); // Fixed no-unused-vars error here

    const [savedEvents, setSavedEvents] = useState(() => {
        try {
            const stored = localStorage.getItem('eventMateSaved');
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    const [registeredEvents, setRegisteredEvents] = useState(() => {
        try {
            const stored = localStorage.getItem('eventMateRegistered');
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    // Sync to local storage
    useEffect(() => {
        localStorage.setItem('eventMateUser', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('eventMateSaved', JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        localStorage.setItem('eventMateRegistered', JSON.stringify(registeredEvents));
    }, [registeredEvents]);

    // Actions
    const login = (userData) => {
        setUser({ ...user, ...userData, isAuthenticated: true });
    };

    const logout = () => {
        setUser({
            isAuthenticated: false,
            name: '',
            email: '',
            year: '',
            department: '',
            interests: [],
        });
    };

    const updateProfile = (updates) => {
        setUser({ ...user, ...updates });
    };

    const toggleSavedEvent = (eventId) => {
        if (savedEvents.includes(eventId)) {
            setSavedEvents(savedEvents.filter(id => id !== eventId));
        } else {
            setSavedEvents([...savedEvents, eventId]);
        }
    };

    const registerForEvent = (eventId) => {
        if (!registeredEvents.includes(eventId)) {
            setRegisteredEvents([...registeredEvents, eventId]);
        }
    };

    return (
        <AppContext.Provider value={{
            user,
            events,
            savedEvents,
            registeredEvents,
            login,
            logout,
            updateProfile,
            toggleSavedEvent,
            registerForEvent
        }}>
            {children}
        </AppContext.Provider>
    );
};
