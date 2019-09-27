import axios from 'axios';

export default {

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
        return axios.post("/auth/signup", creds)
    }
}