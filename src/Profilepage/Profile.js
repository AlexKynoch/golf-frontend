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

function Profile(props) {

    const [locations, cLocations] = useState([])
    const [userId, setUserId] = React.useState("615d7fb42d2b095a0593e6d7")
    const [location, cLocation] = useState()
    const [users, cUsers] = useState(
        {
            userName: "Jonny5",
            nameFirst: "Johnathan",
            nameLast: "Smith",
            location: "testLocation",
            email: "jojosmith@hotmail.com",
            phone: "07778574321"
        }
    )

    useEffect(() => {
        if (!props.activeUser) {
            return;
        }
        console.log(props.activeUser)
        const { availability, details, email, location, nameFirst, nameLast, password, phone, role, toke, userName } = props.activeUser
        cUsers(
            {
                userName,
                nameFirst,
                nameLast,
                location,
                email,
                phone
            }
        )
    }, [props.activeUser]);

    const showSuccess = () => {
        toast.success("Your details have been updated");
    };

    const handleChange = (e) => {
        const updatedState = { ...users }
        updatedState[e.target.name] = e.target.value
        cUsers(updatedState)
        console.log(e.target.value, e.target.name);
    }

    const handleDropdownChanger = (e) => {
        cLocation(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.client.updateUser(
            userId,
            {
                userName: users.userName,
                nameFirst: users.nameFirst,
                nameLast: users.nameLast,
                location: location,
                email: users.email,
                phone: users.phone,
            }
        )
            .then(() => {
                showSuccess()

            })
            .catch(() => {
                alert('an error occured, please try again')

            })
    }

    useEffect(() => {
        // Update the document title using the browser API
        props.client.getLocations()
            .then((res) => {
                const newArray = res.data.map((location) => {
                    return (location.locationName)
                })
                console.log(newArray);
                cLocations(newArray);
                // cUsers(res.data[0]['locationName'])
            })
    }, []);

    return (
        <div className="profile-container" >
            <Card id="myProfile" className="profile-card" >
                <Card.Body className="profile-card-body">
                    <Card.Title className="profile-card-title">My Profile</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

                    <form className="cardFormContainer">
                        <div className="form-group row">
                            <label
                                form="inputemail3"
                                className="col-sm-12 col-lg-3 col-form-label">Username
                            </label>
                            <div className="col-sm-12 col-lg-9">
                                <input
                                    type="username"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputUsername3"
                                    name="userName"
                                    value={users.userName}>
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
                                    name="nameFirst"
                                    value={users.nameFirst}></input>
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
                                    name="nameLast"
                                    value={users.nameLast}>
                                </input>
                            </div>
                        </div>
                        <Dropdown className="form-group row profile-drowdown" >
                            <label
                                form="inputLocation3"
                                className="col-form-label col-sm-5">
                                <DropdownButton
                                    className="dropdownButton col-sm-12"
                                    title="Location."
                                    onSelect={(e) => handleDropdownChanger(e)}

                                    style={{ backgroundColor: '#ccdddd' }}>

                                    {locations.map((location) => {
                                        return <Dropdown.Item eventKey={location}>{location}</Dropdown.Item>
                                    })}

                                </DropdownButton>
                            </label>


                            <div className="col col-sm-7 dropdownOffsetCol justify-content-left">
                                <input
                                    type="surname"
                                    onInput={(e) => handleChange(e)}
                                    className="form-control"
                                    id="inputSurname3"
                                    name="location"
                                    value={location}>
                                </input>
                            </div>
                        </Dropdown>

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

                            <Button className='button-profile' onClick={(e) => handleSubmit(e)} variant="light">Update</Button>

                            <ToastContainer position='bottom-center' />
                        </div>
                    </form >

                </Card.Body>
            </Card>


        </div >
    )
}

export default Profile;