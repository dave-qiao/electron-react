import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './route/Home';
import CounterPage from './route/Counter';

export default class RootApp extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Home" component={HomePage} />
        <Route path="/Counter" component={CounterPage} />
      </Switch>
    );
  }
}
