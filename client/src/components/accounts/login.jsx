import { useState , useContext } from 'react';
import { Box,TextField,Button,styled, Typography  } from '@mui/material';
import { API } from '../../services/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Box aka div css
const Component = styled(Box)`
        width : 400px;
        margin : auto;
        box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

// Image css resize image
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display:'flex',
    padding: '50px 0 0'
});

// container css SignUp/Login
const Wrapper = styled(Box)`
        padding: 25px 35px;
        display:flex;
        flex: 1;
        flex-direction: column;
        &> div , &> button, &> p{   //parent to child css by using &> operator(Wrapper to div) , p for Typography(default)
            margin-top:20px ;
        } 
`;
//Login Button css
const LoginButton = styled(Button)`
        text-transform:none;
        background: #FB641B;
        color: #fff;
        height: 48px;
        border-radius: 2px;     
`;
// SignUp Button css
const SignupButton = styled(Button)`
        text-transform: none;
        background: #fff;
        color: #2874f0;
        height: 48px;
        border-radius: 2px;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
        font-size: 10px;
        color: #ff6161;
        line-height: 0;
        margin-top:10px;
        font-weight: 600;
`;
const Text = styled(Typography)`
        color:#878787;
        text-size:16px;
`;

// Create dummy object to set initial value of SignUp
const signupInitialValues = {
    name: '',
    username: '',
    password: ''
};
const loginInitialValues = {
    username:'',
    password:''
}

const Login = ( {isUserAuthenticated }) =>{
    const [account, toggleAccount] = useState('login');
    const [signup , setSignup] = useState(signupInitialValues);
    const [login , setLogin] = useState(loginInitialValues);
    const [error , setError ] = useState('');

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();    // Custom hook

    //Change state form Login to Signup or vice versa.
    const toggleSignup = () =>{
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    // onChange function called & store sign up value we enter. 
    // ...signup- do not override the values, everytime it will set to initial value of signUp.
    const onInputChange =(e)=>{
        // console.log(e.target.value , e.target.name);
        setSignup({ ...signup , [e.target.name]: e.target.value});
    };

    const signupUser = async ()=>{
        // eslint-disable-next-line
        // let response = await API.userSignup(signup);
        // if(response.isSuccess ){
        //     setError('');
        //     setSignup(signupInitialValues);
        //     toggleAccount('login');
        // }else{
        //     setError('Something went wrong.Try again');
        //     toggleAccount('signup');
        // }
        try {
            let response = await API.userSignup(signup);
        if(response.isSuccess ){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        }else{
            setError('Something went wrong.Try again');
            toggleAccount('signup');
        }
        } catch (error) {
            setError('Something went wrong.Try again');
            console.log(error);
        }
    };

    const onValueChange = (e)=>{
        setLogin({ ...login , [e.target.name]: e.target.value});
    }

    const loginUser = async ()=>{
        // let response = await API.userLogin(login);
        // console.log(response);
        // if(response.isSuccess ){
        //     setError('');
        // }else{
        //     setError('Something went wrong.Try again');
        // }
        try {
            let response = await API.userLogin(login);
            if(response.isSuccess ){
                setError('');
                sessionStorage.setItem('accessToken' , `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);

                // Set the name and username globaly by using useContext.
                setAccount({name:response.data.name , username:response.data.username})
                
                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            }else{
                setError('Something went wrong.Try again');
            }
        } catch (error) {
            setError('Something went wrong.Try again');
            console.log(error);
        }
    };

    // Create object of Image url
    const imageURL = 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png';

        return(
           <Component>
            <Box>
                <Image src={imageURL}  alt="Login"/>
                {   
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" onChange={(e)=> {onValueChange(e)}} name='username' label="Enter username"/>
                            <TextField variant="standard" onChange={(e)=> {onValueChange(e)}} name='password' label="Enter password"/>

                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={()=>{loginUser()}}>Login</LoginButton>
                            <Text style={{textAlign: 'center'}}> or </Text>
                            <SignupButton onClick={() =>{toggleSignup()}}>Create an account</SignupButton>
                        </Wrapper>
                    :    
                        <Wrapper>
                            <TextField variant="standard" onChange={(e)=> {onInputChange(e)}} name='name'     label="Name"/>
                            <TextField variant="standard" onChange={(e)=> {onInputChange(e)}} name='username' label="Enter username"/>
                            <TextField variant="standard" onChange={(e)=> {onInputChange(e)}} name='password' label="Enter password"/>

                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={() =>{signupUser()}}>Sign Up</SignupButton>
                            <Text style={{textAlign: 'center'}}> or </Text>
                            <LoginButton variant="contained" onClick={() =>{toggleSignup()}}>Already have an account</LoginButton>
                        </Wrapper>
                }   
            </Box>
           </Component>
        )
}

export default Login;