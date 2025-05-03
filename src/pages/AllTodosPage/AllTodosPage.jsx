import { TodoList } from 'components/TodoList/TodoList';
import { NewTodoInput } from 'components/NewTodoInput/NewTodoInput';
import { Toolbar } from 'components/Toolbar/Toolbar';
import { useState, useEffect } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Selector } from 'components/Selector/Selector';
import { OPTIONS } from 'constants/sortingOptions';
import useDebouncedValue from 'hooks/useDebouncedValue';
import { getTodos } from 'utils/api';
import { TodoContext } from 'contexts/TodoContext';
import { todoReducer } from 'reducers/todoReducer';

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
    todoReducer(todos, action).then((newTodos) => setTodos(newTodos));
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
