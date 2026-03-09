import React, { useState, useContext, useMemo } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import EventCard from '../components/EventCard';
import BottomNav from '../components/BottomNav';
import './Search.css';

const Search = () => {
    const { events } = useContext(AppContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterType, setFilterType] = useState('');

    // Extract unique categories from db mapping
    const CATEGORIES = ['Tech', 'Cultural', 'Sports', 'Workshops', 'Hackathons', 'Clubs'];

    const filteredEvents = useMemo(() => {
        let result = events;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.title.toLowerCase().includes(q) ||
                e.description.toLowerCase().includes(q)
            );
        }

        if (filterCategory) {
            result = result.filter(e => e.category === filterCategory);
        }

        if (filterDate) {
            // Basic strict match for date sorting
            result = result.filter(e => e.date === filterDate);
        }

        if (filterType) {
            if (filterType === 'Free') result = result.filter(e => e.isFree === true);
            if (filterType === 'Paid') result = result.filter(e => e.isFree === false);
        }

        return result;
    }, [events, searchQuery, filterCategory, filterDate, filterType]);

    return (
        <div className="page-wrapper search-page">
            <div className="search-header">
                <h2>Explore Events</h2>
            </div>

            <div className="search-bar-container">
                <SearchIcon className="search-icon" size={20} />
                <input
                    type="text"
                    className="glass-input search-input"
                    placeholder="Search events, artists, venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="filters-section glass-panel">
                <div className="filter-header">
                    <Filter size={16} />
                    <span>Filter By</span>
                </div>

                <div className="filters-grid">
                    <select
                        className="glass-input custom-select filter-select"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select
                        className="glass-input custom-select filter-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">Any Price</option>
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                    </select>

                    <input
                        type="date"
                        className="glass-input filter-select"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="search-results">
                <p className="results-count">{filteredEvents.length} events found</p>
                <div className="events-list">
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                    {filteredEvents.length === 0 && (
                        <p className="empty-state">No events found matching your criteria.</p>
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Search;
