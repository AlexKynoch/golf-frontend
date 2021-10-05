import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './Cga.css'
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function CreateSession(props) {
    const [sessions, cSessions] = useState([])
    const [volunteers, cVolunteers] = useState([])
    const [location, cLocation] = useState('Leeds')
    const [disabled, cDisabled] = useState(false)
    // Abbeydale Golf Club - Sheffield
    const refreshList = () => {
        props.client.getSessions().then((response) => cSessions(response.data))
        props.client.getUserByRole('volunteer').then((response) => cVolunteers(response.data))
    }


    // return all registered volunteer names

    const sessionVolunteers = () => {
        let volunteerArray = []
        volunteers.forEach((volunteer) => {
            console.log(volunteer.location)
            if (volunteer.location === location) {
                volunteerArray.push(volunteer)
            }
        })
        return volunteerArray
    }

    // display message after new session submission

    const showSuccess = () => {
        toast.success("New session has been created")
    }

    // gets dropdown list value

    const getItemValue = (q) => {
        const e = document.getElementById(q)
        return e.options[e.selectedIndex].value
    }

    const submitHandler = (e) => {
        e.preventDefault()
        cDisabled(true)
        
        props.client.addSession(
            e.target.inputDate.value,
            getItemValue('inputVolunteer'),
            e.target.inputLocation.value,
            e.target.inputStartTime.value,
            e.target.inputFinishTime.value,
            getItemValue('inputUserLimit'),
            e.target.inputAdditionalDetails.value   
            )
        .then(() => {
        showSuccess()
        cDisabled(false)
        document.getElementById('sessionForm').reset()
        })
        .catch(() => {
        alert('an error occured, please try again')
        cDisabled(false)
        })
      }

      useEffect(() => {
        refreshList();
      }, [])
    return (
  
            <Card id="myProfile" className="profile-card cga-session-card" >
                <Card.Body className="profile-card-body">
                <Card.Title className="profile-card-title">Add new session</Card.Title>
                    <form className="cardFormContainer" id = 'sessionForm' onSubmit={(e) => submitHandler(e)}>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="input-form-label" form="inputDate" >Date<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className="col-sm-8">                           
                                <input className="form-control" type="date"  id="inputDate"  name="inputDate" placeholder="Date"></input> 
                            </div>      
                        </div>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="input-form-label" form="inputStartTime" >Start time<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className="col-sm-8">                           
                                <input className="form-control" type="time"  id="inputStartTime"  name="inputStartTime" placeholder="Start time"></input> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="input-form-label" form="inputFinishTime" >Finish time<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className="col-sm-8">                           
                                <input className="form-control" type="time"  id="inputFinishTime" name="inputFinishTime" placeholder="Finish time"></input> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="input-form-label" form="inputLocation" >Location<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className="col-sm-8">                           
                                <input className="form-control" type="text"  id="location" name="inputLocation" value = {location}></input> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="input-form-label" form="inputUserLimit">Members limit<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className="col-sm-8">                           
                            <select className="form-control" id="inputUserLimit">
                                <option disabled selected value>-- select an option --</option>
                                <option value = '1' >1</option>
                                <option value = '2' >2</option>
                                <option value = '3' >5</option>
                            </select> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="input-form-label" form="inputVolunteer" >Volunteer<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className="col-sm-8">                           
                            <select size='1' className="form-control" id="inputVolunteer">
                                <option disabled selected value>-- select an option --</option>
                                {sessionVolunteers().map((volunteer) => (
                                <option value = {volunteer._id}>{volunteer.nameFirst + ' ' + volunteer.nameLast}</option>))}
                            </select> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="inputAdditionalDetails" form="inputUserLimit">Additional details</label> 
                            </div>
                            <div className="col-sm-8">                           
                                <input className="form-control" type="text"  id="inputAdditionalDetails" name="inputAdditionalDetails" placeholder="Additional details" autocomplete="off"></input> 
                            </div>
                        </div>
                        <div className="btn-container justify-content-end">
                            <Button type = 'submit' variant="light">Submit</Button>
                            <ToastContainer position='bottom-center' />
                        </div>        
                    </form>
                </Card.Body>
            </Card>
  
    )
}

export default CreateSession