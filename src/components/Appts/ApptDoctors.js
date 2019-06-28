import React from 'react';
import PropTypes from 'prop-types';
import styles from './ApptDoctors.module.scss';

const ApptDoctors = (props) => {
  let contents = [];

  props.doctors.forEach((item, id) => {
    if (!item.visible) return;
    const itemClassName = [styles.ItemLine];
    if (item.selected) {
      itemClassName.push(styles.Selected);
    }
    contents.push(
      <div key={id}>
        <span
          title={item.details}
          className={itemClassName.join(' ')}
          onClick={(e) => props.selectHandler(e, id)}
        >
          <span>Foto</span>
          <span>{item.fullName}</span>
          <span>{props.specialities.get(item.speciality).title}</span>
        </span>
        <span>{props.children(item.selected)}</span>
      </div>
    );
  });
  return <div className={styles.ApptDoctors}>{contents}</div>;
};

ApptDoctors.propTypes = {
  specialities: PropTypes.instanceOf(Map).isRequired,
  doctors: PropTypes.instanceOf(Map).isRequired,
  selectHandler: PropTypes.func.isRequired,
};

export default ApptDoctors;
