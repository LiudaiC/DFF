import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import MainLayout from './routes/MainLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={MainLayout}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
