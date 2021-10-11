import React from 'react'
import NavBar from '../../NavBar'

function UserRegister(props) {
    const links = [
        false,
        { name: "Calendar", url: "/admin" },
        { name: "Register a customer", url: "admin/register-customer" },
        { name: "Log Out", url: "/home" },
    ]

    return (
        <div>
            <div className="navOffset">
                <NavBar links={links} />
            </div>
            UserRegister 
        </div>
    )
}

export default UserRegister