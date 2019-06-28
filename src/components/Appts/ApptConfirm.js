import React from 'react';
import PropTypes from 'prop-types';

import styles from './ApptConfirm.module.scss';

const ApptConfirm = (props) => {
  let contents, btnName;
  if (props.activeStage.type === 'confirm') {
    btnName = 'ПОДТВЕРДИТЬ';
    contents = (<div>
    Ваша запись: {props.docDateTime}
  </div>)
  } else {
    btnName = 'ДОБАВИТЬ НОВУЮ ЗАПИСЬ';
    contents = (<div>
      Талон № {props.newAppt.apptId} , запись к {props.newAppt.docFullName} на {props.newAppt.docDateTime}
    </div>)
  }


  return <div>
    <div>{contents}</div>
    <div>{props.children(btnName)}</div>
  </div>
  
};

ApptConfirm.propTypes = {
  activeStage: PropTypes.object.isRequired,
  doctorId: PropTypes.arrayOf(PropTypes.string),
  docDateTime: PropTypes.string,
  doctors: PropTypes.instanceOf(Map),
  schedule: PropTypes.instanceOf(Map),
  specialities: PropTypes.instanceOf(Map),
  apptId: PropTypes.string,
  newAppt: PropTypes.object,
};

export default ApptConfirm;
