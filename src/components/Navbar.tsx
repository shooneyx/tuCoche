import styled from '@emotion/styled';
import { Link } from 'react-router';

const Nav = styled.nav`
    background-color: #5CBEFF;
    color: #ffff;
`

function Navbar(){
    return(
        <>
            <Nav>
                <Link to="/coches">Coches</Link>
                <Link to="/usuarios">Usuarios</Link>
            </Nav>
            
        </>
    )
}
export default Navbar;