import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Profile.css'
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Profile(props) {

    const [locations, cLocations] = useState([])
    const [userChange, cUserChange] = useState(undefined)
    const [location, cLocation] = useState(props.currentUser.location)
    const [users, cUsers] = useState(
        {
            userName: "",
            nameFirst: "",
            nameLast: "",
            location: "",
            email: "",
            phone: ""
        }
    )

    useEffect(() => {
        if (!props.currentUser) {
            return;
        }
        const { availability, details, email, location, nameFirst, nameLast, password, phone, role, token, userName } = props.currentUser
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
    }, [props.currentUser]);

    const showSuccess = () => {
        toast.success("Your details have been updated");
    };

    const handleChange = (e) => {
        const updatedState = { ...users }
        updatedState[e.target.name] = e.target.value
        cUsers(updatedState)
        console.log(e.target.value, e.target.name);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.client.updateUser(
            props.currentUser._id,
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
                props.client.getUser(props.currentUser._id)
                .then((response) => 
                    cUserChange(response.data))
            })
            .catch(() => {
                alert('an error occured, please try again')

            })
    }

    useEffect(() => {

        if (userChange) {
        window.localStorage.setItem('user', JSON.stringify(userChange))
        }  
    },[userChange])

    useEffect(() => {
        // Update the document title using the browser API
        props.client.getLocations()
            .then((res) => {
                const newArray = res.data.map((location) => {
                    return (location.locationName)
                })
                cLocations(newArray);
            })
    }, []);

    return (
        <div className="profile-container" >
            <Card id="myProfile" className="profile-card" style={{ maxWidth: '30rem' }}>
                <Card.Body className="profile-card-body">
                    <Card.Title className="profile-card-title">My Profile</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <form className="cardFormContainer" >
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
                        <div className='form-group row'>
                            <div className='col-sm-3 col-form-label'>
                                <label className='input-form-label' form='inputLocation' >Location</label>
                            </div>
                            <div className='col-sm-9'>
                                <select size='1' className='form-control' onChange={(e) => cLocation(e.target.value)} id='inputLocation' value={location} >
                                    <option value='default' disabled>-- select an option --</option>
                                    {locations.map((location) => (
                                        <option key={location} value={location} name="location">{location}</option>))}
                                </select>
                            </div>
                        </div>
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