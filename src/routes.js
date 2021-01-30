import React from 'react';
import {Switch} from 'react-router-dom'

import PrivateRoute from './components/authRoutes/privateRoute'
import PublicRoute from './components/authRoutes/publicRoute'
import Layout from './HOC/Layout'
import Home from './components/home'
import SignIn from './components/signIn'
import DashBoard from './components/admin/Dashboard'
import AdminMatches from './components/admin/matches'
import AddEditMatch from './components/admin/matches/addEditMatch'
import AdminPlayers from './components/admin/players/index'
import AddEditPlayers from './components/admin/players/AddEditPlayers'
import TheTeam from './components/theTeam/index'
import TheMatches from './components/theMatches/index'
import NotFound from './components/ui/NotFound'


const Routes = (props)=> {

  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact path='/admin_players/add_players' component={AddEditPlayers} />
        <PrivateRoute {...props} exact path='/admin_players/add_players/:id' component={AddEditPlayers} />
        <PrivateRoute {...props} exact path='/admin_players' component={AdminPlayers} />
        <PrivateRoute {...props} exact path='/admin_matches/edit_match' component={AddEditMatch} />
        <PrivateRoute {...props} exact path='/admin_matches/edit_match/:id' component={AddEditMatch} />
        <PrivateRoute {...props} exact path='/admin_matches' component={AdminMatches} />
        <PrivateRoute {...props} exact path='/dashboard' component={DashBoard} />
        {/* <Route exact path='/sign_in' component={SignIn}/> */}
        <PublicRoute {...props} restricted={true}  exact path='/sign_in' component={SignIn} />
        <PublicRoute {...props} restricted={false} exact component={TheMatches} path='/the_matches'/>
        <PublicRoute {...props} restricted={false} exact component={TheTeam} path='/the_team'/>
        <PublicRoute {...props} restricted={false} exact component={Home} path='/'/>
        <PublicRoute {...props} restricted={false} component={NotFound}  />
      </Switch>
    </Layout>
  );
}

export default Routes;
