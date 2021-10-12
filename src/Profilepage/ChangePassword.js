
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "../Profilepage/changePassword.css"

function ChangePassword(props) {


    const userId = "615d7fb42d2b095a0593e6d7";


    const showSuccess = () => {
        toast.success("Your details have been updated");
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const password1 = document.getElementById("password1").value;
        const password2 = document.getElementById("password2").value;
        console.log(password1);
        console.log(password2);

        if (password2 === password1) {
            props.client.updateUser(
                userId,
                {
                    password: password2,
                }
            )
                .then(() => {
                    showSuccess()

                })
                .catch(() => {
                    alert('an error occured, please try again')

                })
        }
    }


    return (
        <div className="profile-container" >
            <Card id="ChangePassword" className="profile-card" style={{ maxWidth: '50rem' }}>
                <Card.Body className="profile-card-body">
                    <Card.Title className="profile-card-title">Change password</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <form>
                        <div className="form-group row changePassword">
                            <label form="inputUsername3" className="col-sm-4 col-form-label">New Password</label>
                            <div className="col-lg-8">
                                <input type="password" className="form-control" name="password1" id="password1" placeholder="New Password"></input>
                            </div><br />
                        </div>
                        <div className="form-group row">
                            <label form="inputFirstName3" className="col-sm-4 col-form-label">Confirm New Password</label>
                            <div className="col-lg-8">
                                <input type="password" className="form-control" name="password2" id="password2" placeholder="Confirm Password"></input>
                            </div>
                        </div>
                        <div className="btn-container justify-content-end">
                            <Button onClick={(e) => handleSubmit(e)} variant="light">Update</Button>
                            <ToastContainer position='bottom-center' />
                        </div>
                    </form >
                </Card.Body>
            </Card>
        </div >


    )
}

export default ChangePassword