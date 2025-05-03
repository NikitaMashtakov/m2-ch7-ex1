import { Todo } from 'components/Todo/Todo';
import PropTypes from 'prop-types';
import styles from './TodoList.module.css';
import { useContext } from 'react';
import { TodoContext } from 'contexts/TodoContext';
export const TodoList = ({ debouncedSearch }) => {
  const { todos } = useContext(TodoContext);
  const todosToShow = todos.filter(({ title }) =>
    title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  return (
    <div className={styles.container}>
      {todosToShow.length !== 0 ? (
        todosToShow.map(({ id, title, completed }) => (
          <Todo key={id} id={id} title={title} completed={completed} />
        ))
      ) : (
        <h2 className={styles.noTodos}>Задач нет</h2>
      )}
    </div>
  );
};

TodoList.propTypes = {
  debouncedSearch: PropTypes.string,
};
