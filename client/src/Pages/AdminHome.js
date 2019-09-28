import React, { Component } from 'react';

// Components
import Message from '../Components/Message';

// Utils
import API from '../Utils/API';

// const Message = ({ message, color }) => {
//     const divStyle = color === 'green' ? 'text-success' : 'text-danger'
//     return (
//         <div>
//             <p className={divStyle}> {message}</p>
//         </div>
//     )
// }

// Modal to create users
const AccountModal = (props) => {
    return (

        <div className='container'>
            <h1>Create Account</h1>
            <Message
                message={props.message}
                color={props.color}
            />
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

// Modal to see user activity
const ActivityModal = ({ color, message, list, handleDelete }) => {
    return (
        <div>
            <h1>Activity</h1>
            <h3>Users</h3>
            <hr />
            <Message
                message={message}
                color={color}
            />
            <table>
                <tbody>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Delete</th>
                    </tr>
                    {list.map((user, i) => (
                        <tr key={i}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>
                            <td><button type='button' className='btn btn-danger' onClick={() => handleDelete(user.id)}>x</button></td>

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

        // Return Message
        message: '',
        color: '',

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


    // Account Modal Control
    accountControl = () => {
        if (this.state.accountModal) {
            return (this.setState({
                accountModal: false,
                message: '',
                color: ''
            }))
        }
        this.setState({
            activityModal: false,
            accountModal: true,
            message: '',
            color: ''
        })

    }

    // Activity Modal Control
    activityControl = () => {
        if (this.state.activityModal) {
            return (this.setState({
                activityModal: false,
                message: '',
                color: ''
            }))
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
                    activityModal: true,
                    message: '',
                    color: ''
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

            console.log(newUser)

            API.createAccount(newUser)
                .then(res => {
                    console.log(res.data)
                    console.log(res.data.color)

                    // Return should have info whether the submission went OK
                    this.setState({
                        message: res.data.message,
                        color: res.data.color,
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

    // Admin can remove users from database
    handleDelete = id => {
        API.deleteUser(id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    message: res.data.message,
                    color: res.data.color
                })
                API.userList()
                    .then(res => {
                        this.setState({
                            userList: res.data,
                        })
                    })
            })
    }


    render() {
        return (
            <div>
                <h1>Welcome Admin</h1>

                <div>
                    <button type='button' className='btn btn-primary' onClick={this.accountControl}>Create Account</button>
                    <button type='button' className='btn btn-primary' onClick={this.activityControl}>Site Activity</button>
                </div>

                {/* Rendered if true */}
                {this.state.accountModal ?
                    <AccountModal
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        password={this.state.password}
                        passwordConfirm={this.state.passwordConfirm}
                        handleInputChange={this.handleInputChange}
                        accountCreate={this.accountCreate}
                        message={this.state.message}
                        color={this.state.color}
                    /> : ''}

                {/* Rendered if true */}
                {this.state.activityModal ?
                    <ActivityModal
                        list={this.state.userList}
                        handleDelete={this.handleDelete}
                        message={this.state.message}
                        color={this.state.color}

                    /> : ''}

            </div>
        )
    }
}

export default AdminHome;