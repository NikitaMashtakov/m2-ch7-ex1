import { TodoList } from 'components/TodoList/TodoList';
import { NewTodoInput } from 'components/NewTodoInput/NewTodoInput';
import { Toolbar } from 'components/Toolbar/Toolbar';
import { useState, useEffect } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Selector } from 'components/Selector/Selector';
import { OPTIONS } from 'constants/sortingOptions';
import useDebouncedValue from 'hooks/useDebouncedValue';
import { getTodos, completeTodo, addTodo, deleteTodo, editTodo } from 'utils/api';
import { TodoContext } from 'context/TodoContext';

const AllTodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSort, setSelectedSort] = useState('_sort=id&_order=desc');
  const debouncedSearch = useDebouncedValue(search, 250);

  useEffect(() => {
    getTodos(selectedSort).then((loadedTodos) => setTodos(loadedTodos));
  }, [selectedSort]);

  const searchHandler = (value) => {
    setSearch(value);
  };
  const selectorHandler = (value) => {
    setSelectedSort(value);
  };

  const dispatch = (action) => {
    const { type, ...payload } = action;
    switch (type) {
      case 'ADD_TODO':
        addTodo(payload.text)
          .then((newTodo) => {
            setTodos((prev) => [newTodo, ...prev]);
          })
          .catch((err) => console.log(err));
        break;
      case 'COMPLETE_TODO':
        completeTodo(payload.id, payload.completed)
          .then((updatedTodo) =>
            setTodos((prev) =>
              prev.map((todo) => (todo.id === payload.id ? updatedTodo : todo)),
            ),
          )
          .catch((err) => console.log(err));
        break;
      case 'EDIT_TODO':
        editTodo(payload.id, payload.text).then((updatedTodo) => {
          setTodos((prev) =>
            prev.map((todo) => (todo.id === payload.id ? updatedTodo : todo)),
          );
        });
        break;
      case 'DELETE_TODO':
        deleteTodo(payload.id)
          .then(setTodos((prev) => prev.filter((todo) => todo.id !== payload.id)))
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Toolbar>
        <SearchBar search={search} searchHandler={searchHandler} />
        <Selector
          label={'Сортировка'}
          selectorId={'sortingSelector'}
          options={OPTIONS}
          setSelected={selectorHandler}
        />
      </Toolbar>

      <TodoContext value={{ todos, dispatch }}>
        <NewTodoInput placeholder="Новая задача..." buttonName="Добавить" />

        <TodoList debouncedSearch={debouncedSearch} />
      </TodoContext>
    </>
  );
};

export default AllTodoPage;
