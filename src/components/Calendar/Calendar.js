import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from 'react-calendar';
import styles from './Calendar.module.scss';

class ReactCalendar extends Component {
  state = {
    date: new Date(),
    locale: 'ru',
  };

  tileDisabled = ({ activeStartDate, date, view }) => {
    const dateString = `${date.getFullYear().toString()} ${(
      date.getMonth() + 1
    ).toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}`;
    const currDateString = `${this.state.date.getFullYear().toString()} ${(
      this.state.date.getMonth() + 1
    ).toString().padStart(2, '0')} ${this.state.date.getDate().toString().padStart(2, '0')}`;
    return dateString < currDateString;
  };

  render() {
    return (
      <Calendar
        value={this.state.date}
        locale={this.state.locale}
        className={[styles.CustomCalendar]}
        maxDetail='month'
        tileDisabled={this.tileDisabled}
      />
    );
  }
}

ReactCalendar.propTypes = {};

export default ReactCalendar;
