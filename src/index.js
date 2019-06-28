import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import ErrorBoundary from './error/ErrorBoundary';
import store from './store';

//const fetchDoctorsService = new DoctorsService();
const value = null; // service for fetching data

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
