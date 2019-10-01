import React from 'react';

import AdminList from './AdminList';
import InstructorList from './InstructorList';
import StudentList from './StudentList';

const ActivityModal = ({ view, changeView, adminList, instructorList, studentList, handleAdminDelete, handleInstructorDelete, handleStudentDelete, message, color }) => {
    if (view === 'admin') {
        return (
            <div>
                <AdminList
                    changeView={changeView}
                    adminList={adminList}
                    handleAdminDelete={handleAdminDelete}
                    message={message}
                    color={color}
                />
            </div>
        )

    } else if (view === 'instructor') {
        return (
            <div>
                <InstructorList
                    changeView={changeView}
                    instructorList={instructorList}
                    handleInstructorDelete={handleInstructorDelete}
                    message={message}
                    color={color}
                />
            </div>
        )
    } else {
        return (
            <div>
                <StudentList
                    changeView={changeView}
                    studentList={studentList}
                    handleStudentDelete={handleStudentDelete}
                    message={message}
                    color={color}
                />
            </div>
        )
    }
}

export default ActivityModal;