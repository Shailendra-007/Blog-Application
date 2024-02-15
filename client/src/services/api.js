// // Import necessary modules

// This is used to call API. to call API we install axios libarary.
// Axios is a promise-based HTTP Client for node.js.
// Promise object represent the completion (failure) of an asnynchronous operation.

import axios from 'axios';
import { getAccessToken, getType } from '../utils/commom-utils.js';

import { API_NOTICATION_MESSAGES , SERVICE_URL } from '../constants/config.js'

const API_URL =  'http://localhost:8000';

const axiosInstance =axios.create({
    baseURL: API_URL,            // represent backend server running on localhost:8000
    timeout: 10000,              //reprenset timeout if any delay by Api. 10 sec == 10000
    headers:{
        "Accept": "application/json", 
        // "Content-Type" : "application/json"
    },
    maxContentLength: 10000000, // 10MB (adjust as needed)
})

// Create interceptor for response and request.
axiosInstance.interceptors.request.use(
    // It take two call back functions i.e Success and failure.  These function takes arguments.
    function (config){
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function  (response){
        // stop global loader here.
        return processResponse(response);
    },
    
    function (error){
        // Stop global loader here.
        return Promise.reject(processError(error));
    }
)
////////////////////////
// if Success -> return {isSuccess : true , data : object , code : int-200 }
//  if fail  -> return { isFailure : true , status: String , msg: string , code: int-}
////////////////////////

const processResponse =(response)=>{
    if(response?.status === 200){
        return {isSuccess : true , data : response.data}
    }else{
        return {
            isFailure:true,
            status:response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

////////////////////////
// if Success -> return {isSuccess : true , data : object , code : int-200 }
//  if fail  -> return { isFailure : true , status: String , msg: string , code: int-}
////////////////////////
const processError =(error)=>{
    if(error.response){
        // Request made and server respond with other status that fall out of the range of 2.x.x
        console.log('Error in response: ' , error.toJSON());
        return {
            isError:true,
            message: API_NOTICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request){
        //Request made but no respond received.
        console.log('Error in request: ' , error.toJSON());
        return {
            isError:true,
            message: API_NOTICATION_MESSAGES.requestFailure,
            code: ""
        }
    }else{
        //Something happend in setting up request that trigger an error.
        console.log('Error in Network: ' , error.toJSON());
        return {
            isError:true,
            message: API_NOTICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for(const [key , value] of Object.entries(SERVICE_URL)){
    API[key] = (body , showUploadProgress , showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data:body,
            responseType:value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value , body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };