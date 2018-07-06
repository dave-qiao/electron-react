import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import Layout from './component/Layout';

const history = createHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Layout />
        </div>
      </Router>
    );
  }
}
