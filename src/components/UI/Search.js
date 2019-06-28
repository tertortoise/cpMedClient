import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search.module.scss';

/** Making effect onFocus - change placeholder for label */

const Search = props => {
  let spanClassName = null;
  if (props.empty === true) {
    spanClassName = styles.Empty;
  }

  const searchPreProcessor = (e) => {
    /** preprocessing searchstring to match cyrillic letters with whitespaces only */
    const regexp = /[\u0430-\u044f\s]+/gi;
    console.log(e.target.value);
    const interim = e.target.value.match(regexp);
    console.log(interim);
    let refined = '';
    if (interim && interim[0] !== ' ') {
      refined = interim.join('').replace(/\s{2,}/g, ' ');
    }

    props.changeSearchHandler(refined);
  }

  return (
    <label className={styles.Search}>
      <input type="text" placeholder={props.label} onChange={(e) => searchPreProcessor(e)} disabled={props.disabled} value={props.value}/>
      <span className={spanClassName}>{props.label}</span>
    </label>
  );
};


Search.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  changeSearchHandler: PropTypes.func.isRequired,
  empty: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default Search;