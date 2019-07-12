import React from 'react';
import PropTypes from 'prop-types';

import docImage from '../../images/docMale.jpg';
import styles from './ApptDoctors.module.scss';
import SelectableSpan from '../UI/SelectableSpan';

const ApptDoctors = (props) => {
  let contents = [];

  props.doctors.forEach((item, id) => {
    if (!item.visible) return;

    contents.push(
      <div className={styles.Paper} key={id}>
        <div className={styles.FotoCont}>
          <img width={100} src={docImage} />
        </div>
        <div className={styles.DetailsCont}>
          <div className={styles.FullName}>
            <SelectableSpan
              classNames={styles.FullName}
              selected={item.selected}
              clickHandler={(e) => props.selectHandler(e, id)}
            >
              {item.fullName}
            </SelectableSpan>
            <span>{props.children(item.selected)}</span>
          </div>

          <div className={styles.Speciality}>
            {props.specialities.get(item.speciality).title}
          </div>
          <div className={styles.Price}>
            Стоимость приема 2000 руб.
          </div>
        </div>
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
