// import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Profile.css'
import ProfileForm from './ProfileForm'
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Profile() {


    const [location, cLocation] = useState("Abbeydale Golf Club2.0 - Sheffield");
    const [users, cUsers] = useState(
        {
            username: "Jonny5",
            firstName: "Johnathan",
            surname: "Smith",
            location: [
                "Abbeydale Golf Club - Sheffield",
                "Coxmoor Golf Club - Nottinghamshire",
                "Matfen Hall - Matfen Village",
                "Mearns Castle Golf Academy - Newton Mearns",
                "Millfield Golf Club - Lincolnshire",
                "N1 Golf - Morpeth",
                "Stirling Golf Club - Stirlingshire",
                "Whitecraigs Golf Club - East Renfrewshire"
            ],

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
        cUsers(updatedState)
    }
    const handleDropdownChanger = (e) => {
        cLocation(e)
    }
    const handleSubmit = () => {
        console.log("submitting form data")
        showSuccess();

    }

    return (
        <div className="profile-container" >
            <Card id="myProfile" className="profile-card" style={{ width: '30rem' }}>
                <Card.Body className="profile-card-body">
                    <Card.Title className="profile-card-title">My Profile</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

                    <form className="cardFormContainer">
                        <div className="form-group row">
                            <label
                                form="inputemail3"
                                className="col-sm-3 col-form-label">Username
                            </label>
                            <div className="col-sm-9">
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
                            <div className="col-sm-9">
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
                            <div className="col-sm-9">
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



                        <Dropdown className="form-group row profile-drowdown" >
                            <label
                                form="inputLocation3"
                                className="col-form-label col-sm-3">
                                <DropdownButton
                                    className="dropdownButton col-sm-12"
                                    title="Location."
                                    onSelect={(e) => handleDropdownChanger(e)}
                                    style={{ backgroundColor: '#ccdddd', border: "1px solid " }}>
                                    <Dropdown.Item eventKey={users.location[0]}>{users.location[0]}</Dropdown.Item>

                                    <Dropdown.Item eventKey={users.location[1]} href="#">{users.location[1]}</Dropdown.Item>
                                    <Dropdown.Item eventKey={users.location[2]} href="#">{users.location[2]}</Dropdown.Item>
                                    <Dropdown.Item eventKey={users.location[3]} href="#">{users.location[3]}</Dropdown.Item>
                                    <Dropdown.Item eventKey={users.location[4]} href="#">{users.location[4]}</Dropdown.Item>
                                    <Dropdown.Item eventKey={users.location[5]} href="#">{users.location[5]}</Dropdown.Item>
                                    <Dropdown.Item eventKey={users.location[6]} href="#">{users.location[6]}</Dropdown.Item>
                                    <Dropdown.Item eventKey={users.location[7]} href="#">{users.location[7]}</Dropdown.Item>

                                </DropdownButton>
                            </label>
                            <div className="col col-sm-9 dropdownOffsetCol justify-content-left">
                                <input
                                    type="surname"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputSurname3"
                                    name="surname"
                                    value={location}>
                                </input>
                            </div>
                        </Dropdown>

                        {/* </div> */}
                        {/* <div className="col-sm-9">
                                <input
                                    type="location"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputLocation3"
                                    name="location"
                                    value={users.location}>
                                </input>
                            </div> */}




                        <div className="form-group row">
                            <label
                                form="inputEmail3"
                                className="col-sm-3 col-form-label">Email
                            </label>
                            <div className="col-sm-9">
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
                            <div className="col-sm-9">
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
                            <Button className = 'button-profile' onClick={() => handleSubmit()} variant="light">Update</Button>
                            <ToastContainer position='bottom-center' />
                        </div>
                    </form >

                </Card.Body>
            </Card>


        </div >
    )
}

export default Profile;