import { apiUrl } from '../utils/links';
import axios from 'axios'

export async function createRoom(payload) {
    return axios.post(`${apiUrl}room`, payload)
}