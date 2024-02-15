// Api_NOTIFICATION_MESSAGES


export const API_NOTICATION_MESSAGES = {
    loading:{
        title:'loading...',
        message: 'Data is loading'
    },
    success:{
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message: 'An error occured while fetching response from server.Please Try Again.'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data.Please Try Again.'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect with the server. Please check internet connectivity or try again later '
    }

};
//API service call
// service request
// Need service call : {url : '/' , method: 'POST/GET/PUT/DELETE', params: true/false(bydefault) , query: true/false}
 
export const SERVICE_URL = {
    userSignup: {url:'/signup' , method: 'POST'},
    userLogin: { url:'/login' , method: 'POST'},
    uploadFile: {url:'/file/upload' , method: 'POST'},
    createPost: {url:'create' , method: 'POST'},

    getAllPosts: {url:'/posts' , method:'GET', params:true },
    getPostById: {url: 'post' , method:'GET' , query:true }
};