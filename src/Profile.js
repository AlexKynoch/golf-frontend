
// import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Profile.css'
import ProfileForm from './ProfileForm'
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


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


    const showSuccess = () => {
        toast.success("Your details have been updated");
    };


    // userInfo = [...users];
    const handleChange = (e) => {

        const updatedState = { ...users }

        updatedState[e.target.name] = e.target.value
        // name === "username"
        // updatedState["username"] === updated.usernname
        // name === "email"
        // updatedState["email"] === updated.email

        cUsers(updatedState)

        console.log(e.target.value);


        // obj = { key: 1, value : 2}
        // obj.key === 1

        // if(true){
        //let string = "key"
        // obj[string]==== obj["key"] ==== obj.key === 1
        // }
        //let string = "value"
        // obj[string]==== obj["value"] ==== obj.value === 2
        // }
    }
    const handleSubmit = () => {
        console.log("submitting form data")
        showSuccess();
    }

    return (
        <div className="container" >
            <Card id="myProfile" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>My Profile</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>

                    <form>
                        <div className="form-group row">
                            <label
                                form="inputemail3"
                                className="col-sm-3 col-form-label">Username
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="username"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputUsername3"
                                    name="username"
                                    value={users.username}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                form="inputFirstName3"
                                className="col-sm-3 col-form-label">First Name
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="firstname"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputFirstName3"
                                    name="firstName"
                                    value={users.firstName}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                form="inputSurname3"
                                className="col-sm-3 col-form-label">Surname
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="surname"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputSurname3"
                                    name="surname"
                                    value={users.surname}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                form="inputLocation3"
                                className="col-sm-3 col-form-label">Location
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="location"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputLocation3"
                                    name="location"
                                    value={users.location}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                form="inputEmail3"
                                className="col-sm-3 col-form-label">Email
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputEmail3"
                                    name="email"
                                    value={users.email}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                form="inputPhone3"
                                className="col-sm-3 col-form-label">Phone
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="phone"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputPhone3"
                                    name="phone"
                                    value={users.phone}>
                                </input>
                            </div>
                        </div>


                        <div className="btn-container justify-content-end">
                            <Button onClick={() => handleSubmit()} variant="light">Update</Button>
                            <ToastContainer position='bottom-center' />
                        </div>
                    </form >

                </Card.Body>
            </Card>


        </div >
    )
}

export default Profile;