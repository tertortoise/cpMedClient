import React from 'react';
import Button from '../UI/Button';

import styles from './ApptSchDoc.module.scss';

const ApptSchDoc = (props) => {
  return (
    <div className={styles.DoctorContainer}>
      <div className={styles.Doctor}>
        {props.doctor.fullName} is {props.docSpeciality.title}
      </div>
      <div className={styles.DatesContainer}>{props.children()}</div>
      <div>
        <Button
          btnTypes={['Next', 'Bold']}
          btnName={props.btnName}
          disabled={props.btnDisabled}
          clickHandler={props.stageChangeHandler}
        />
      </div>
    </div>
  );
};

export default ApptSchDoc;
