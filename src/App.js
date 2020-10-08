import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import 'react-bootstrap'
import Header from './component/Header'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Header />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
