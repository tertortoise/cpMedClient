import React from 'react';
import PropTypes from 'prop-types';

import styles from './ApptSchDoc.module.scss';

const ApptSchDate = (props) => {
  
  return (
    <div className={styles.DateLine}>
      <div className={styles.Date}>{props.date}</div>
      <div className={styles.Time}>
        {props.timeSlots.map((timeSlot) => {
          const timeSlotClassName = [styles.TimeSlot];
          if (timeSlot.selected) timeSlotClassName.push(styles.Selected);
          return (
            <span
              className={timeSlotClassName.join(' ')}
              key={timeSlot.docDateTime}
              onClick={(e) => props.selectHandler(e, timeSlot.docDateTime)}
            >
              {timeSlot.time}
            </span>
          );
        })}
      </div>
    </div>
  );
};

ApptSchDate.propTypes = {};

export default ApptSchDate;
