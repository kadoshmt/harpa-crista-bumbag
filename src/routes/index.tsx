import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Profile from '../pages/Profile';

import Hinos from '../pages/Hinos';
import HinosEditar from '../pages/Hinos/Editar';

import Categories from '../pages/Categories';
import CategoriesAdd from '../pages/Categories/Add';
import CategoriesEdit from '../pages/Categories/Edit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />

    <Route path="/hinos" component={Hinos} isPrivate exact />
    <Route path="/hinos/editar/:id" component={HinosEditar} isPrivate />

    <Route path="/categorias" component={Categories} isPrivate exact />
    <Route
      path="/categorias/adicionar"
      component={CategoriesAdd}
      isPrivate
      exact
    />
    <Route path="/categorias/editar/:id" component={CategoriesEdit} isPrivate />
  </Switch>
);

export default Routes;
