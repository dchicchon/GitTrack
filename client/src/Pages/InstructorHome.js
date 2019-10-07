import React, { Component } from 'react';

// Components
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryLine, VictoryLegend } from 'victory'
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
        currentCohortName: '',

        // Geting Cohort List
        cohortList: '',

        // Getting Student List
        studentList: '',

        // Graph
        showGraph: false,
        dataFormat: 'year',
        studentData: [],
        studentLegend: '',
        weekData: '',
        monthData: '',
        yearData: ''
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

    inspectCohort = event => {
        event.preventDefault();
        let { id, value } = event.target
        API.cohortStudentList(value)
            .then(res => {
                console.log(res.data)

                this.setState({
                    studentList: res.data,
                    showList: true,
                    showGraph: false,
                    currentCohort: value,
                    currentCohortName: id
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
                let students = res.data.students
                let weekSum = 0;
                let monthSum = 0;
                let yearSum = 0;
                let studentLegend = []

                // Iterate through student list

                for (let i = 0; i < students.length; i++) {
                    console.log(students[i])
                    console.log(students[i].week)

                    let legendEntry = {
                        name: (students[i].author.firstName + ' ' + students[i].author.lastName),
                        symbol: { fill: students[i].color }
                    }

                    studentLegend.push(legendEntry)
                    for (let j = 0; j < students[i].week.length; j++) {
                        weekSum += students[i].week[j].count
                        // weekSum += students[i].weekly[j].count
                    }
                    for (let k = 0; k < students[i].month.length; k++) {
                        monthSum += students[i].month[k].count
                    }
                    for (let l = 0; l < students[i].year.length; l++) {
                        yearSum += students[i].year[l].count
                    }



                }

                let weekData = {
                    total: weekSum,
                    average: weekSum / 7
                }

                let monthData = {
                    total: monthSum,
                    average: monthSum / 30
                }

                let yearData = {
                    total: yearSum,
                    average: yearSum / 12
                }


                this.setState({
                    showGraph: true,
                    studentLegend: studentLegend,
                    weekData: weekData,
                    monthData: monthData,
                    yearData: yearData,
                    studentData: students
                })

                console.log(this.state.studentLegend)
            })
    }

    changeFormat = event => {
        let { value } = event.target
        this.setState({
            dataFormat: value
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

                {/* List of cohorts*/}
                <div className='container mt-3'>
                    {/* <h2>Welcome {this.props.user.firstName}</h2> */}

                    {/* This row should contain cohort list and respective students */}
                    <div className='row mb-2'>
                        <div className='col-2'>
                            <h3>Cohorts</h3>
                            {this.state.cohortList ?
                                <div>
                                    <ul className="list-group">
                                        {this.state.cohortList.map((cohort, i) => (
                                            <li
                                                key={i}
                                                value={cohort.id}
                                                id={cohort.name}
                                                className='list-group-item hover'
                                                onClick={this.inspectCohort}
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
                                    <h2>{this.state.currentCohortName}</h2>


                                    <CohortStudentList
                                        list={this.state.studentList}
                                        handleRemove={this.handleRemoveStudent}
                                    />

                                    <div className='row'>
                                        <button type='button' className='btn btn-primary mr-3' onClick={this.addStudent}>Add Student</button>
                                        <button className='btn' type='button' onClick={this.cohortCommitGraph}>Get Cohort Graph</button>
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
                                </div>
                                : ''}
                        </div>
                    </div>
                    <div>
                        <div>
                            {/* End row here */}

                            <div className='mt-3'>
                                {this.state.showGraph ?
                                    <div>
                                        <h3>Class Progress</h3>
                                        <h5>Commits this {this.state.dataFormat}: {this.state.dataFormat === 'year' ? this.state.yearData.total : ''} {this.state.dataFormat === 'month' ? this.state.monthData.total : ''} {this.state.dataFormat === 'week' ? this.state.weekData.total : ''}</h5>
                                        <h5>Average Commits: {this.state.dataFormat === 'year' ? this.state.yearData.average : ''} {this.state.dataFormat === 'month' ? this.state.monthData.average : ''} {this.state.dataFormat === 'week' ? this.state.weekData.average : ''}</h5>

                                        <h3>Change Format</h3>
                                        <div className='row'>
                                            <button type='button' className='btn mr-2' value='week' onClick={this.changeFormat}>Weekly</button>
                                            <button type='button' className='btn mr-2' value='month' onClick={this.changeFormat}>Monthly</button>
                                            <button type='button' className='btn' value='year' onClick={this.changeFormat}>Yearly</button>

                                        </div>
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
                                            <VictoryLegend
                                                x={150}
                                                y={50}
                                                title='Legend'
                                                centerTitle
                                                orientation='horizontal'
                                                gutter={20}
                                                itemsPerRow={4}
                                                // borderPadding={0}
                                                style={{ border: { stroke: '#61dafb' }, title: { fontSize: 12, stroke: 'white', letterSpacing: '1px' }, labels: { fontSize: 9, stroke: '#61dafb', letterSpacing: '1px' }, names: { fontSize: 9, strokeWidth: 2, stroke: 'white', letterSpacing: '1px' } }}
                                                data={this.state.studentLegend}
                                                height={10}
                                            />

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
                        {/* : ''} */}
                    </div>
                </div >


            </div >

        )
    }
}

export default InstructorHome;