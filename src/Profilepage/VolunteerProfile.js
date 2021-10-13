import Profile from "./Profile"
import PPVolunteer from "./PPVolunteer"
import "./VolunteerProfile.css"
import "./Profile.css"
import NavBar from "../NavBar"
import ChangePassword from "./ChangePassword"
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function VolunteerProfile(props) {
  const links = [
    false,
    { name: "Calendar", url: "/volunteer/calendar" },
    { name: "Profile", url: "/volunteer/profile" }
  ]

  return (
    <div className="row volunteerDashboardRow">
      <div className="navOffset">
        <NavBar links={links} client={props.client} />
      </div>
      <Container fluid>
        <Row >
          <Col lg={8} className='volunteerDashboardCol'>
            <Profile client={props.client} currentUser = {props.currentUser}/>
          </Col>
          <Col lg={4} className='volunteerDashboardCol'>
            <PPVolunteer client={props.client} currentUser = {props.currentUser}/>
          </Col>
        </Row>
        <Row>
          <Col >
            <ChangePassword client={props.client} currentUser={props.currentUser} />
          </Col>
        </Row>
      </Container>
    </div>

  )
}

export default VolunteerProfile


