import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Pages
import Login from './Pages/Login';

// Components

class App extends Component {
  state = {
    // email: '',
    // password: ''
  }

  render() {

    return (
      <Router>
        <div style={{ marginTop: '5rem' }}>
          <Route path='/' exact component={Login} />
        </div>
      </Router >
    );
  }
}

export default App;
