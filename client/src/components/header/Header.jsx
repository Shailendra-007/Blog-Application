import { AppBar , Toolbar, styled  } from "@mui/material";
import { Link } from "react-router-dom";

// AppBar css
const Component = styled(AppBar)`
    background: #ffffff;
    color: #000;
`
// Toolbar css and Link
const Container = styled(Toolbar)`
    justify-content: center;
    &> a{                 // Link give a anchor tag(a); 
        padding:20px;
        color: #000;
        text-decoration: none;
    }
`

const Header = () =>{
    return (
         <Component>
            <Container>
                <Link to='/'>Home</Link>
                <Link to='/About'>About</Link>
                <Link to='/contact'>Contact us</Link>
                <Link to='/login'>Logout</Link>
            </Container>
         </Component>

    )
}


export default Header;