import React, { useState, useEffect } from 'react'
import Profile from "./../../Profilepage/Profile"
import NavBar from '../../NavBar'
import ChangePassword from "./../../Profilepage/ChangePassword"


function UserProfile(props) {
  const links = [
    false,
    { name: "Calendar", url: "/customer/calendar" },
    { name: "Profile", url: "/customer/profile" }
  ]
  
  return (
    <div>
      <div className="navOffset">
        <NavBar links={links} client={props.client} />
      </div>
      <div><Profile client={props.client} currentUser={props.currentUser} /></div>
      <div><ChangePassword client={props.client} currentUser={props.currentUser} /></div>
    </div>
  )
}

export default UserProfile