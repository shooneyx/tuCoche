import { Link } from 'react-router';

function Navbar(){
    return(
        <>
            <nav>
                <Link to="/coches">Coches</Link>
                <Link to="/usuarios">Usuarios</Link>
            </nav>
            
        </>
    )
}
export default Navbar;