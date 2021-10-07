import React from 'react'
import UserCalendar from "./UserCalendar"
import NavBar from '../../NavBar'

function UserPage(props) {
    const links = [
        false,
        { name: "Calendar", url: "/customer/calendar" },
        { name: "Profile", url: "/customer/profile" },
        { name: "Log Out", url: "/home" },

    ]
    return (
        <div>
            <div className="navOffset">
                <NavBar links={links} />
            </div>
                <UserCalendar client={props.client} />
        </div>
    )
}

export default UserPage