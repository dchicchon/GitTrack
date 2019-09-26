import axios from 'axios';

export default {

    // Handle User Login
    handleLogin: (creds) => {
        return axios.post("/login", creds)
    }
}