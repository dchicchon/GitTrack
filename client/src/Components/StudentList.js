import React from 'react';

import Message from './Message';

const StudentList = ({ changeView, color, message, studentList, handleStudentDelete }) => {
    return (

        <div>
            <h3>Students</h3>
            <button className='btn btn-primary mr-2' type='button' onClick={changeView} value='admin'>Admin List</button>
            <button className='btn btn-primary' type='button' onClick={changeView} value='instructor'>Instructor List</button>
            <Message
                message={message}
                color={color}
            />
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                    {studentList.map((student, i) => (
                        <tr key={i}>
                            <td>{student.id}</td>
                            <td>{student.firstName} {student.lastName}</td>
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
