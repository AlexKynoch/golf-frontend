import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import './NavBar.css'
import navImg from "./images/logo.png"
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import VolunteerCalendar from "./Calendar/VolunteerCalendar"
import VolunteerProfile from "./Profilepage/VolunteerProfile"

function NavBar(props) {

  function logout() {
    // console.log("im the logout function")
  }
  return (
    <>
    <Router>
      <Navbar className="navbar">
        <Container className="navbarContentContainer">
          <Navbar.Brand href="/">
            <img src={navImg}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end me-auto" activeKey="/home" style={{ width: "100%" }}>
              {/* <Nav className="justify-content-xl-evenly" activeKey="/home" style={{ width: "100%" }}> */}
              {/* <Nav.Item>
              <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item> */}
            <Link className = 'custom-nav-item nav-link' to = '/calendar'>
              Calendar
            </Link>
            <Link className = 'custom-nav-item nav-link' to = '/profile'>
              Profile
            </Link>
            <Link className = 'custom-nav-item nav-link' onClick={logout}>
              Log Out
            </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Switch>
          <Route path = '/calendar'>
            <VolunteerCalendar client = {props.client} />
          </Route>
          <Route path = '/profile'>
            <VolunteerProfile />
          </Route>
          <Route exact path = '/'>
            <VolunteerCalendar client = {props.client} />
          </Route>
          <Route path = '/'>Error: 404 not found</Route>
        </Switch>
      </Container>
    </Router>
    </>
  );
};

export default NavBar;