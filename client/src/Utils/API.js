import axios from 'axios';

export default {

    // Handle User Login
    handleLogin: (creds) => {
        return axios.post("/auth/login", creds)
    }
}