import React from 'react';
import PropTypes from 'prop-types';
import styles from './StockCell.css';

const StockCell = (props) => (
  <td>
    <input
      type="text"
      className={styles.StockCell}
      value={props.value}
      onFocus={() => props.handleInputFocus()}
      onChange={(e) => props.handleInputChange(props.id, props.marketProp, e)}
      onKeyUp={(e) => props.handleInputKeyUp(e)}
      onBlur={() => props.handleInputBlur(props.id, props.marketProp)}
    />
  </td>
);

StockCell.propTypes = {
  id: PropTypes.number.isRequired,
  marketProp: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInputFocus: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputKeyUp: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func.isRequired
};

export default StockCell;