import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodoSearch } from '../todo-search';
import { TodoFilter } from '../todo-filter';
import { TodoPagination } from '../todo-pagination';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

const ITEMS_PER_PAGE = 10;

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);

  const getFilteredTodos = React.useCallback((todosList) => {
    let filtered = todosList;

    // Apply status filter
    if (activeFilter === 'completed') {
      filtered = filtered.filter((todo) => todo.checked);
    } else if (activeFilter === 'active') {
      filtered = filtered.filter((todo) => !todo.checked);
    }

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((todo) => (
        todo.label.toLowerCase().includes(lowerSearchTerm)
      ));
    }

    return filtered;
  }, [searchTerm, activeFilter]);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    // Calculate if we need to go to the previous page
    const updatedFilteredTodos = getFilteredTodos(updatedTodos);
    const totalPages = Math.ceil(updatedFilteredTodos.length / ITEMS_PER_PAGE);

    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    } else if (
      currentPage === totalPages
      && updatedFilteredTodos.length % ITEMS_PER_PAGE === 0
    ) {
      setCurrentPage(Math.max(1, currentPage - 1));
    }
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

  const filteredTodos = React.useMemo(
    () => getFilteredTodos(todos),
    [todos, getFilteredTodos],
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleTodos = filteredTodos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="todo-list">
      <TodoSearch onSearch={setSearchTerm} />
      <TodoFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <span className="todo-list-title">Things to do:</span>
      {filteredTodos.length ? (
        <>
          <div className="todo-list-content">
            {visibleTodos.map((todoItem) => (
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
          {totalPages > 1 && (
            <TodoPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
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
