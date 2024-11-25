import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();
    // request interceptors to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('request  stopped by interceptors', token);
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        }
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // interceptors 401 and 403 status 
    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        }, async (error) => {
            const status = error.response.status;
            console.log('status error in the interceptors', error);
            // for 401 or 403 logout the user and move the user to the login page
            if(status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );


    // axiosSecure.interceptors.response.use(
    //     function (response) {
    //         return response;
    //     },
    //     async (error) => {
    //         if (error.response) {
    //             const status = error.response.status;
    //             console.log('Status error in the interceptors', status);
    //             // Handle 401 or 403 errors
    //             if (status === 401 || status === 403) {
    //                 await logOut();
    //                 navigate('/login');
    //             }
    //         } else {
    //             // Log the error if `error.response` is undefined
    //             console.error('Error without response:', error);
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return axiosSecure;
};

export default useAxiosSecure;