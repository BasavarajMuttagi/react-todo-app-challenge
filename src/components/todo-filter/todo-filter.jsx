import * as React from 'react';
import './todo-filter.scss';

export const TodoFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Incomplete' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="todo-filter">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`filter-button ${activeFilter === id ? 'active' : ''}`}
          onClick={() => onFilterChange(id)}
          aria-pressed={activeFilter === id}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
