import React, { Component } from 'react';

// Components

// Utils
import API from '../Utils/API';

const AccountModal = (props) => {
    return (

        <div className='container'>
            <h1>Create Account</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input value={props.firstName} name='firstName' onChange={props.handleInputChange} type="text" className="form-control" id="firstName" placeholder="First Name" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input value={props.lastName} name='lastName' onChange={props.handleInputChange} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input value={props.email} name='email' onChange={props.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={props.password} name='password' onChange={props.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" autoComplete="true" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input value={props.passwordConfirm} name='passwordConfirm' onChange={props.handleInputChange} type="password" className="form-control" id="passwordConfirm" placeholder="Password" autoComplete="true" />
                </div>
                <fieldset className="form-group types">
                    <div className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Account Type</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="admin" />
                                <label className="form-check-label" htmlFor="gridRadios1">Administrator</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="instructor" />
                                <label className="form-check-label" htmlFor="gridRadios2">Instructor</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="student" />
                                <label className="form-check-label" htmlFor="gridRadios2">Student</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <button onClick={props.accountCreate} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

// const TableRow = ({ firstName, lastName, email, type }) => {
//     return (
//         <tr>
//             <td>{firstName}</td>
//             <td>{lastName}</td>
//             <td>{email}</td>
//             <td>{type}</td>
//         </tr>
//     )
// }

const ActivityModal = ({ list }) => {
    return (
        <div>
            <h1>Activity</h1>
            <h3>Users</h3>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                    </tr>
                    {list.map((user, i) => (
                        <tr key={i}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>

                        </tr>
                        // <TableRow
                        //     key={i}
                        //     firstName={user}
                        //     lastName={user.lastName}
                        //     email={user.email}
                        //     type={user.type}
                        // />
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}



class AdminHome extends Component {
    state = {

        // Modal Control
        accountModal: false,
        activityModal: false,

        // Account Creation
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',

        // Activity Data
        userList: []

    }

    // State Change Functions
    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }


    // Modal Control
    accountControl = () => {
        if (this.state.accountModal) {
            return (this.setState({ accountModal: false }))
        }
        this.setState({
            activityModal: false,
            accountModal: true
        })

    }

    activityControl = () => {
        if (this.state.activityModal) {
            return (this.setState({ activityModal: false }))
        }

        // Get List of Users on call
        API.userList()
            .then(res => {
                // This should be a list of users in the database
                console.log(res)
                console.log(res.data)

                this.setState({
                    userList: res.data,
                    accountModal: false,
                    activityModal: true
                })

            })

    }

    // Account Creation
    accountCreate = event => {
        event.preventDefault();

        if (this.state.password === this.state.passwordConfirm && this.state.firstName && this.state.lastName && this.state.email) {

            let radioArr = document.getElementsByClassName("form-check-input")
            let typeInput = '';
            for (let i = 0; i < radioArr.length; i++) {
                if (radioArr[i].checked === true) {
                    typeInput = radioArr[i].value
                }
            }

            let newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                type: typeInput
            }

            API.createAccount(newUser)
                .then(res => {
                    console.log("Response")
                    console.log(res)

                    // Return should have info whether the submission went OK
                    this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
                        // accountModal: ''
                    })
                })
        } else {
            console.log("Please Check all Fields")
        }
    }


    render() {
        return (
            <div>
                <h1>Welcome Admin</h1>

                {/* Admin should have ability to create Instuctor and Student Accounts */}
                {/* Admin should be able to check the activity on the site */}
                <div>
                    <button type='button' className='btn btn-primary' onClick={this.accountControl}>Create Account</button>
                    <button type='button' className='btn btn-primary' onClick={this.activityControl}>Site Activity</button>
                </div>
                {this.state.accountModal ?
                    <AccountModal
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        password={this.state.password}
                        passwordConfirm={this.state.passwordConfirm}
                        handleInputChange={this.handleInputChange}
                        accountCreate={this.accountCreate}
                    /> : ''}

                {this.state.activityModal ?
                    <ActivityModal
                        list={this.state.userList}
                    /> : ''}

            </div>
        )
    }
}

export default AdminHome;