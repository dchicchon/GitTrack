import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
// =================

// Not Logged In
import SplashPage from './Pages/SplashPage';
import Login from './Pages/Login';
// import Signup from './Pages/Signup'

// Logged In 
import AdminHome from './Pages/AdminHome';
import InstructorHome from './Pages/InstructorHome';
import StudentHome from './Pages/StudentHome';
import Settings from './Pages/Settings';

// No Page
import NoPage from './Pages/NoPage';

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
        if (res.data.loggedIn) {
          this.setState({
            user: res.data.user,
            loggedIn: res.data.loggedIn,
            userType: res.data.user.userType
          })
        } else {
          this.setState({
            user: res.data.user,
            loggedIn: res.data.loggedIn,
            // userType: res.data.user.userType
          })
        }
      })

  }

  logout() {
    API.logout()
      .then(res => {
        window.location = '/login'
      })
  }


  render() {

    // If the user state login is true, allow them to navigate these pages
    if (this.state.loggedIn === true) {
      return (
        <Router>
          <Navbar user={this.state.user} logout={this.logout} />
          <Switch>
            {this.state.userType === 'administrator' ? <Route path='/' exact component={() => <AdminHome user={this.state.user} />} /> : ''}
            {this.state.userType === 'instructor' ? <Route path='/' exact component={() => <InstructorHome user={this.state.user} />} /> : ''}
            {this.state.userType === 'student' ? <Route path='/' exact component={() => <StudentHome user={this.state.user} />} /> : ''}
            <Route path='/settings' exact component={() => <Settings user={this.state.user} />} />
            <Route component={NoPage} />
          </Switch>
        </Router>
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route path='/' exact component={SplashPage} />
            <Route path='/login' exact component={Login} />

            {/* <Route path='/signup' exact component={Signup} /> */}
            <Route component={NoPage} />

          </Switch>
        </Router>
      )
    }
    // return (
    //   <Router>
    //     <div>


    //       {/* Render Pages based on Login State */}
    //       {this.state.loggedIn ?

    //         <div>
    //           <Navbar
    //             user={this.state.user}
    //             logout={this.logout}
    //           />

    //           <div className='container'>
    //             {/* Render Pages based on userType */}
    //             {this.state.userType === 'administrator' ?
    //               <Route path='/' exact component={AdminHome} />
    //               :
    //               <div>
    //                 {this.state.userType === 'instructor' ?
    //                   < Route path='/' exact component={() => <InstructorHome user={this.state.user} />} />
    //                   :
    //                   <Route path='/' exact component={StudentHome} />}

    //               </div>

    //             }

    //           </div>
    //         </div>

    //         :
    //         <div className='container' style={{ marginTop: '3rem' }}>
    //           <Route path='/' exact component={Login} />
    //           <Route path='/signup' exact component={Signup} />

    //         </div>}
    //     </div>


    //   </Router >
    // );
  }
}

export default App;
