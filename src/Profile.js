import React from 'react';
// import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Profile.css'
import ProfileForm from './ProfileForm'


function Profile() {
    return (
        <div class="container" >
            <Card id="myProfile" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>My Profile</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <ProfileForm />
                    <div className="btn-container justify-content-end">
                        <Button variant="light">Update</Button>
                    </div>
                </Card.Body>
            </Card>

            <Card id="volunteer" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title >Volunteer</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <ProfileForm />
                    <div className="btn-container justify-content-end">
                        <Button variant="light">Update</Button>
                    </div>
                </Card.Body>
            </Card>
        </div >
    )
}

export default Profile;