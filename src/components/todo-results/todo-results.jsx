import * as React from 'react';
import './todo-results.scss';

export const TodoResults = () => {
  const calculateChecked = () => {
    // Fix the app to count the completed tasks
  };

  return (
    <div className="todo-results">
      Done:
      {calculateChecked()}
    </div>
  );
};
