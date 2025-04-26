import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-results.scss';

export const TodoResults = () => {
  const { todos } = React.useContext(TodosContext);

  const calculateChecked = () => {
    const completedTasks = todos.filter((todo) => todo.checked).length;
    return `${completedTasks} / ${todos.length}`;
  };

  return (
    <div className="todo-results">
      Done:
      {' '}
      {calculateChecked()}
    </div>
  );
};
