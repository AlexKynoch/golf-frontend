
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const showSuccess = () => {
    toast.success("Your details have been updated");
};

const handleSubmit = () => {
    console.log("submitting form data")
    showSuccess();
}

function ChangePassword() {
    return (
        // <div className="changePassword-container" >
        //     <Card id="changePassword" className="changePassword-card" style={{ width: '30rem' }}>
        //         <Card.Body className="pchangePassword-card-body">
        //             <Card.Title className="changePassword-card-title">Change Password</Card.Title>
        //             <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <div className="profile-container" >
            <Card id="ChangePassword" className="profile-card" style={{ width: '30rem' }}>
                <Card.Body className="profile-card-body">
                    <Card.Title className="profile-card-title">Change</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>


                    <form>
                        <div className="form-group row changePassword">

                            <label form="inputUsername3" className="col-sm-12 col-form-label">Change Password</label>
                            <div className="col-sm-12">
                                <input type="username" className="form-control" id="inputUsername3" placeholder="New Password"></input>
                            </div><br />
                        </div>
                        <div className="form-group row">
                            <label form="inputFirstName3" className="col-sm-12 col-form-label">Confirm New Password</label>
                            <div className="col-sm-12">
                                <input type="firstname" className="form-control" id="inputFirstName3" placeholder="Confirm Password"></input>
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

export default ChangePassword