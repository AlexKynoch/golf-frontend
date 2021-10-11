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

  const [userId, setUserId] = useState("615d7fb42d2b095a0593e6d7");
  const [user, cUser] = useState({ availability: [] })

  const links = [
    false,
    { name: "Calendar", url: "/volunteer/calendar" },
    { name: "Profile", url: "/volunteer/profile" },
    { name: "Log Out", url: "/home" },
  ]

  useEffect(() => {
    // Update the document title using the browser API
    props.client.getUser(userId)
      .then((res) => {
        console.log(res);
        cUser(res.data)
        // cRadios(res.data[0]['availability'])
      })
  }, []);

  return (
    <div className="row volunteerDashboardRow">
      <div className="navOffset">
        <NavBar links={links} />
      </div>
      <div className="col volunteerDashboardCol"><Profile activeUser={user} client={props.client} /></div>
      <div className="col volunteerDashboardCol"><PPVolunteer activeUser={user} client={props.client} /></div>
      <Container>
        <Row>
          <div className="col volunteerDashboardCol">
            <ChangePassword client={props.client} />
          </div>
        </Row>
      </Container>
    </div>    

  )
}

export default VolunteerProfile



