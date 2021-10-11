import React, { useState, useEffect } from 'react'
import Profile from "./../../Profilepage/Profile"
import NavBar from '../../NavBar'


function UserProfile(props) {
  const [userId, setUserId] = useState("615d7fb42d2b095a0593e6d7")
  const [user, cUser] = useState({ availability: [] })

  const links = [
    false,
    { name: "Calendar", url: "/customer/calendar" },
    { name: "Profile", url: "/customer/profile" },
    { name: "Log Out", url: "/home" },
  ]

  useEffect(() => {
    props.client.getUser(userId).then((res) => {cUser(res.data)})
  }, []);

  return (
    <div>
      <div className="navOffset">
        <NavBar links={links} />
      </div>
        <div><Profile activeUser={user} client={props.client} /></div>
    </div>
  )
}

export default UserProfile