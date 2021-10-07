import React from 'react'
import NavBar from "./NavBar"

function LandingPage() {
    const links = [
        { name: "CustomerLogin", url: "/loginpage" },
        { name: "VoluneerLogin", url: "/loginpage" },
        { name: "AdminLogin", url: "/loginpage" },
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