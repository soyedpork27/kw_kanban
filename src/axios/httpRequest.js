import axios from 'axios';

export const httpRequest = axios.create({
  baseURL : 'http://localhost:9812',
  headers : {
    'Content-Type': 'application/json'
  }
});