import React from 'react';

import Layout from './HOC/Layout'
import Home from './components/home'
import SignIn from './components/signIn'
import DashBoard from './components/admin/Dashboard'
import {Switch, Route} from 'react-router-dom'

const Routes = ()=> {

  return (
    <Layout>
      <Switch>
        <Route exact path='/sign_in' component={SignIn}/>
        <Route exact path='/dashboard' component={DashBoard}/>
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  );
}

export default Routes;
