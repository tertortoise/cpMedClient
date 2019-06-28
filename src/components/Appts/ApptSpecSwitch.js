import React from 'react';
import PropTypes from 'prop-types';

import styles from './ApptSpecSwitch.module.scss';
import Button from '../UI/Button';

const ApptSpecSwitch = (props) => {
  let selectedSpecialities = false;
  let selectedDoctors = false;
  if (props.alt === 'specialities') {
    selectedSpecialities = true;
  } else if (props.alt === 'doctors') {
    selectedDoctors = true;
  }

  return (
    <div className={styles.ApptSpecSwitch}>
      <Button
        btnName='Выберите врача по специальности'
        selected={selectedSpecialities}
        btnTypes={['Switch']}
        clickHandler={(e) => props.switchHandler(e, 'specialities')}
      />
      <Button
        btnName='Выберите врача по Ф.И.О.'
        selected={selectedDoctors}
        btnTypes={['Switch']}
        clickHandler={(e) => props.switchHandler(e, 'doctors')}
      />
    </div>
  );
};

ApptSpecSwitch.propTypes = {
  switchHandler: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ApptSpecSwitch;
