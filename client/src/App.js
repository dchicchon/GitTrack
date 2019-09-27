import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Pages
import Login from './Pages/Login';
import Signup from './Pages/Signup'
import AdminHome from './Pages/AdminHome';
import InstructorHome from './Pages/InstructorHome';
import StudentHome from './Pages/StudentHome';

// Components
import Navbar from './Components/Navbar';

// Utils
import API from './Utils/API';

class App extends Component {
  state = {
    // We want to change this state based on User Login Credentials
    user: '',
    userType: '',
    loggedIn: false
  }

  // Component Update or Component on Mount to check for loggedIn?

  componentDidMount() {
    API.getUser()
      .then(res => {
        console.log(res.data)
        this.setState({
          user: res.data.user,
          loggedIn: res.data.loggedIn,
          userType: res.data.type
        })
      })

  }

  logout() {
    API.logout()
      .then(res => {
        window.location = '/'
      })
  }


  render() {

    return (
      <Router>
        <div>


          {/* Render Pages based on Login State */}
          {this.state.loggedIn ?

            <div>
              <Navbar logout={this.logout} />

              <div className='container'>
                {/* Render Pages based on userType */}
                {this.state.userType === 'admin' ?
                  <Route path='/' exact component={AdminHome} />
                  :
                  <div>
                    {this.state.userType === 'instructor' ?
                      < Route path='/' exact component={InstructorHome} />
                      :
                      <Route path='/' exact component={StudentHome} />}

                  </div>

                }

              </div>
            </div>

            :
            <div className='container' style={{ marginTop: '3rem' }}>
              <Route path='/' exact component={Login} />
              <Route path='/signup' exact component={Signup} />

            </div>}
        </div>


      </Router >
    );
  }
}

export default App;
