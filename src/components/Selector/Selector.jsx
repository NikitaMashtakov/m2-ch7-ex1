import PropTypes from 'prop-types';
import styles from './Selector.module.css';
import Select from 'react-select';

export const Selector = ({ selectorId, options, setSelected }) => {
  return (
    <div className={styles.container}>
      <Select
        styles={{ height: '38px' }}
        name={selectorId}
        options={options}
        defaultValue={options[0]}
        onChange={({ value }) => {
          setSelected(value);
        }}
      />
    </div>
  );
};

Selector.propTypes = {
  selectorId: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  setSelected: PropTypes.func,
};
