const baseUrl = 'http://localhost:3000/todos';

export const getTodos = (selectedSort) => {
  return fetch(`${baseUrl}?${selectedSort}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getTodoById = (id) => {
  return fetch(`${baseUrl}/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const completeTodo = (id, completed) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      completed: !completed,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const addTodo = (text) => {
  return fetch(`${baseUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      title: text,
      completed: false,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteTodo = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).catch((error) => console.log(error));
};

export const editTodo = (id, text) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      title: text,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
