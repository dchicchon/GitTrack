import React from 'react';

function CohortStudentList({ list, handleRemove }) {
    return (
        <div className='text-light mt-3'>
            <h3>Students</h3>
            {list.length ?
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Github Username</th>
                            {/* <th>Last Name</th> */}
                            <th>Email</th>
                            <th>Commits this month</th>
                            <th>Remove</th>
                        </tr>
                        {list.map((student, i) => (
                            <tr key={i}>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{student.githubUsername}</td>
                                <td>{student.email}</td>
                                <td>5</td>
                                {/* This should be removing student from cohort, not deleting student */}
                                <td><button className='btn' type='button' onClick={() => handleRemove(student.id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : 'No Students'
            }

        </div >
    )

}

export default CohortStudentList;