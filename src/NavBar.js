import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import './NavBar.css'
import navImg from "./images/logo.png"
import { Link } from 'react-router-dom'

function NavBar(props) {
  let history = useHistory()

  function logout() {
    props.client.logout()
    history.push('/home')
  }
  
  return (
    <>
      <Navbar>
        <Container className="navbarContentContainer">
          <Navbar.Brand href="/">
            <img src = {navImg} alt = 'Golf in Society logo'></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end me-auto" activeKey="/home" style={{ width: "100%" }}>
              <Nav.Item >
                {props.links[0] ?
                <div className='custom-nav-item nav-link'>Log in as:</div>
                : null      
                }
              </Nav.Item>
              {props.links.slice(0).map((v, i) => {
                return (
                  <Link key={i} className='custom-nav-item nav-link' to={v.url}>
                    {v.name}
                  </Link>
                )
              })}
              { !props.landing ?
              <Nav.Item >
                {/* <div className = 'logout-btn-parent'> */}
                <div className='custom-nav-item nav-link logout-text' onClick = {() => logout()}>Log out</div>
                {/* </div> */}
              </Nav.Item>
              : ' '
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </>
  );
};

export default NavBar;

