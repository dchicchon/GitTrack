import React, { Component } from 'react';

// Components
// import Message from '../Components/Message';
import AccountModal from '../Components/AccountModal';
import ActivityModal from '../Components/ActivityModal';
// import AdminList from '../Components/AdminList';
// import InstructorList from '../Components/InstructorList';
// import StudentList from '../Components/StudentList';

// Utils
import API from '../Utils/API';

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
        view: 'student',
        adminList: '',
        instructorList: '',
        studentList: '',

        // userList: []

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

        // Set initial value of instructor
        let value = 'instructor';
        switch (value) {
            case 'admin':
                API.adminList()
                    .then(res => {
                        console.log("Return Data: Admins")
                        console.log(res.data)
                        this.setState({
                            view: 'admin',
                            adminList: res.data,
                            accountModal: false,
                            activityModal: true,
                            message: '',
                            color: ''
                        })
                    })
                break
            case 'instructor':
                API.instructorList()
                    .then(res => {
                        console.log("Return Data: Instructors")
                        console.log(res.data)
                        this.setState({
                            view: 'instructor',
                            instructorList: res.data,
                            accountModal: false,
                            activityModal: true,
                            message: '',
                            color: ''
                        })
                    })
                break
            case 'student':
                API.studentList()
                    .then(res => {
                        console.log("Return Data: Students")
                        console.log(res.data)
                        this.setState({
                            view: 'student',
                            studentList: res.data,
                            accountModal: false,
                            activityModal: true,
                            message: '',
                            color: ''
                        })
                    })
                break
        }

    }

    changeView = event => {
        event.preventDefault();
        let { value } = event.target
        console.log(value)

        switch (value) {
            case 'admin':
                API.adminList()
                    .then(res => {
                        console.log("Getting Data: Admin")
                        if (typeof res.data !== 'string') {
                            console.log(res.data)
                            this.setState({
                                view: 'admin',
                                adminList: res.data,
                                accountModal: false,
                                activityModal: true,
                                message: '',
                                color: ''
                            })
                        } else {
                            console.log("No Admins")
                        }
                    })
                break
            case 'instructor':
                API.instructorList()
                    .then(res => {
                        console.log("Getting Data: Instructor")
                        if (typeof res.data !== 'string') {

                            console.log(res.data)
                            this.setState({
                                view: 'instructor',
                                instructorList: res.data,
                                accountModal: false,
                                activityModal: true,
                                message: '',
                                color: ''
                            })
                        } else {
                            console.log("No Instructors")
                        }
                    })
                break
            case 'student':
                API.studentList()
                    .then(res => {
                        console.log('Getting Data: Students')
                        if (typeof res.data !== 'string') {

                            console.log(res.data)
                            this.setState({
                                view: 'student',
                                studentList: res.data,
                                accountModal: false,
                                activityModal: true,
                                message: '',
                                color: ''
                            })
                        } else {
                            console.log("No Students")
                        }
                    })
                break
        }

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
    // handleDelete = id => {
    //     API.deleteUser(id)
    //         .then(res => {
    //             console.log(res.data)
    //             this.setState({
    //                 message: res.data.message,
    //                 color: res.data.color
    //             })
    //             API.userList()
    //                 .then(res => {
    //                     this.setState({
    //                         userList: res.data,
    //                     })
    //                 })
    //         })
    // }

    handleAdminDelete = id => {
        console.log("Deleting Admin")
        API.deleteAdmin(id)
            .then(res => {
                console.log(res)
                API.adminList()
                    .then(res => {
                        this.setState({
                            adminList: res.data
                        })
                    }
                    )
            })
    }

    handleInstructorDelete = id => {
        console.log("Deleting Instructor")
        API.deleteInstructor(id)
            .then(res => {
                console.log(res)
                API.instructorList()
                    .then(res => {
                        this.setState({
                            instructorList: res.data
                        })
                    })
            })
    }

    handleStudentDelete = id => {
        console.log("Deleting Student")
        API.deleteStudent(id)
            .then(res => {
                console.log(res)
                API.studentList()
                    .then(res => {
                        this.setState({
                            studentList: res.data
                        })
                    })
            })
    }

    render() {
        return (
            <div className='mt-5'>


                <div className='container'>
                    {/* <h1>Welcome {this.props.user.firstName}</h1> */}

                    <div>
                        <button type='button' className='btn btn-primary mr-3' onClick={this.accountControl}>Create Account</button>
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
                            close={this.accountControl}
                        /> : ''}

                    {/* Rendered if true */}
                    {this.state.activityModal ?

                        <div className='mt-3'>
                            <button className='btn btn-primary mr-2' type='button' onClick={this.changeView} value='admin'>Administrator List</button>
                            <button className='btn btn-primary mr-2' type='button' onClick={this.changeView} value='instructor'>Instructor List</button>
                            <button className='btn btn-primary' type='button' onClick={this.changeView} value='student'>Student List</button>
                            <ActivityModal
                                view={this.state.view}
                                changeView={this.changeView}
                                adminList={this.state.adminList}
                                instructorList={this.state.instructorList}
                                studentList={this.state.studentList}
                                handleAdminDelete={this.handleAdminDelete}
                                handleInstructorDelete={this.handleInstructorDelete}
                                handleStudentDelete={this.handleStudentDelete}
                                message={this.state.message}
                                color={this.state.color}
                            />
                        </div>

                        : ''}

                </div>
            </div>
        )
    }
}

export default AdminHome;