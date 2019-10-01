import React from 'react';

import Message from './Message';

const StudentList = ({ color, message, studentList, handleStudentDelete }) => {
    return (

        <div>
            <h3 className='mt-2'>Students</h3>
            <Message
                message={message}
                color={color}
            />
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Github Username</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                    {studentList.map((student, i) => (
                        <tr key={i}>
                            <td>{student.id}</td>
                            <td>{student.firstName} {student.lastName}</td>
                            <td>{student.githubUsername}</td>
                            <td>{student.email}</td>
                            <td><button type='button' className='btn btn-danger' onClick={() => handleStudentDelete(student.id)}>x</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentList;
