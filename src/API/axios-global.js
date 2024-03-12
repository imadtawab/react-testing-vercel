import axios from 'axios'

// const apiUrl = "192.168.0.111:3500"
const apiUrl = "http://localhost:3500"
const adminAPI = axios.create({
    baseURL: `${apiUrl}/admin`,
})

adminAPI.defaults.withCredentials = true

const clientAPI = axios.create({
    baseURL: `${apiUrl}/client`,
})
export {adminAPI , clientAPI}