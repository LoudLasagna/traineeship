/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

import Home from './components/pages/home';
import Profile from './components/pages/profile'
import Checkout from './components/pages/checkout';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </Router>
    </>
  );
}

export default connect()(App);
