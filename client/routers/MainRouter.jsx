import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Menu from '../components/Menu/Menu';
import EditProfilePage from '../components/Profile/EditProfilePage';
import ProfilePage from '../components/Profile/ProfilePage';
import Signup from '../components/Signup/Signup';
import UsersPage from '../components/Users/UsersPage';

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route
        component={Home}
        exact
        path="/"
      />
      <Route
        component={UsersPage}
        path="/users"
      />
      <Route
        component={Signup}
        path="/signup"
      />
      <Route
        component={Login}
        path="/login"
      />
      <PrivateRoute
        component={EditProfilePage}
        path="/user/edit/:userId"
      />
      <Route
        component={ProfilePage}
        path="/user/:userId"
      />
    </Switch>
  </div>
);

export default MainRouter;
