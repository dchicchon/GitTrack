import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryLine, VictoryTooltip } from 'victory'
// import CohortStudentList from '../Components/CohortStudentList';
import AddStudent from '../Components/AddStudent';
import AddCohort from '../Components/AddCohort';

// Utils
import API from '../Utils/API';
import FormatList from '../Components/FormatList';

// TO DO: why does the function SumContributions from the component CohortStudentList execute when I click on the Invite Student Button? 
// This is important to find out because it is causing severe lag to Invite student input

class InstructorHome extends Component {
    state = {

        showList: false,
        loading: false,

        // Creating Cohort
        createCohort: false,
        cohortName: '',

        // Adding Student
        addStudent: false,
        via: 'link',

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
        dataFormat: 'month',
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
                // console.log(res.data)
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

    // Cohort Functions
    // ==================================================================
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
            let creds = {
                name: this.state.cohortName,
                numberStudents: 0,
                InstructorId: this.props.user.id
            }
            API.cohortCreate(creds)
                .then(res => {
                    this.setState({
                        createCohort: false
                    })
                    API.getCohorts(this.props.user.id)
                        .then(res => {
                            this.setState({
                                cohortList: res.data
                            })
                        })
                })

        } else {
            console.log("Please fill out all fields")
        }


    }


    // Get list of cohort students and their data to put on graph
    inspectCohort = event => {
        // event.preventDefault();
        this.setState({
            loading: true,
            showList: false
        })

        let { id, value } = event.target
        API.cohortStudentList(value)
            .then(res => {


                if (res.data.length === 0) {
                    this.setState({
                        showList: true,
                        loading: false,
                        studentEmail: '',

                        studentLegend: '',

                        studentData: [],
                        weekData: '',
                        monthData: '',
                        yearData: '',

                        cohortName: '',
                        currentCohort: value,
                        currentCohortName: id
                    })
                }

                else {


                    let list = {
                        students: res.data.filter(student => student.githubUsername !== '')
                    }

                    API.getGraph(list)
                        .then(res2 => {

                            // Here we modify data to get specific numbers
                            let students = res2.data.students
                            let weekSum = 0;
                            let monthSum = 0;
                            let yearSum = 0;
                            let studentLegend = []
                            for (let i = 0; i < students.length; i++) {
                                // console.log(students[i])
                                // console.log(students[i].week)

                                let legendEntry = {
                                    name: (students[i].author.firstName + ' ' + students[i].author.lastName),
                                    symbol: { fill: students[i].color }
                                }

                                studentLegend.push(legendEntry)
                                for (let j = 0; j < students[i].week.length; j++) {
                                    weekSum += students[i].week[j].count
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
                                average: (weekSum / 7).toFixed(2)
                            }

                            let monthData = {
                                total: monthSum,
                                average: (monthSum / 30).toFixed(2)
                            }

                            let yearData = {
                                total: yearSum,
                                average: (yearSum / 12).toFixed(2)
                            }


                            this.setState({

                                // Show the list of students
                                showList: true,
                                loading: false,

                                // List of students
                                studentEmail: '',

                                // Legend for the VictoryLegend Component
                                studentLegend: studentLegend,

                                // Data for the week,month,year
                                weekData: weekData,
                                monthData: monthData,
                                yearData: yearData,

                                // List of students Contributions
                                studentData: students,

                                cohortName: '',

                                // Cohort ID
                                currentCohort: value,

                                // Cohort Name
                                currentCohortName: id


                            })

                        })
                }
            })
    }
    // ==================================================================

    changeFormat = event => {
        let { value } = event.target
        this.setState({
            dataFormat: value
        })
    }
    // ==================================================================


    // STUDENT FUNCTIONS
    // ==================================================================

    // Currently this affects the cohort student list when I click on the button
    // This causes the cohort student list to re-render

    // Clicking this affects the addStudent state Variable
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

    inviteMethod = event => {
        let { value } = event.target
        this.setState({
            via: value
        })
    }

    // Will will an invite to the student with a particular email
    // The invite should contain a link that will send the student to a form
    // That they can fill out for a particular cohort

    // SHOULD NOT CREATE STUDENT IN DATABASE
    // ONLY STUDENT SIGNING UP FOR COHORT WILL CREATE STUDENT

    submitStudent = event => {
        event.preventDefault();
        // console.log(this.state.studentFirstName)
        // console.log(this.state.studentLastName)

        let creds = {
            // firstName: this.state.studentFirstName,
            // lastName: this.state.studentLastName,
            email: this.state.studentEmail,
            cohortID: this.state.currentCohort
        }

        console.log(creds)
        // API.studentCreate(creds)
        // .then(res => {
        // console.log("Invited Student")
        // console.log(res.data)

        // API.cohortStudentList(this.state.currentCohort)
        // .then(res => {
        // console.log("Updated Cohort Student List")
        // console.log(res.data)
        // this.setState({
        // studentFirstName: '',
        // studentLastName: '',
        // studentEmail: '',
        // studentList: res.data,
        // showList: true,
        // currentCohort: this.state.currentCohort,
        // addStudent: false
        // })
        // })
        // }

        // )

    }

    handleRemoveStudent = id => {
        console.log("Remove Student")
        console.log(id)
        API.studentRemove(id)
            .then(res => {
                console.log("Student Removed")
                console.log(res.data)
                API.cohortStudentList(this.state.currentCohort)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            studentList: res.data,
                            // showList: true,  
                            // showGraph: false,
                            // currentCohort: value,
                            // currentCohortName: id

                        })
                    })
            })
    }
    // ==================================================================


    render() {

        return (
            <div>

                {/* List of cohorts*/}
                <div className='home-container mt-3'>
                    {/* <h2>Welcome {this.props.user.firstName}</h2> */}

                    {/* This row should contain cohort list and respective students */}
                    <div className='row mb-2'>

                        <div className='col-3'>

                            <h3>Cohorts <span className='add' onClick={this.createCohort}>+</span></h3>

                            {this.state.createCohort ?
                                <AddCohort
                                    close={this.createCohort}
                                    handleInputChange={this.handleInputChange}
                                    cohortName={this.state.cohortName}
                                    submitCohort={this.submitCohort}
                                />
                                : ""}

                            {/* Show Cohort List */}
                            {this.state.cohortList ?
                                <div className='mt-2'>
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


                            {/* Render student List if cohort is inspected */}
                            {this.state.showList ?
                                <div className='mt-2'>
                                    <div className='row'>
                                        <h3>Students <span className='add' onClick={this.addStudent}>+</span></h3>
                                        {this.state.addStudent ?
                                            <AddStudent
                                                close={this.addStudent}
                                                cohortID={this.state.currentCohort}
                                                inviteMethod={this.inviteMethod}
                                                inviteVia={this.state.via}
                                                handleInputChange={this.handleInputChange}
                                                studentEmail={this.state.studentEmail}
                                                submitStudent={this.submitStudent}
                                            />
                                            : ''}
                                    </div>
                                    {this.state.studentData.length !== 0 ?
                                        < ul className='list-group'>
                                            {this.state.studentData.map((student, k) => (
                                                <li
                                                    key={k}
                                                    className='list-group-item'
                                                >
                                                    <Link className='student-link' to={{ pathname: '/student/' + student.author.id }}>
                                                        <span style={{ color: `${student.color}`, fontSize: `1.8rem` }}>&#9679;</span><span> {student.author.firstName} {student.author.lastName}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul> : 'No Students yet! Click on the plus button to add students'}
                                </div>
                                : ''
                            }

                            {/* <CohortStudentList
                                    format={this.state.dataFormat}
                                    handleRemove={this.handleRemoveStudent}
                                    addStudent={this.addStudent}
                                    // handleInputChange={this.handleInputChange}
                                    // list={this.state.studentList}
                                    data={this.state.studentData}
                                /> */}


                            {/* If I want to add student. Depends on addStudent State */}

                        </div>
                        <div className='col-9'>
                            {this.state.loading ?
                                <div className="spinner-border text-info" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : ''}
                            {this.state.showList ?
                                <div>
                                    <h2>{this.state.currentCohortName}</h2>
                                    <div className='mt-3'>
                                        <div>
                                            <div className='row'>
                                                <div className='col-4'>

                                                    <h3>Class Progress</h3>
                                                    <h5>Commits this {this.state.dataFormat}: {this.state.dataFormat === 'year' ? this.state.yearData.total : ''} {this.state.dataFormat === 'month' ? this.state.monthData.total : ''} {this.state.dataFormat === 'week' ? this.state.weekData.total : ''}</h5>
                                                    <h5>Average Commits: {this.state.dataFormat === 'year' ? this.state.yearData.average : ''} {this.state.dataFormat === 'month' ? this.state.monthData.average : ''} {this.state.dataFormat === 'week' ? this.state.weekData.average : ''}</h5>

                                                    {/* On button click, add a class that changes it's style */}
                                                    <FormatList
                                                        format={this.state.dataFormat}
                                                        changeFormat={this.changeFormat}
                                                    />
                                                </div>

                                            </div>
                                            <VictoryChart>
                                                <VictoryAxis
                                                    axisLabelComponent={<VictoryLabel />}
                                                    label={this.state.dataFormat}
                                                    scale={{ x: "time" }}
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

                                                {/* Add a feature that will allow instructors to hide lines on student click */}
                                                {this.state.studentData ?
                                                    this.state.studentData.map(
                                                        (student, i) => (
                                                            <VictoryLine
                                                                interpolation='natural'
                                                                name={student.author.firstName}
                                                                key={i}
                                                                labelComponent={<VictoryTooltip />}
                                                                labels={() => `${student.author.firstName}`}
                                                                // labels={({ datum }) => `${datum.count}, ${datum.date}`}
                                                                data={student[`${this.state.dataFormat}`]}
                                                                // data={this.state.dataFormat === 'monthly' ? user.monthly : '' || this.state.dataFormat === 'weekly' ? user.weekly : '' || this.state.dataFormat === 'yearly' ? user.yearly : ''}
                                                                style={{
                                                                    data: { stroke: student.color, strokeWidth: 0.8 }
                                                                }}
                                                                x='date'
                                                                y='count'
                                                            />
                                                        )
                                                    )
                                                    : ''}

                                            </VictoryChart>
                                        </div>

                                    </div>






                                </div>
                                : ''}
                        </div>
                    </div>
                    <div>
                        <div>
                            {/* End row here */}


                        </div>
                        {/* : ''} */}
                    </div>
                </div >


            </div >

        )
    }
}

export default InstructorHome;