import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login")
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">Tamhacker</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">Tamhacker</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home page</NavLink>
                        <NavLink to="user" className="nav-link"> user</NavLink>
                        <NavLink to="admin" className="nav-link">Admin</NavLink>

                    </Nav>
                    <Nav>
                        <Button className='btn-login' onClick={() => {
                            handleLogin()
                        }}>Log in</Button>
                        <Button className='btn-signin' onClick={() => {
                            navigate("/signin")
                        }}>Sign in</Button>
                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">

                            <NavDropdown.Item href="#action/3.1">Log in</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Log out
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>

                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;