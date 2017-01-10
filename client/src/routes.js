import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Second from './Second';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/second" component={Second} />
  </Router>
);

export default Routes;