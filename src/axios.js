import axios from 'axios';
 
// Create Axios instance
const api = axios.create({
  baseURL: 'https://b668-2407-aa80-15-6e08-115f-7abb-9729-15d3.ngrok-free.app/api/web',
  withCredentials: true,  
});
 
export default api;
 
 