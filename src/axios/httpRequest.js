import axios from 'axios';


export const httpRequest = axios.create({
  baseURL : 'http://localhost:9812',
  // baseURL : `${process.env.REACT_APP_API_BASE_URL}`,
  headers : {
    'Content-Type': 'application/json'
  }
});