import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from './store';
@observer
export default class Home extends Component {
  handleClick = () => {
    store.handleChangeName();
  };

  handleTest = () => {
    store.test();
  };

  handleAdd = () => {
    // store.add();
  };
  render() {
    return (
      <div>
        <div>
          <h2>welcome to home</h2>
          <div>{store.name}</div>
          <button onClick={this.handleClick}>async</button>
          <button onClick={this.handleTest}>test await</button>
          <button onClick={this.handleAdd}>add</button>
        </div>
      </div>
    );
  }
}
