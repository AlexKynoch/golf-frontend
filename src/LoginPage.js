import React from 'react'
import NavBar from "./NavBar"

export default function LoginPage() {
    const links = [
        true,
        { name: "Customer", url: "/loginpage" },
        { name: "Volunteer", url: "/loginpage" },
        { name: "Admin", url: "/loginpage" },
        { name: "Home", url: "/landingpage" },
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
