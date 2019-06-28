import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { fetchScheduleGen, fetchAppts, editAppt } from '../../actions/actions';
import arraySortByProp from '../../utils/arraySortByProp';
import styles from './ApptsList.module.scss';
import Search from '../UI/Search';
import Filter from './ApptsListFilter';
import Button from '../UI/Button';
import ApptsListLine from './ApptsListLine';

class ApptsList extends Component {
  state = {
    search: {
      value: '',
      empty: true,
    },
    filterId: 'all',
    filterThresh: moment().format('YYYY-MM-DD'),
  };

  changeFilterHandler = (e, btnId) => {
    console.log(btnId);
    if (btnId === this.state.filterId) return;
    this.changeSearchHandler('');
    this.setState((prevState) => {
      if (prevState.filterId === btnId) return null;
      return {
        filterId: btnId,
      };
    });
  };

  changeSearchHandler = (refined) => {
    const search = { ...this.state.search };
    search.value = refined;
    search.empty = !Boolean(refined.length);

    this.setState((prevState) => {
      if (prevState.search.value === search.value) return null;
      return {
        search,
      };
    });
  };

  editApptHandler = (e, apptId) => {
    /** (1) updating redux state for edit appt
     * (2) navigating to apptEditor
     */
    const appt = this.props.appts.find((item) => item.apptId === apptId);
    const apptEdited = {
      doctorId: appt.doctorId,
      apptId: apptId,
      docDateTime: appt.docDateTime,
      initialStage: 'schedule',
    };
    this.props.editAppt(apptEdited);
    this.props.history.push('/apptEditor');
  };

  deleteApptHandler = (apptId) => {

    let apptToDeleteIndex;
    const apptToDelete = this.props.appts.find((item, index) => {
      if (item.apptId === apptId) {
        apptToDeleteIndex = index;
        return true;
      }
    });
    const appts = [
      ...this.props.appts.slice(0, apptToDeleteIndex),
      ...this.props.appts.slice(apptToDeleteIndex + 1),
    ];

    const scheduleGen = [...this.props.scheduleGen];

    this.props.scheduleGen.forEach((item, index) => {
      if (item.docDateTime === apptToDelete.docDateTime) {
        const newSchGenItem = { ...item, available: true };
        scheduleGen[index] = newSchGenItem;
      }
    });
    this.props.fetchAppts(arraySortByProp(appts, 'dateTime', 'desc'));
    this.props.fetchScheduleGen(scheduleGen);
    return apptToDelete;
  };

  render() {
    let searchDisabled = false,
      contents,
      filteredList;

    if (this.props.appts.length === 0) {
      searchDisabled = true;
      contents = 'Записи отстутствуют';
    } else {
      filteredList = this.props.appts.filter((item) => {
        let result = true;
        if (this.state.filterId === 'all') result = true && result;
        if (this.state.filterId === 'active')
          result = item.dateTime > this.state.filterThresh && result;
        if (this.state.filterId === 'past')
          result = item.dateTime < this.state.filterThresh && result;
        if (this.state.search.value !== '')
          result =
            item.searchString.includes(this.state.search.value.toLowerCase()) &&
            result;
        return result;
      });
      if (filteredList.length === 0) {
        contents = 'Записи с заданными условиями отсутствуют';
      } else {
        contents = filteredList.map((item) => {
          return (
            <ApptsListLine
              key={item.docDateTime}
              appt={item}
              showButtons={true}
              deleteApptHandler={this.deleteApptHandler}
              editApptHandler={this.editApptHandler}
              apptStatus={
                item.dateTime > this.state.filterThresh ? 'Active' : 'Past'
              }
            />
          );
        });
      }
    }

    return (
      <div className='ApptsList'>
        <Filter
          renderButtons={(btnId, btnName) => (
            <Button
              key={btnId}
              btnName={btnName}
              selected={btnId === this.state.filterId}
              btnTypes={['Switch']}
              clickHandler={(e) => this.changeFilterHandler(e, btnId)}
            />
          )}
          filterId={this.state.filterId}
        />
        <Search
          value={this.state.search.value}
          empty={this.state.search.empty}
          disabled={searchDisabled}
          label='Для поиска вводите буквы русского алфавита'
          placeholder='Поиск по ФИО и специальности врача'
          changeSearchHandler={this.changeSearchHandler}
        />
        <div>{contents}</div>
      </div>
    );
  }
}

ApptsList.propTypes = {
  appts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    appts: state.appts || [],
    scheduleGen: state.scheduleGen,
  };
};

const mapDispatchToProps = {
  fetchScheduleGen,
  fetchAppts,
  editAppt,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApptsList);
