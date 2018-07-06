import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RouteContent from './../../routes';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="Home" replace>
            To Home
          </Link>
        </div>
        <div>
          <Link to="Counter" replace>
            To Counter
          </Link>
        </div>
        <content>
          <RouteContent />
        </content>
      </div>
    );
  }
}
