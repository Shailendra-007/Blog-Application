
import { useState, useEffect , useContext } from "react";

import { Box , styled, FormControl, InputBase, Button, TextareaAutosize} from "@mui/material";
// Mui icon pacakage (npm i @mui/icons-material)
import { AddCircle  as Add } from '@mui/icons-material';

import { useLocation,useNavigate } from 'react-router-dom';

import { DataContext } from "../../context/DataProvider";
import { API } from "../../services/api" 

const Container = styled(Box)`
    margin: 50px 100px;
`;


// if we use an Html tag element we have to treat as a object for react. 
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display:flex;
    flex-direction: row;
`;
const StyledInputBase = styled(InputBase)`
    flex:1;
    margin: 0px 30px;
    font-size: 25px;
`;
const TextArea = styled(TextareaAutosize)`
    margin-top:50px;
    width: 100%;
    font-size: 18px;
    border: none;
    &: focus-visible{
        outline: none;
    }
`;

// Initial object to describe how API-Object is appear for Create-Post.
const initialPost ={
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate : new Date()   // From date class
}
const Update = () =>{
    // const navigate = useNavigate();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [post,setPost] = useState(initialPost);
    const [file,setFile] = useState('');
    
    const {account} = useContext(DataContext);
    
    const url = post.picture? post.picture: "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    // useEffect:- It is used to handle the image and username for create post. Ittake two arguments first arrow function ans second when we have to call the function.
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                try {
                    const response = await API.uploadFile(data);
                    // Update the post state with the image URL
                    post.picture = response.data;
                } catch (error) {
                    // Handle any potential errors here
                    console.error("Error uploading image:", error);
                }
                // const response = await API.uploadFile(data);
                // post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file]) // For to chose multiple file we pass file as a second argument.

    const handleChange =(e)=>{
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const savePost = async ()=>{
        // it will save the post and we useNavigate to render in home page.
        let response = await API.createPost(post); 
        if(response.isSuccess){
            navigate('/');
        }
    }

    return(
        <Container>
            <Image src={url}  alt="Post" />
            <StyledFormControl>
                {/* label Htmlfor take file as a Input */}
                <label htmlFor="fileInput">
                    < Add fontSize="large" color="action" />
                </label>
                <input 
                    type="file" 
                    id="fileInput"  
                    style={{display: 'none'}}
                    onChange={(e)=> {setFile(e.target.files[0])}}
                    // e.target.files is an array and set the value to 0 index where the file Store.We alse store multiple files in it.
                />
                <StyledInputBase placeholder="Title"  onChange={(e) => {handleChange(e)}} name="title"/>
                <Button variant="contained" onClick={() => savePost()}>Publish</Button>
            </StyledFormControl>

            <TextArea
                minRows={5}
                placeholder="Tell your Thoughts...."
                name="description"
                onChange={(e) => {handleChange(e)}}
            />
        </Container>
    )
}

export default Update;


// Form control  -Take all Photo or Text to publish.