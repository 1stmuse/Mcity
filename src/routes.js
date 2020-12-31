import React from 'react';
import {Switch, Route} from 'react-router-dom'

import PrivateRoute from './components/authRoutes/privateRoute'
import PublicRoute from './components/authRoutes/publicRoute'
import Layout from './HOC/Layout'
import Home from './components/home'
import SignIn from './components/signIn'
import DashBoard from './components/admin/Dashboard'
import AdminMatches from './components/admin/matches'
import AddEditMatch from './components/admin/matches/addEditMatch'


const Routes = (props)=> {

  return (
    <Layout>
      <Switch>
      <PrivateRoute {...props} exact path='/admin_matches/edit_match/:id' component={AddEditMatch} />
        <PrivateRoute {...props} exact path='/admin_matches' component={AdminMatches} />
        <PrivateRoute {...props} exact path='/dashboard' component={DashBoard} />
        {/* <Route exact path='/sign_in' component={SignIn}/> */}
        <PublicRoute {...props} restricted={true}  exact path='/sign_in' component={SignIn} />
        <PublicRoute {...props} restricted={false} exact component={Home} path='/'  />
        {/* <Route exact path='/dashboard' component={DashBoard}/> */}
        {/* <Route exact component={Home} path='/' /> */}
      </Switch>
    </Layout>
  );
}

export default Routes;
