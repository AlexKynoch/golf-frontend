import React, { useState, useEffect } from 'react'
import Profile from "./../../Profilepage/Profile"
import NavBar from '../../NavBar'
import ChangePassword from "./../../Profilepage/ChangePassword"


function UserProfile(props) {
  const userId = "615d7fb42d2b095a0593e6d7"
  const [user, cUser] = useState({ availability: [] })

  const links = [
    false,
    { name: "Calendar", url: "/customer/calendar" },
    { name: "Profile", url: "/customer/profile" },
    { name: "Log Out", url: "/home" }
  ]

  useEffect(() => {
    props.client.getUser(userId).then((res) => {cUser(res.data)})
  }, [])


  return (
    <div>
      <div className="navOffset">
        <NavBar links = {links} client = {props.client} />
      </div>



      <div><Profile activeUser={user} client={props.client} currentUser = {props.currentUser}/></div>
      <div><ChangePassword client={props.client} currentUser = {props.currentUser}/></div>
    </div>
  )
}

export default UserProfile