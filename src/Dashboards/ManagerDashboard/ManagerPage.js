import React from 'react'
import NavBar from '../../NavBar'

function ManagerPage() {
    const links = [
        false,
        { name: "Dashboard", url: "/manager" },
        { name: "Log Out", url: "/home" },
    ]

    return (
        <div>
            <div className="navOffset">
            <NavBar links={links} />
            </div>
            <div>Manager page</div>
        </div>
    )
}

export default ManagerPage
