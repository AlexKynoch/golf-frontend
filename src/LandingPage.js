import React from 'react';
import { Container } from 'react-bootstrap';
import './LandingPage.css'

import Image from 'react-bootstrap/Image'

const LandingPage = () => {

    // function logout() {
    //     // console.log("im the logout function")
    // }
    return (
        <>
            <Container >

                <Image className="Landing-image" src={process.env.PUBLIC_URL + "/crowd-wave.jpg"} />

                {/* <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorum! Autem adipisci culpa, incidunt quasi inventore quia delectus id suscipit modi. Nobis, ex repudiandae? Vero recusandae voluptatum consectetur doloremque praesentium!</h2> */}

            </Container>

            {/* <div className="row volunteerDashboardRow">
        <div className="col volunteerDashboardCol"><Profile /></div>
        <div className="col volunteerDashboardCol"><PPVolunteer /></div>
      </div> */}



        </>
    )
}

export default LandingPage

