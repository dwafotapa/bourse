import React from 'react';
import PropTypes from 'prop-types';
import styles from './StockCell.css';

const StockCell = (props) => {
  const {
    id,
    prop,
    value,
    handleInputChange,
    handleInputKeyUp,
    handleInputBlur
  } = props;

  return (
    <td>
      <input
        type="text"
        className={styles.StockCell}
        value={value}
        onChange={(e) => handleInputChange(id, prop, e)}
        onKeyUp={(e) => handleInputKeyUp(e)}
        onBlur={() => handleInputBlur(id, prop)}
      />
    </td>
  );
}

StockCell.propTypes = {
  id: PropTypes.number.isRequired,
  prop: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputKeyUp: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func.isRequired
};

export default StockCell;