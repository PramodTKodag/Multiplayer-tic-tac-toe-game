import { apiUrl } from '../utils/links';
import axios from 'axios'

export async function addUser(payload) {
    return axios.post(`${apiUrl}user/create`, payload)
}

export async function loginUser(payload) {
    return axios.post(`${apiUrl}user/login`, payload)
}