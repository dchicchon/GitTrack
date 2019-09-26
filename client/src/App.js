import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Pages
import Login from './Pages/Login';
import Home from './Pages/Home';

class App extends Component {
  state = {
    // We want to change this state based on User Login Credentials
    loggedIn: false
  }

  // Component Update or Component on Mount to check for loggedIn?

  render() {

    return (
      <Router>
        <div className='container' style={{ marginTop: '5rem' }}>

          {/* Render Pages based on Login State */}
          {this.state.loggedIn ?

            <div>
              <Route path='/' exact component={Home} />
            </div>

            :
            <div>
              <Route path='/' exact component={Login} />
            </div>}
        </div>


      </Router >
    );
  }
}

export default App;
