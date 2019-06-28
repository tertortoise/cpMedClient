import React from 'react';
import PropTypes from 'prop-types';

import styles from './ApptSpecialities.module.scss';

const ApptSpecialities = (props) => {
  /** building contents from Map */
  let Contents = {};
  Contents.adult = [];
  Contents.child = [];
  props.specialities.forEach((spec, id) => {
    if (!spec.visible) return;
    const spanClassName = [styles.Span];
    if (spec.selected) {
      spanClassName.push(styles.Selected);
    }
    Contents[spec.ageCategory].push(
      <div key={id}>
        <span
        className={spanClassName.join(' ')}
        
        id={id}
        title={spec.details}
        onClick={(e) => props.selectHandler(e, id)}
      >{spec.title}
       </span>
       <span>{props.children(spec.selected)}</span>
      </div>
      
        
        
     
    );
  });

  return (
    <div className={styles.ApptSpecialities}>
      <div className={styles.Department}>
        <h2>Специальности взрослого отделения</h2>
        <div className={styles.Contents}>{Contents.adult}</div>
      </div>
      <div className={styles.Department}>
        <h2>Специальности детского отделения</h2>
        <div className={styles.Contents}>{Contents.child}</div>
      </div>
    </div>
  );
};

ApptSpecialities.propTypes = {
  specialities: PropTypes.instanceOf(Map).isRequired,
  selectHandler: PropTypes.func.isRequired,
};

export default ApptSpecialities;
