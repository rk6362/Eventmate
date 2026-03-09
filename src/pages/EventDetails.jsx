import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, MapPin, Calendar, Clock, Heart, Share2 } from 'lucide-react';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { events, savedEvents, registeredEvents, toggleSavedEvent, registerForEvent } = useContext(AppContext);

    const event = events.find(e => e.id === parseInt(id));

    if (!event) {
        return (
            <div className="page-wrapper text-center">
                <h2>Event not found</h2>
                <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const isSaved = savedEvents.includes(event.id);
    const isRegistered = registeredEvents.includes(event.id);

    const handleApply = () => {
        registerForEvent(event.id);
        alert('Successfully registered for this event! It has been added to your profile.');
    };

    const handleShare = () => {
        alert('Share link copied to clipboard!');
    };

    return (
        <div className="event-details-page">
            <div className="details-hero">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} color="white" />
                </button>
                <div className="hero-actions">
                    <button className={`icon-btn ${isSaved ? 'saved' : ''}`} onClick={() => toggleSavedEvent(event.id)}>
                        <Heart size={20} fill={isSaved ? "var(--accent-secondary)" : "none"} color={isSaved ? "var(--accent-secondary)" : "white"} />
                    </button>
                    <button className="icon-btn" onClick={handleShare}>
                        <Share2 size={20} color="white" />
                    </button>
                </div>
                <img src={event.image} alt={event.title} className="hero-image" />
                <div className="hero-gradient"></div>
            </div>

            <div className="details-content page-wrapper no-padding-bottom">
                <span className="category-tag">{event.category}</span>
                <h1 className="details-title">{event.title}</h1>

                <div className="details-meta glass-panel">
                    <div className="meta-row">
                        <div className="meta-icon-wrapper">
                            <Calendar size={20} color="var(--accent-primary)" />
                        </div>
                        <div className="meta-text">
                            <span className="meta-label">Date</span>
                            <span className="meta-value">{event.date}</span>
                        </div>
                    </div>
                    <div className="meta-row">
                        <div className="meta-icon-wrapper">
                            <Clock size={20} color="var(--accent-primary)" />
                        </div>
                        <div className="meta-text">
                            <span className="meta-label">Time</span>
                            <span className="meta-value">{event.time}</span>
                        </div>
                    </div>
                    <div className="meta-row">
                        <div className="meta-icon-wrapper">
                            <MapPin size={20} color="var(--accent-primary)" />
                        </div>
                        <div className="meta-text">
                            <span className="meta-label">Venue</span>
                            <span className="meta-value">{event.venue}</span>
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    <h3>About this Event</h3>
                    <p className="description-text">{event.description}</p>
                </div>
            </div>

            <div className="fixed-bottom-action glass-panel">
                <div className="price-tag">
                    <span className="price-label">Price</span>
                    <span className="price-value">{event.isFree ? 'Free' : 'Paid'}</span>
                </div>
                <button
                    className="btn btn-primary apply-btn"
                    onClick={handleApply}
                    disabled={isRegistered}
                >
                    {isRegistered ? 'Successfully Applied' : 'Apply Now'}
                </button>
            </div>
        </div>
    );
};

export default EventDetails;
