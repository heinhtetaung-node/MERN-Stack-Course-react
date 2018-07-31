import axios from 'axios';

// api configuration reference from this https://github.com/axios/axios/issues/191
const axioApi = axios.create({  
        baseURL: 'http://localhost:5000/api/',
        //baseURL: 'http://mern-stack-course.herokuapp.com/api/',
        //baseURL: 'https://jsonplaceholder.typicode.com/',
        timeout: 10000,
        withCredentials: true,
        //transformRequest: [(data) => JSON.stringify(data.data)],
        // headers: {
        // 	'Accept': 'application/json',
        // 	'Content-Type': 'application/json',
        // }
});

export default axioApi