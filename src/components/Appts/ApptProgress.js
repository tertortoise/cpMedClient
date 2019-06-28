import React from 'react';
import PropTypes from 'prop-types';

import styles from './ApptProgress.module.scss';
import Button from '../UI/Button';

const ApptProgress = ({
  stageChangeHandler,
  activeStage: { type, next, prev },
}) => {
  let btnTypes = ['Progress'];
  let btn1Name = '1. ВЫБЕРИТЕ ВРАЧА',
    btn2Name = '2. ВЫБЕРИТЕ ДАТУ И ВРЕМЯ ПРИЕМА',
    btn3Name = '3. ПОДТВЕРДИТЕ ЗАПИСЬ';
  let btn1Selected = true,
    btn2Selected = false,
    btn3Selected = false;
let btn1Disabled = false, btn2Disabled = true, btn3Disabled = true;
if (type === 'specialities' || type === 'doctors') {
  btn1Disabled = true;
  btn2Disabled = !next;
}
  if (type === 'schedule' || type === 'confirm') {
    btn1Selected = false;
    btn1Name = '1. ВЕРНУТЬСЯ К ВЫБОРУ ВРАЧА';
    if (type === 'schedule') {
      btn2Disabled = true;
      btn3Disabled = !next;
      btn2Selected = true;
    }
    if (type === 'confirm' || type === 'confirmed') {
      btn2Disabled = !prev;
      
      btn3Selected = true;
      btn2Name = 'ВЕРНУТЬСЯ К ВЫБОРУ ДАТЫ И ВРЕМЕНИ';
    } 
  }
  return (
    <div className={styles.ApptProgress}>
      <Button
        clickHandler={(e) => stageChangeHandler(e, 'specialities')}
        btnName={btn1Name}
        btnTypes={btnTypes}
        selected={btn1Selected}
        disabled={false}
      />
      <Button
        clickHandler={(e) => stageChangeHandler(e, 'schedule')}
        btnName={btn2Name}
        btnTypes={btnTypes}
        selected={btn2Selected}
        disabled={btn2Disabled}
      />
      <Button
        clickHandler={(e) => stageChangeHandler(e, 'confirm')}
        btnName={btn3Name}
        btnTypes={btnTypes}
        selected={btn3Selected}
        disabled={btn3Disabled}
      />
    </div>
  );
};

ApptProgress.propTypes = {
  activeStage: PropTypes.object.isRequired,
  stageChangeHandler: PropTypes.func.isRequired,
};

export default ApptProgress;
