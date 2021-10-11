import React from 'react'
import NavBar from "./NavBar"

function LandingPage() {
    const links = [
        { name: "Customer", url: "/login" },
        { name: "Voluneer", url: "/login" },
        { name: "Admin", url: "/login" },
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

export default LandingPage