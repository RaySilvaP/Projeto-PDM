import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.3.23.115:3000'
})
