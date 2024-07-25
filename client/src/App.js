import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DonorPage from './components/DonorPage';
import RecipientPage from './components/RecipientPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/donor" component={DonorPage} />
        <Route path="/recipient" component={RecipientPage} />
      </Switch>
    </Router>
  );
}

export default App;
