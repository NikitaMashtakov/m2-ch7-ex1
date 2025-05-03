import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

export const SearchBar = ({ search, searchHandler }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name="search"
        value={search}
        placeholder="Поиск..."
        onChange={({ target }) => searchHandler(target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  search: PropTypes.string,
  searchHandler: PropTypes.func,
};
