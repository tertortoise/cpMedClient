import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import styles from './Dash.module.scss';
import ApptsListLine from '../ApptsList/ApptsListLine';
import PersonalData from '../Personal/PersonalData';
import ReactCalendar from '../Calendar/Calendar';

class Dash extends Component {
  state = {
    filterThresh: moment().format('YYYY-MM-DD'),
  };

  clickHandler = (e, path) => {
    this.props.history.push(path);
  }


  render() {
    console.log(this.props);
    /** active appointments */
    let apptsContents, apptsList;
    if (!this.props.appts || this.props.appts.length === 0) {
      apptsContents = 'Запланированные записи отстутствуют';
    } else {
      apptsList = this.props.appts.filter((item) => {
        return item.dateTime > this.state.filterThresh;
      });
      if (apptsList.length === 0) {
        apptsContents = 'Запланированные записи отстутствуют';
      } else {
        apptsContents = apptsList.map((item) => {
          return (
            <ApptsListLine
              key={item.docDateTime}
              appt={item}
              showButtons={false}
              apptStatus={
                item.dateTime > this.state.filterThresh ? 'Active' : 'Past'
              }
            />
          );
        });
      }
    }
    /** personal data */
    let personalContents = [];
    for (const prop in this.props.personalData) {
      personalContents.push(

      )
    }

    return (
      <main className={styles.Dash}>
        <div onClick={(e) => this.clickHandler(e, '/apptsList')} className={styles.Section}>
          <h2>Запланированные записи</h2>
          {apptsContents}
        </div>
        <div onClick={(e) => this.clickHandler(e, '/personal')} className={styles.Section}>
        <h2>Личные данные</h2>
        <PersonalData renderButtons={false} dataInputsReadOnly={true} />
        </div>
        <div className={styles.Calendar}>
          <ReactCalendar />
        </div>
      </main>
    );
  }
}

Dash.propTypes = {};

const mapStateToProps = (state) => {
  return {
    appts: state.appts,
    personalData: state.personalData,
  };
};

export default connect(mapStateToProps)(Dash);
