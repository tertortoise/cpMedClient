import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

const Input = (props) => {
  let inputElement = null;
  const inputMessage =
    !props.readOnly && props.inputMessage ? (
      <span>{props.inputMessage}</span>
    ) : null;
  const inputClasses = [styles.Input];

  if (!props.readOnly) inputClasses.push(styles.Editable);
  if (props.touched) inputClasses.push(styles.Touched);
  if (!props.valid) inputClasses.push(styles.Invalid);

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <label>
          <span className={styles.LabelSpan}>{props.label}</span>
          <span className={styles.InputSpan}>
            <input
              type={props.elementConfig.type}
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
              onBlur={props.blurred}
              readOnly={props.readOnly}
            />
            {inputMessage}
          </span>
        </label>
      );
      break;
    case 'textarea':
      break;

    case 'select':
      break;

    default:
      inputElement = (
        <label>
          <input {...props.elementConfig} value={props.value} />
        </label>
      );
  }

  return <div className={inputClasses.join(' ')}>{inputElement}</div>;
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  changed: PropTypes.func,
  message: PropTypes.string,
};

export default Input;
