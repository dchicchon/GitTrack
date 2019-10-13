import React from 'react';
import { Link } from 'react-router-dom';

function sumContributions(key, format, data) {
    let sum = 0;
    console.log(format)

    // List of all users, we only want one to use
    console.log(data)


    
    for (let i = 0; i < data[key][format].length; i++) {
        sum += data[key][format][i].count
    }
    console.log(sum)
    return sum
}

function CohortStudentList({ data, format, handleRemove, list, }) {
    return (
        <div className='text-light mt-3'>
            <h3>Students</h3>
            {list.length ?
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            {/* <th>Github Username</th> */}
                            {/* <th>Last Name</th> */}
                            {/* <th>Email</th> */}
                            <th>Commits this {format}</th>
                            <th>Remove</th>
                        </tr>
                        {list.map((student, i) => (
                            <tr key={i}>
                                <td><Link className='student-link' to={{ pathname: '/student/' + student.id }}>{student.firstName} {student.lastName}</Link></td>

                                {/* Based on the format, we want to give the total number of commits for this user */}

                                <td>{sumContributions(i, format, data)}</td>
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