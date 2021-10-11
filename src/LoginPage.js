import React from 'react'
import NavBar from "./NavBar"

export default function LoginPage() {
    const links = [
        true,
        { name: "Customer", url: "/login" },
        { name: "Volunteer", url: "/login" },
        { name: "Admin", url: "/login" },
        { name: "Home", url: "/home" },
    ]
    return (
        <div>
            <div className="navOffset">
                <NavBar links={links} />
            </div>
            Landing Page
        </div>
    )
}
