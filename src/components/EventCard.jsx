import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, MapPin, Calendar, Clock } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './EventCard.css';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const { savedEvents, toggleSavedEvent } = useContext(AppContext);

    const isSaved = savedEvents.includes(event.id);

    const handleCardClick = () => {
        navigate(`/event/${event.id}`);
    };

    const handleHeartClick = (e) => {
        e.stopPropagation();
        toggleSavedEvent(event.id);
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        // In a real app, this would open a share dialog
        alert('Share link copied to clipboard!');
    };

    return (
        <div className="event-card glass-panel" onClick={handleCardClick}>
            <div className="card-image-wrapper">
                <span className="category-badge">{event.category}</span>
                <div className="card-actions">
                    <button
                        className={`icon-btn ${isSaved ? 'saved' : ''}`}
                        onClick={handleHeartClick}
                    >
                        <Heart size={20} fill={isSaved ? "var(--accent-secondary)" : "none"} color={isSaved ? "var(--accent-secondary)" : "white"} />
                    </button>
                    <button className="icon-btn" onClick={handleShareClick}>
                        <Share2 size={20} color="white" />
                    </button>
                </div>
                <img src={event.image} alt={event.title} className="card-image" loading="lazy" />
            </div>

            <div className="card-content">
                <h3 className="card-title">{event.title}</h3>

                <div className="card-details">
                    <div className="detail-item">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                    </div>
                    <div className="detail-item">
                        <MapPin size={14} />
                        <span className="truncate">{event.venue}</span>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="card-price">{event.isFree ? 'Free' : 'Paid'}</span>
                    <button className="btn btn-primary btn-sm">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
