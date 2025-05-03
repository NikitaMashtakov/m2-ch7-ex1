import styles from './Toolbar.module.css';
import PropTypes from 'prop-types';

export const Toolbar = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

Toolbar.propTypes = {
  children: PropTypes.node,
};
