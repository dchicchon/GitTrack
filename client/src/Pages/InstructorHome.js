import React, { Component } from 'react';
import API from '../Utils/API';
// import { create } from 'domain';

// Utils


const StudentList = () => {
    return (
        <div className='mt-3'>
            <h2>Students</h2>
            <table>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Number of Commits</th>
                    </tr>
                    <tr>
                        <td>Steve</td>
                        <td>Johnson</td>
                        <td>stevie@gmail.com</td>
                        <td>20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

class InstructorHome extends Component {
    state = {

        showList: false,

        // Creating Cohort
        createCohort: false,
        cohortName: '',

        // Adding Student
        addStudent: false,
        // studentEmail: '',
        studentName: '',

        // Geting Cohort List
        cohortList: ''
    }

    componentDidMount() {
        console.log("Getting Cohorts")
        API.getCohorts(this.props.user.id)
            .then(res => {
                if (res.data[0].name) {
                    console.log("Cohorts Received")
                    this.setState({
                        cohortList: res.data
                    })
                    console.log(this.state.cohortList)

                } else {
                    console.log("No Cohorts!")
                }
            })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    // ================================
    // Creating and Submitting Cohorts
    // =================================
    createCohort = () => {
        console.log("Creating Cohort")
        if (this.state.createCohort) {
            return this.setState({
                createCohort: false
            })
        }
        this.setState({
            createCohort: true
        })
    }

    submitCohort = (event) => {
        event.preventDefault()
        if (this.state.cohortName) {
            console.log("Cohort Submission")
            let creds = {
                name: this.state.cohortName,
                numberStudents: 0,
                instructorID: this.props.user.id
            }
            console.log(creds)
            API.cohortCreate(creds)
                .then(res => {
                    console.log("cohort created")
                    console.log(res)
                    this.setState({
                        createCohort: false
                    })
                    API.getCohorts(this.props.user.id)
                        .then(res => {
                            console.log(res.data)
                            this.setState({
                                cohortList: res.data
                            })
                        })
                })

        } else {
            console.log("Please fill out all fields")
        }

        // API Call to server to enter cohort

    }

    // =================================

    inspectCohort = (id) => {
        console.log("Inspect Cohort")
        console.log(`Cohort ID`, id)
        this.setState({
            showList: true
        })

        // Show list of students in that cohort
        // 1. API Call to get list of students in cohort
        // 2. Map each student to a table to the right of the list of cohorts
    }

    // Instructors should be able to add students to their cohort
    // Options, should this be an email link that instructors send their students?
    // OR Instructors can add all the info for the student.

    // Maybe we can automatically generate a firstName, lastName, and password for students when an email is validated and sent out?

    // E.g.
    // 
    // Welcome student to {cohort name which will also be a link to the login page}!
    // 
    // Use your email and password to login
    // Email: ike@gmail.com
    // Password: ikeDog
    // 
    // See you real soon!
    // GitTrack Team

    // Maybe for now we can have the instructors create the students entirely
    addStudent = () => {
        if (this.state.addStudent) {
            return this.setState({
                addStudent: false
            })
        }
        this.setState({
            addStudent: true
        })
    }

    // Will add student to a specific cohort
    submitStudent = event => {
        event.preventDefault();
        console.log(this.state.studentName)
        this.setState({
            addStudent: false
        })
    }


    render() {

        return (
            <div className='mt-3'>
                <h2>Welcome Instructor</h2>

                {/* List of cohorts*/}
                <div className='container mt-3'>
                    <div className='row mb-2'>
                        <div className='col-2'>
                            <h3>Cohorts</h3>
                            {this.state.cohortList ?
                                <div>
                                    <ul className="list-group">
                                        {this.state.cohortList.map((cohort, i) => (
                                            <li
                                                key={i}
                                                className='list-group-item hover'
                                                onClick={this.inspectCohort}
                                            >
                                                {cohort.name}
                                            </li>
                                        ))}
                                        {/* {this.state.cohortList.map((cohort, i) => {
                                            <li
                                                key={i}
                                                className='list-group-item hover'
                                            >
                                                Cohort
                                        </li>
                                        })} */}
                                    </ul>
                                </div>
                                : ''}
                        </div>
                        <div className='col-9'>
                            {this.state.showList ?
                                <div>
                                    <button type='button' className='btn btn-primary' onClick={this.addStudent}>Invite Student</button>
                                    {this.state.addStudent ?
                                        <div className='col-4 mt-3'>
                                            <div className='form-group'>
                                                <label htmlFor="cohortName">Student Name</label>
                                                <input className='form-control' name='studentName' value={this.state.studentName} onChange={this.handleInputChange} />
                                            </div>
                                            <button type='button' className='btn btn-primary' onClick={this.submitStudent}>Submit</button>
                                        </div>
                                        : ''}
                                    <StudentList />
                                </div>
                                : ''}
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className="col-3">
                            <button type='button' className='btn btn-primary' onClick={this.createCohort}>Create Cohort</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-3">
                            {this.state.createCohort ?
                                <div>
                                    <div className='form-group'>
                                        <label htmlFor="cohortName">Cohort Name</label>
                                        <input className='form-control' name='cohortName' value={this.state.cohortName} onChange={this.handleInputChange} />
                                    </div>
                                    <button type='button' className='btn btn-primary' onClick={this.submitCohort}>Submit</button>
                                </div>
                                : ""}
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default InstructorHome;