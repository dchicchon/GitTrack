import axios from 'axios';

export default {

    // General
    // ============
    editAccount: (creds) => {
        return axios.put("/api/settings", creds)
    },

    // Auth functions
    // =================
    getUser: () => {
        return axios.get("/auth/user")
    },

    // Handle User Login
    handleLogin: (creds) => {
        return axios.post("/auth/login", creds)
    },

    logout: function () {
        return axios.get("/auth/logout")
    },

    handleSignup: (creds) => {
        return axios.post("/api/mail/signup", creds)
    },



    // ===========================
    // Admin Function
    // =======================

    createAccount: (creds) => {
        return axios.post("/auth/signup", creds)
    },

    adminList: () => {
        return axios.get("/api/admin/")
    },

    instructorList: () => {
        return axios.get("/api/admin/instructor")
    },

    studentList: () => {
        return axios.get("/api/admin/student")
    },

    deleteAdmin: (id) => {
        return axios.delete("/api/admin/" + id)
    },

    deleteInstructor: (id) => {
        return axios.delete("/api/admin/instructor/" + id)
    },

    deleteStudent: (id) => {
        return axios.delete("/api/admin/student/" + id)
    },

    // ======================
    // Instructor Functions
    // =======================
    getCohorts: id => {
        return axios.get("/api/instructor/" + id)
    },

    cohortStudentList: id => {
        return axios.get("/api/instructor/cohorts/" + id)
    },

    cohortCreate: creds => {
        return axios.post("/api/instructor/cohorts", creds)
    },

    studentCreate: creds => {
        return axios.post("/api/instructor/students", creds)
    },
    
    inspectStudent: id => {
        return axios.get("/api/instructor/students/" + id)
    },

    studentRemove: id => {
        return axios.delete("/api/instructor/students/" + id)
    },

    getGraph: list => {
        return axios.post("/api/instructor/cohorts/graph", list)
    },


    // =====================
    // Student Functions
    // =====================

    editGithubUsername: (creds) => {
        return axios.put("/api/student/ghUsername", creds)
    },

    getMyData: (username) => {
        return axios.get("/api/student/" + username)
    }

}