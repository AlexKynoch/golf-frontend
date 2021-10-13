import Profile from "./Profile"
import PPVolunteer from "./PPVolunteer"
import "./VolunteerProfile.css"
import "./Profile.css"
import NavBar from "../NavBar"
import ChangePassword from "./ChangePassword"
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function VolunteerProfile(props) {

  const userId = props.currentUser._id
  const [user, cUser] = useState({ availability: [] })

  const links = [
    false,
    { name: "Calendar", url: "/volunteer/calendar" },
    { name: "Profile", url: "/volunteer/profile" }
  ]

  useEffect(() => {
    props.client.getUser(userId)
      .then((res) => {
        console.log(res);
        cUser(res.data)
      })
  }, [])

  return (
    <div className="row volunteerDashboardRow">
      <div className="navOffset">
        <NavBar links={links} client={props.client} />
      </div>
      <Container fluid>
        <Row >
          <Col lg={8} className='volunteerDashboardCol'>
            <Profile activeUser={user} client={props.client} />
          </Col>
          <Col lg={4} className='volunteerDashboardCol'>
            <PPVolunteer activeUser={user} client={props.client} />
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



