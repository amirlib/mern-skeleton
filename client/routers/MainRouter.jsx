import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Menu from '../components/Menu/Menu';
import EditProfilePage from '../components/Profile/EditProfilePage';
import ProfilePage from '../components/Profile/ProfilePage';
import Signup from '../components/Signup/Signup';
import UsersPage from '../components/Users/UsersPage';

const MainRouter = () => (
  <>
    <Menu />

    <Switch>
      <Route
        Component={Home}
        exact
        path="/"
      />

      <Route
        Component={UsersPage}
        path="/users"
        requireLogin
        redirectPath="/login"
      />

      <Route
        Component={Signup}
        path="/signup"
      />

      <Route
        Component={Login}
        path="/login"
      />

      <Route
        Component={EditProfilePage}
        path="/user/edit/:userId"
        requireLogin
        redirectPath="/login"
      />

      <Route
        Component={ProfilePage}
        path="/user/:userId"
        requireLogin
        redirectPath="/login"
      />
    </Switch>
  </>
);

export default MainRouter;
