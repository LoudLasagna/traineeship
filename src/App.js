/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import React from 'react';
import { useSelector, connect } from 'react-redux';

import Home from './components/pages/home';
import Profile from './components/pages/profile'

function App() {
  const data = useSelector((state) => state.cartReducer.data)
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

export default connect()(App);
