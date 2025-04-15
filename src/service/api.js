import axios from 'axios';

const API = axios.create({
    baseUrl: 'http://localhost:3001', 
})
export const fetchUsers = API.get('/users');