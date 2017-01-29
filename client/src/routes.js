import React from 'react';
import { Router, Route } from 'react-router';

import Index from './Index';
import Poll from './Poll';
import NewPoll from './NewPoll';
import NotFound from './NotFound';
import Register from './Register';
import LogIn from './LogIn';
import Profile from './Profile';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Index} />
    <Route path="/poll/:name" component={Poll} />
    <Route path='/newpoll' component={NewPoll} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={LogIn} />
    <Route path='/profile' component={Profile} />
    <Route path='*' component={NotFound} />
  </Router>
);

export default Routes;