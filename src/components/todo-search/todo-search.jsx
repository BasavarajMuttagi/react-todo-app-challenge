import * as React from 'react';
import './todo-search.scss';

export const TodoSearch = ({ onSearch }) => (
  <div className="todo-search">
    <input
      type="text"
      placeholder="Search tasks..."
      onChange={(e) => onSearch(e.target.value)}
      aria-label="Search tasks"
    />
  </div>
);
