import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import './NavBar.css'
import navImg from "./images/logo.png"


const NavBar = () => {

  function logout() {
    // console.log("im the logout function")
  }
  return (
    <>

      <Navbar>
        <Container>

          <Navbar.Brand href="/">
            <img src={navImg}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">



            <Nav className="justify-content-end me-auto" activeKey="/home" style={{ width: "100%" }}>
              {/* <Nav.Item>
              <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item> */}
              <Nav.Item>
                <Nav.Link href="./Calendar">Calendar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="./Profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={logout}>Log Out
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



    </>
  );
};

export default NavBar;