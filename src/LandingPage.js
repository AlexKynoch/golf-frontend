import React from 'react';
import { Container } from 'react-bootstrap';
import './LandingPage.css'
import Image from 'react-bootstrap/Image'
import NavBar from "./NavBar"

function LandingPage(props) {
    const links = [
        { name: "Customer", url: "/login/user" },
        { name: "Volunteer", url: "/login/volunteer" },
        { name: "Admin", url: "/login/admin" },
    ]

    return (
        <div>
            <div className="navOffset">
                <NavBar links = {links} client = {props.client} landing = {true}/>
            </div>
            <div className="landing-text">
                <h1><i>“Our lives begin to end when we become silent about the things that really matter in life”</i>. <b>Dr Martin Luther King.</b></h1>
            </div>
            <Container >
                <Image className="Landing-image" src={process.env.PUBLIC_URL + "/crowd-wave.jpg"} />
            </Container>

            <div className="landing-text">
                <p><h2><b>Volunteering</b></h2>

                    <h3>Volunteers who want to give something back to their local community through sport are the types of people we are interested in recruiting.

                        Our “golf buddy” role means you get the chance to make a difference to people’s lives whilst enjoying a sport you love.

                        For a full list of volunteer opportunities and venues, please visit our website</h3></p><br />

                <h2><b>Members</b></h2>

                <p><h3>We are always looking to support more families with our golf sessions.The good news is that no previous golf experience is required to get involved.

                    So, if you, or someone you know is looking for a service that supports carers and people diagnosed with dementia simultaneously, then our services could be the perfect match.</h3></p>

            </div>
        </div>
    )
}

export default LandingPage

