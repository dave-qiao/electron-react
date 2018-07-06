import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootApp from './app';

render(
  <AppContainer>
    <RootApp />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextRoot = require('./app'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
