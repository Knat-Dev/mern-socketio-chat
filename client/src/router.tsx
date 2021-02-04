import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dashboard, Home, Login, Register } from './pages';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};
