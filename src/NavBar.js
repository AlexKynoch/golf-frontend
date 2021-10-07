import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import './NavBar.css'
import navImg from "./images/logo.png"
import { Link } from 'react-router-dom'

function NavBar(props) {
  console.log(props)

  function logout() {
    // console.log("im the logout function")
  }
  
  return (
    <>
      <Navbar>
        <Container className="navbarContentContainer">
          <Navbar.Brand href="/">
            <img src={navImg}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end me-auto" activeKey="/home" style={{ width: "100%" }}>
              {/* <Nav className="justify-content-xl-evenly" activeKey="/home" style={{ width: "100%" }}> */}
              {/* <Link className = 'custom-nav-item nav-link' to = '/cga/dashboard'>
              Dashboard
              </Link>
              <Link className = 'custom-nav-item nav-link' to = '/cga/create-session'>
              Create session
              </Link>
              <Link className = 'custom-nav-item nav-link' to = '/cga/view-users'>
              View users
            </Link> */}
              <Nav.Item >
                {props.links[0] ?
                  "Log in as:" : null
                }
              </Nav.Item>
              {props.links.slice(0).map((v, i) => {
                console.log(v)
                return (
                  <Link key={i} className='custom-nav-item nav-link' to={v.url}>
                    {v.name}
                  </Link>
                )
              })}
              {/* <Link className='custom-nav-item nav-link' to='/volunteer/calendar'>
                    Calendar
                  </Link>
              <Link className='custom-nav-item nav-link' to='/volunteer/profile'>
                Profile
              </Link>
              <Link className='custom-nav-item nav-link' onClick={logout}>
                Log Out
              </Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </>
  );
};

export default NavBar;

