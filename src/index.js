import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './landing.css';
import { daddyFunction } from './form-handler';

window.addEventListener('load', () => {
  const daddyFunctionEl = document.querySelector('.daddyFunction');

  daddyFunctionEl.addEventListener('click', daddyFunction);
});

ReactDOM.render(<App/>, document.getElementById('app'));