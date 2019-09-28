import axios from 'axios';

export default {

    // Auth functions
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

    // handleSignup: (creds) => {
    //     return axios.post("/auth/signup", creds)
    // },

    createAccount: (creds) => {
        return axios.post("/auth/signup", creds)
    },

    // Admin Function
    userList: () => {
        return axios.get("/api/admin/users")
    },

    // Instructor Functions
    studentList: () => {
        return axios.get("/api/instructors/users")
    }

    // Student Functions

}