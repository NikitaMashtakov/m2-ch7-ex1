import { Header } from 'components/Header/Header';
import styles from './App.module.css';
import AllTodoPage from 'pages/AllTodosPage/AllTodosPage';
function App() {
  return (
    <div className={styles.container}>
      <Header />
      <AllTodoPage />
    </div>
  );
}

export default App;
