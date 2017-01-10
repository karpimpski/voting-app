import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Poll from './Poll';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/poll/:name" component={Poll} />
  </Router>
);

export default Routes;