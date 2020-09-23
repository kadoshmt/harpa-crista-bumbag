import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Profile from '../pages/Profile';

import Hymns from '../pages/Hymns';
import HymnsEdit from '../pages/Hymns/Edit';

import Categories from '../pages/Categories';
import CategoriesAdd from '../pages/Categories/Add';
import CategoriesEdit from '../pages/Categories/Edit';

import Authors from '../pages/Authors';
import AuthorsAdd from '../pages/Authors/Add';
import AuthorsEdit from '../pages/Authors/Edit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />

    <Route path="/hinos" component={Hymns} isPrivate exact />
    <Route path="/hinos/editar/:id" component={HymnsEdit} isPrivate />

    <Route path="/categorias" component={Categories} isPrivate exact />
    <Route
      path="/categorias/adicionar"
      component={CategoriesAdd}
      isPrivate
      exact
    />
    <Route path="/categorias/editar/:id" component={CategoriesEdit} isPrivate />

    <Route path="/autores" component={Authors} isPrivate exact />
    <Route path="/autores/adicionar" component={AuthorsAdd} isPrivate exact />
    <Route path="/autores/editar/:id" component={AuthorsEdit} isPrivate />
  </Switch>
);

export default Routes;
