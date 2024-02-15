
import { Box,Typography,styled } from "@mui/material";

// Css for Background Image and content
const Image = styled(Box)`
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55%  repeat-x #000;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
// css for Heading (BLOG);
const Heading = styled(Typography)`
    font-size:70px;
    color: #FFFFFF;
    line-height: 1;
    // &> p{
    //     font-size: 20px;
    //     color: #000;
    //     background: #FFFFFF;
    // }
`;
// css for sub-Heading(Anything  You Want)
const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner =()=>{
    return(
        <Image>
            <Heading>Writer's Hub</Heading>
            <SubHeading>Read_Write_Blog</SubHeading>
        </Image>
    )
};

export default Banner;