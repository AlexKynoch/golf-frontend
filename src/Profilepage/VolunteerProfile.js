import Profile from "./Profile"
import PPVolunteer from "./PPVolunteer"
import "./VolunteerProfile.css"
import NavBar from "../NavBar"
import React, { useState, useEffect } from 'react'



function VolunteerProfile(props) {

  const [userId, setUserId] = useState("615d7fb42d2b095a0593e6d7");
  const [user, cUser] = useState({ availability: [] })

  const links = [
    false,
    { name: "Calendar", url: "/volunteer/calendar" },
    { name: "Profile", url: "/volunteer/profile" },
    { name: "Log Out", url: "/landingpage" },

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
    </div>
  )
}

export default VolunteerProfile



