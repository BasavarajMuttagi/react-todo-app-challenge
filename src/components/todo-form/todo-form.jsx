import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

export const TodoForm = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    if (task.trim()) {
      const newTodo = {
        id: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 0,
        label: task.trim(),
        checked: false,
      };
      setTodos([...todos, newTodo]);
      setTask('');
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button
        type="button"
        onClick={handleAddTodo}
        disabled={!task.trim()}
      >
        Add task
      </button>
    </div>
  );
};
