import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';
import { useEffect, useState, useRef, useContext } from 'react';
import { MdOutlineEdit, MdOutlineDelete, MdDone, MdClose } from 'react-icons/md';
import styles from './Todo.module.css';
import { TodoContext } from 'contexts/TodoContext';

export const Todo = ({ id, title, completed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const editInputRef = useRef(null);
  const { dispatch } = useContext(TodoContext);
  const startEditTodo = () => {
    setIsEditing(true);
    setText(title);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const confirmEditTodo = (id, text) => {
    dispatch({ type: 'EDIT_TODO', id, text });
    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) editInputRef.current.focus();
  }, [isEditing]);

  return (
    <div className={styles.container}>
      <div className={styles.todo}>
        <input
          className={`${completed ? styles.checked : ''}`}
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => dispatch({ type: 'COMPLETE_TODO', id, completed })}
        />
        {isEditing ? (
          <textarea
            ref={editInputRef}
            className={styles.editTodo}
            type="text"
            name="edit-todo"
            value={text}
            onChange={({ target }) => {
              setText(target.value);
            }}
            onBlur={() => editInputRef.current.focus()}
          />
        ) : (
          <label
            className={`${
              completed ? styles.checkedLabel + ' ' + styles.todoLabel : styles.todoLabel
            }`}
          >
            {title}
          </label>
        )}
      </div>
      <div className={styles.buttons}>
        {isEditing ? (
          <Button title={'Подтвердить'} onClick={() => confirmEditTodo(id, text)}>
            <MdDone size="20" fill="#00c700" />
          </Button>
        ) : (
          <Button title={'Редактировать'} onClick={startEditTodo}>
            <MdOutlineEdit size="20" fill="#6a75fd" />
          </Button>
        )}

        {isEditing ? (
          <Button title={'Отмена'} onClick={cancelEdit}>
            <MdClose size="20" fill="#ff4e4e" />
          </Button>
        ) : (
          <Button title={'Удалить'} onClick={() => dispatch({ type: 'DELETE_TODO', id })}>
            <MdOutlineDelete size="20" fill="#ff4e4e" />
          </Button>
        )}
      </div>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  onCompleteTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func,
};
