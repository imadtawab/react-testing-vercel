import axios from 'axios'
// https:://node-testing-vercel-96ii.vercel.app
const apiUrl = process.env.REACT_APP_SERVER_DOMAINE
// const apiUrl = "http://localhost:3500"
// const apiUrl = process.env.SERVER_DOMAINE
const adminAPI = axios.create({
    baseURL: `${apiUrl}/admin`,
})

adminAPI.defaults.withCredentials = true

// Add a request interceptor to include headers
adminAPI.interceptors.request.use(
    (config) => {
        // Decode cookies
        let cookiePairs = document.cookie.split("; ");
        
        // Initialize a variable to store the decoded _auth value
        let decodedAuthValue = null;

        // Iterate through each key-value pair
        cookiePairs.forEach(function(pair) {
            var keyValue = pair.split("=");
            var key = keyValue[0];
            var value = keyValue[1];
            if (key === "_auth") {
                decodedAuthValue = value;
            }
        })
        // Modify headers here
        config.headers['Authorization'] = decodedAuthValue;
        // config.headers['Authorization'] = `Bearer ${decodedAuthValue}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const clientAPI = axios.create({
    baseURL: `${apiUrl}/client`,
})
export {adminAPI , clientAPI}