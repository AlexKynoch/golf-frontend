import React from 'react';
// import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Profile.css'


function Profile() {
    return (
        <div class="container" >
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    {/* <Card.Link href="#">Update</Card.Link> */}
                </Card.Body>
                <div className="btn-container">
                    <Button variant="light">Light</Button>
                </div>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    {/* <Card.Link href="#">Update</Card.Link> */}
                </Card.Body>
                <div className="btn-container">
                    <Button variant="light">Light</Button>
                </div>
            </Card>

        </div>
    )
}

export default Profile;