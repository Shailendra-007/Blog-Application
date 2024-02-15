import { Button, Table, TableBody, TableHead, TableRow, TableCell, styled } from "@mui/material"
import { Link , useSearchParams } from "react-router-dom";

import { AllCategories } from "../../constants/data";

const StyledTable = styled(Table)`
    border: 1px solid rgba( 224 ,224 , 224 ,1);
`
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #ffffff;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const Categories =()=>{
    // To get category value we use custom hook-useSearchParams. After ? in url called SearchParams in browser.
    const[searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return(
        <>
            {/*on Click to create blog we render to create page so here use Link tag to render it */}
            <StyledLink to={`/create?categories=${category || ''}` }>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to='/'>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        // Looping all the category with the help of map function.
                        AllCategories.map(category =>(
                            <TableRow  key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;