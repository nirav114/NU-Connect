import axios from 'axios'

axios.defaults.headers.common = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    'Content-Type': 'application/json;charset=UTF-8'
};

export default axios.create({
    baseURL : 'http://localhost:4000',
    withCredentials:true
});