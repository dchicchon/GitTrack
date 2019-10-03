import React, { Component } from 'react';

// Components
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryLine } from 'victory'
import CohortStudentList from '../Components/CohortStudentList';

// Utils
import API from '../Utils/API';

class InstructorHome extends Component {
    state = {

        showList: false,

        // Creating Cohort
        createCohort: false,
        cohortName: '',

        // Adding Student
        addStudent: false,
        // studentEmail: '',
        studentFirstName: '',
        studentLastName: '',
        studentEmail: '',
        currentCohort: '',

        // Geting Cohort List
        cohortList: '',

        // Getting Student List
        studentList: '',

        // Graph
        showGraph: false,
        dataFormat: 'yearly',
        studentData: []
    }

    componentDidMount() {
        console.log("Getting Cohorts")
        API.getCohorts(this.props.user.id)
            .then(res => {
                console.log(res.data)
                // If we get data back
                if (res.data) {
                    console.log("Cohorts Received")
                    this.setState({
                        cohortList: res.data
                    })
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
                InstructorId: this.props.user.id
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

        API.cohortStudentList(id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    studentList: res.data,
                    showList: true,
                    currentCohort: id
                })


            })
    }

    cohortCommitGraph = event => {
        event.preventDefault();
        console.log("Get commit graph for cohort")
        let list = {
            students: this.state.studentList
        }
        API.getGraph(list)
            .then(res => {
                console.log(res.data.students)
                this.setState({
                    showGraph: true,
                    studentData: res.data.students
                })
            })
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
        console.log(this.state.studentFirstName)
        console.log(this.state.studentLastName)

        let creds = {
            firstName: this.state.studentFirstName,
            lastName: this.state.studentLastName,
            email: this.state.studentEmail,
            cohortID: this.state.currentCohort
        }

        console.log(creds)
        API.studentCreate(creds)
            .then(res => {
                console.log("Created Student")
                console.log(res.data)

                API.cohortStudentList(this.state.currentCohort)
                    .then(res => {
                        console.log("Updated Cohort Student List")
                        console.log(res.data)
                        this.setState({
                            studentList: res.data,
                            showList: true,
                            currentCohort: this.state.currentCohort,
                            addStudent: false
                        })
                    })
            }

            )

    }

    handleRemoveStudent = id => {
        console.log("Remove Student")
        console.log(id)
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
                                                onClick={() => this.inspectCohort(cohort.id)}
                                            >
                                                {cohort.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                : ''}
                            <div className='row mt-2'>
                                <div className="col-12">
                                    <button type='button' className='btn btn-primary' onClick={this.createCohort}>Create Cohort</button>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className="col-12">
                                    {this.state.createCohort ?
                                        <div>
                                            <div className='form-group'>
                                                <label htmlFor="cohortName">Cohort Name</label>
                                                <input className='form-control' name='cohortName' value={this.state.cohortName} onChange={this.handleInputChange} placeholder='Cohort Name' />
                                            </div>
                                            <button type='button' className='btn btn-primary' onClick={this.submitCohort}>Submit</button>
                                        </div>
                                        : ""}
                                </div>
                            </div>
                        </div>
                        <div className='col-9'>
                            {this.state.showList ?
                                <div>
                                    <h2>Cohort Name</h2>


                                    <CohortStudentList
                                        list={this.state.studentList}
                                        handleRemove={this.handleRemoveStudent}
                                    />
                                    {/* <StudentList
                                        list={this.state.studentList}
                                        handleRemove={this.handleRemoveStudent}
                                    /> */}
                                    <div className='row'>
                                        <button type='button' className='btn btn-primary mr-3' onClick={this.addStudent}>Add Student</button>
                                        <button className='btn' type='button' onClick={this.cohortCommitGraph}>Get Commit Graph</button>
                                    </div>
                                    {this.state.addStudent ?
                                        <form className='form-horizontal col-12 mt-3'>
                                            <div className='row'>
                                                <div className="form-group mr-2">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input value={this.state.studentFirstName} name='studentFirstName' onChange={this.handleInputChange} type="text" className="form-control" id="firstName" placeholder="First Name" />
                                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                                </div>
                                                <div className="form-group mr-2">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input value={this.state.studentLastName} name='studentLastName' onChange={this.handleInputChange} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email address</label>
                                                    <input value={this.state.studentEmail} name='studentEmail' onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                                </div>
                                            </div>
                                            <button type='button' className='btn btn-primary' onClick={this.submitStudent}>Submit</button>
                                        </form>
                                        : ''}
                                    <div className='mt-3'>
                                        {this.state.showGraph ?
                                            <div>
                                                <h3>Class Progress</h3>
                                                <VictoryChart
                                                    domainPadding={{ y: 20 }}
                                                    padding={50}
                                                >
                                                    <VictoryAxis
                                                        axisLabelComponent={<VictoryLabel />}
                                                        label={this.state.dataFormat}
                                                        style={{
                                                            axisLabel: { fontFamily: 'inherit', letterSpacing: '1px', stroke: 'white', fontSize: 12 },
                                                            grid: { stroke: 'lightgrey' },
                                                            tickLabels: { fontFamily: 'inherit', letterSpacing: '1px', stroke: '#61dafb ', fontSize: 8 }
                                                        }}
                                                    />
                                                    <VictoryAxis
                                                        dependentAxis={true}
                                                        axisLabelComponent={<VictoryLabel />}
                                                        label={'Number of Commits'}
                                                        style={{
                                                            axisLabel: { fontFamily: 'inherit', letterSpacing: '1px', stroke: 'white', fontSize: 12 },
                                                            grid: { stroke: 'lightgrey' },
                                                            tickLabels: { fontFamily: 'inherit', letterSpacing: '1px', stroke: '#61dafb ', fontSize: 8 }

                                                        }}

                                                    />
                                                    {/* <VictoryLegend
                                                        x={150}
                                                        y={50}
                                                        title='Legend'
                                                        centerTitle
                                                        orientation='horizontal'
                                                        gutter={20}
                                                        itemsPerRow={4}
                                                        // borderPadding={0}
                                                        style={{ border: { stroke: 'black' }, title: { fontSize: 7 }, labels: { fontSize: 5 }, names: { fontSize: 5 } }}
                                                        data={this.state.userLegend}
                                                        height={10}
                                                    /> */}

                                                    {this.state.studentData.map(
                                                        (student, i) => (
                                                            <VictoryLine
                                                                interpolation='natural'
                                                                name={student.author.firstName}
                                                                key={i}
                                                                // data={student.monthly}
                                                                data={student[`${this.state.dataFormat}`]}
                                                                // data={this.state.dataFormat === 'monthly' ? user.monthly : '' || this.state.dataFormat === 'weekly' ? user.weekly : '' || this.state.dataFormat === 'yearly' ? user.yearly : ''}
                                                                style={{
                                                                    data: { stroke: student.color, strokeWidth: 0.8 }
                                                                }}
                                                                x='date'
                                                                y='count'
                                                            // data={user}
                                                            />
                                                        )
                                                    )}

                                                </VictoryChart>
                                            </div>
                                            : ""}

                                    </div>
                                </div>
                                : ''}
                        </div>
                    </div>


                </div>

            </div >
        )
    }
}

export default InstructorHome;