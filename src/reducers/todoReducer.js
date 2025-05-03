import { completeTodo, addTodo, deleteTodo, editTodo } from 'utils/api';

export const todoReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case 'ADD_TODO':
      return addTodo(payload.text)
        .then((newTodo) => [newTodo, ...state])
        .catch((err) => console.log(err));
    case 'COMPLETE_TODO':
      return completeTodo(payload.id, payload.completed)
        .then((updatedTodo) =>
          state.map((todo) => (todo.id === payload.id ? updatedTodo : todo)),
        )
        .catch((err) => console.log(err));
    case 'EDIT_TODO':
      return editTodo(payload.id, payload.text).then((updatedTodo) =>
        state.map((todo) => (todo.id === payload.id ? updatedTodo : todo)),
      );
    case 'DELETE_TODO':
      return deleteTodo(payload.id)
        .then(() => state.filter((todo) => todo.id !== payload.id))
        .catch((err) => console.log(err));
    default:
      break;
  }
};
