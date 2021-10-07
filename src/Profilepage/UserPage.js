import React from 'react'
import NavBar from '../NavBar'

function PPUser() {
    const links = [
        false,
        { name: "Calendar", url: "/volunteer/calendar" },
        { name: "Profile", url: "/volunteer/profile" },
        { name: "Log Out", url: "/landingpage" },

    ]
    return (
        <div>
            <div className="navOffset">
                <NavBar links={links} />
            </div>
            User Page
        </div>
    )
}

export default PPUser