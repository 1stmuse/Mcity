import React from 'react';

import Layout from './HOC/Layout'
import Home from './components/home'
import {Switch, Route} from 'react-router-dom'

const Routes = ()=> {

  return (
    <Layout>
      <Switch>
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  );
}

export default Routes;
