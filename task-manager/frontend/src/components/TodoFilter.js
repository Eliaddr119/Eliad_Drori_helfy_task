import React from 'react';
import '../styles/TodoFilter.css';

function TodoFilter({ currentFilter, onFilterChange }) {
    const filters = ['all', 'active', 'completed'];

    return (
        <div className="filter-container">
            {filters.map((f) => (
                <button
                    key={f}
                    className={`filter-btn ${currentFilter === f ? 'active' : ''}`}
                    onClick={() => onFilterChange(f)}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default TodoFilter;