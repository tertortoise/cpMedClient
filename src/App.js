import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAppts, fetchScheduleGen } from './actions/actions';
import dataApptsProc from './data/dataAppts';
import dataScheduleProc from './data/dataScheduleProc';
import arraySortByProp from './utils/arraySortByProp';
import styles from './App.module.scss';
import Dash from './components/Dash/Dash';
import ApptEditor from './components/Appts/ApptEditor';
import ApptsList from './components/ApptsList/ApptsList';
import Personal from './components/Personal/Personal';
 
class App extends Component {

  componentDidMount() {
    this.props.fetchAppts(arraySortByProp(dataApptsProc, 'dateTime', 'desc'));
    this.props.fetchScheduleGen(dataScheduleProc);
  }

  render() { 
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <nav>
            <ul>
              <li>
                <NavLink activeStyle={{ textDecoration: 'underline' }} to='/' exact>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ textDecoration: 'underline' }} to='/apptEditor' exact>
                  Новая запись
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ textDecoration: 'underline' }} to='/apptsList' exact>
                   Мои записи
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ textDecoration: 'underline' }} to='/personal' exact>
                   Личные данные
                </NavLink>
              </li>
             
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route
              path='/'
              exact
              render={(props) => (
                <Dash
                  {...props}
                 
                />
              )}
            />
            <Route path='/apptEditor' render={(props) => (
                <ApptEditor
                  {...props}
                />
              )} />
            <Route path='/apptsList' render={(props) => (
                <ApptsList
                  {...props}
                />
              )} />
              <Route path='/personal' render={(props) => (
                <Personal
                  {...props}
                />
              )} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAppts,
  fetchScheduleGen,
};

export default connect(
  undefined,
  mapDispatchToProps
)(App);

