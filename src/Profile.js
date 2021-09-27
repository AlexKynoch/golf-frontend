
// import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Profile.css'
import ProfileForm from './ProfileForm'
import React, { useState, useEffect } from "react"



function Profile() {



    const [users, cUsers] = useState(
        {
            username: "Jonny5",
            firstName: "Johnathan",
            surname: "Smith",
            location: "Sheffield",
            email: "jojosmith@hotmail.com",
            phone: "07778574321"
        }
    )

    // userInfo = [...users];
    console.log(users)

    return (
        <div className="container" >
            <Card id="myProfile" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>My Profile</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>

                    <form>
                        <div className="form-group row">
                            <label form="inputUsername3" className="col-sm-3 col-form-label">Username</label>
                            <div className="col-sm-8">
                                <input type="username" className="form-control" id="inputUsername3" value={users.username}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label form="inputFirstName3" className="col-sm-3 col-form-label">First Name</label>
                            <div className="col-sm-8">
                                <input type="firstname" className="form-control" id="inputFirstName3" value={users.firstName}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label form="inputSurname3" className="col-sm-3 col-form-label">Surname</label>
                            <div className="col-sm-8">
                                <input type="surname" className="form-control" id="inputSurname3" value={users.surname}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label form="inputLocation3" className="col-sm-3 col-form-label">Location</label>
                            <div className="col-sm-8">
                                <input type="location" className="form-control" id="inputLocation3" value={users.location}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label form="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="inputEmail3" value={users.email}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label form="inputPhone3" className="col-sm-3 col-form-label">Phone</label>
                            <div className="col-sm-8">
                                <input type="phone" className="form-control" id="inputPhone3" value={users.phone}></input>
                            </div>
                        </div>


                    </form >

                    <div className="btn-container justify-content-end">
                        <Button variant="light">Update</Button>
                    </div>
                </Card.Body>
            </Card>


        </div >
    )
}

export default Profile;