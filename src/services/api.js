import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
});


export const login = (credentials) => API.post('/auth/login', credentials);
export const signup = (data) => API.post('/auth/signup', data);
export const fetchJobs = () => API.get('/jobs');
export const applyJob = (jobId) => API.post(`/jobs/apply/${jobId}`);
export const createJob = (job) => API.post('/jobs', job);
export const deleteJob = (jobId) => API.delete(`/jobs/${jobId}`);
export const getTheUserRole=async (token)=>{
  try{
    const res=await API.get('/auth/userinfo');
    return res;
  }
  catch(err){
    console.log(err);
  }
}
