
import { useState,useEffect } from "react";

import { Box,Grid } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { API } from '../../../services/api';

// Components
import Post from "./post";

const Posts = () =>{

        const [posts ,setPosts] = useState([]);

        const [searchParams] = useSearchParams();
        const category = searchParams.get('category');

        //On landing to home page, api request call posts so it done by using useEffect.
        useEffect(() => {
            const fetchData = async () => { 
                try{
                let response = await API.getAllPosts({ category : category || '' });
                    if (response.isSuccess) {
                        setPosts(response.data);
                    }
                }catch (error) {
                    // Handle any potential errors here
                    console.error("Error in getting Posts:", error);
                }  
            }
            fetchData();
        }, [category]);

        return(
            <>
                {
                    posts && posts.length > 0 ? posts.map(post =>(
                        <Grid item lg={3} sm={4} xs={12}>
                            <Link to={`details/${post._id}`} style={{textDecoration:'none' , color:'inherit'}}>
                                <Post post ={post}/>
                            </Link>
                        </Grid>
                        
                    )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}> 
                            No data avaiable to show
                        </Box>
                }
            </>
        )
}

export default Posts;