import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodoSearch } from '../todo-search';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleCheck = (id) => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      checked: todo.id === id ? !todo.checked : todo.checked,
    }));
    setTodos(updatedTodos);
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  const filteredTodos = React.useMemo(() => {
    if (!searchTerm) {
      return todos;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return todos.filter((todo) => (
      todo.label.toLowerCase().includes(lowerSearchTerm)
    ));
  }, [todos, searchTerm]);

  return (
    <div className="todo-list">
      <TodoSearch onSearch={setSearchTerm} />
      <span className="todo-list-title">Things to do:</span>
      {filteredTodos.length ? (
        <div className="todo-list-content">
          {filteredTodos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">
          {todos.length
            ? 'No matching tasks found'
            : 'Looks like you&apos;re up for a challenge!'}
        </div>
      )}
    </div>
  );
};
