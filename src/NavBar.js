import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import './NavBar.css'


const NavBar = () => {
  return (
    <>
 <Navbar collapseOnSelect expand="sm" bg="primary" variant="light">
  <Container>
   <Navbar.Brand>
          <a class="navbar.brand" href="#"><img src="logo.svg"></img></a>
    
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">

    <Nav>
      <Nav.Link href="#deets">Calender</Nav.Link>
      <Nav.Link href="#deets">Profile</Nav.Link>   
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  );
};
  
export default NavBar;