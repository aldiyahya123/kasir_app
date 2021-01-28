import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';


const NavbarComponent = () => {
    
    return (
        <div>
            <Navbar variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="#home"> <strong>Kasir App</strong> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent
