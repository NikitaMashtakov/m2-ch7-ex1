import { useContext, useState } from 'react';
import styles from './NewTodoInput.module.css';
import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';
import { TodoContext } from 'contexts/TodoContext';

export const NewTodoInput = ({ buttonName, placeholder }) => {
  const [text, setText] = useState('');

  const { dispatch } = useContext(TodoContext);

  const onButtonClick = () => {
    dispatch({ type: 'ADD_TODO', text });
    setText('');
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={({ target }) => setText(target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && text) {
            onButtonClick();
          }
        }}
      />
      <Button
        onClick={() => {
          if (text) {
            onButtonClick();
          }
        }}
        style={{ border: '1px solid #ccc' }}
      >
        {buttonName}
      </Button>
    </div>
  );
};
NewTodoInput.propTypes = {
  buttonName: PropTypes.string,
  placeholder: PropTypes.string,
  inputHandler: PropTypes.func,
};
