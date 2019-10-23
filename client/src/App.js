import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
// =================

// Not Logged In
import SplashPage from './Pages/SplashPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import CohortSignup from './Pages/CohortSignup';

// Logged In 
import AdminHome from './Pages/AdminHome';
import InstructorHome from './Pages/InstructorHome';
import StudentHome from './Pages/StudentHome';
import Settings from './Pages/Settings';

import StudentProfile from './Components/StudentProfile';

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
        window.location.href = '/'
        // window.location.reload();
      })
  }


  render() {

    // If the user state login is true, allow them to navigate these pages
    if (this.state.loggedIn === true) {
      return (
        <Router history={hashHistory}>
          <Navbar user={this.state.user} logout={this.logout} />
          <Switch>
            {this.state.userType === 'administrator' ? <Route path='/' exact component={() => <AdminHome user={this.state.user} />} /> : ''}
            {this.state.userType === 'instructor' ? <Route path='/' exact component={() => <InstructorHome user={this.state.user} />} /> : ''}

            {/* Path for student profile based on it */}
            <Route exact path='/student/:id' exact component={StudentProfile} />

            {this.state.userType === 'student' ? <Route path='/' exact component={() => <StudentHome user={this.state.user} />} /> : ''}
            <Route exact path='/settings' exact component={() => <Settings user={this.state.user} />} />
            <Route component={NoPage} />
          </Switch>
        </Router>
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path='/' exact component={SplashPage} />
            <Route exact path='/login' exact component={Login} />
            <Route exact path='/signup' exact component={Signup} />

            {/* Go to signup based on cohortID */}
            <Route exact path='/signup/:id' exact component={CohortSignup} />

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
