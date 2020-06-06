import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import listPoints from './pages/ListPoints';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/create-point" component={CreatePoint} />
      <Route path="/list-points/:uf/:city" component={listPoints} />
    </BrowserRouter>
  )
}

export default Routes;