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
    const [location, cLocation] = useState('Abbeydale Golf Club - Sheffield')

    const refreshList = () => {
        props.client.getSessions().then((response) => cSessions(response.data))
        props.client.getUserByRole('volunteer').then((response) => cVolunteers(response.data))
    }

    const sessionVolunteers = () => {
        let volunteerArray = []
        volunteers.forEach((volunteer) => {
            volunteerArray.push(volunteer.nameFirst + ' ' + volunteer.nameLast)
        })
        return volunteerArray
    }


    const showSuccess = () => {
        toast.success("New session has been created")
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // cDisabled(true)
        showSuccess()
        let result = [
                e.target.inputDate.value,
                e.target.inputStartTime.value,
                e.target.inputFinishTime.value,
                e.target.inputLocation.value,
                e.target.inputVolunteer.value,
                e.target.inputUserLimit.value,
                e.target.inputUserLimit.value,
                e.target.inputAdditionalDetails.value
        ]
        console.log(result)
        // let result
        // if (props.currentEvent) {
        //   result = props.client.updateEvent(
        //     props.currentEvent._id,
        //     e.target.eventName.value,
        //     e.target.location.value,
        //     e.target.information.value,
        //     e.target.date.value
        //   )
        // } else {
        //   result = props.client.addEvent(e.target.eventName.value, e.target.location.value, e.target.information.value, e.target.date.value)
        // }
        // result
        //   .then(() => {
        //     cDisabled(false)
        //     setStartDate(new Date())
        //     document.getElementById('addForm').reset()
    
        //     if (!props.currentName && !props.currentLocation) {
        //       props.refreshList()
        //     } else if (props.currentLocation) {
        //       props.getByLocation(props.currentLocation)
        //       props.cCurrentEvent(undefined)
        //     } else {
        //       props.getByName(props.currentName)
        //       props.cCurrentEvent(undefined)
        //     }
        //   })
        //   .catch(() => {
        //     alert('an error occured, please try again')
        //     cDisabled(false)
        //   })
      }

      useEffect(() => {
        refreshList();
      }, [])
    return (
  
            <Card id="myProfile" className="profile-card cga-session-card" >
                <Card.Body className="profile-card-body">
                <Card.Title className="profile-card-title">Add new session</Card.Title>
                    <form className="cardFormContainer" onSubmit={(e) => submitHandler(e)}>
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
                            <select size='1' className="form-control" id="inputUserLimit">
                                {sessionVolunteers().map((volunteer) => (
                                <option value = {volunteer}>{volunteer}</option>))}
                            </select> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-form-label col-sm-4">
                                <label className="inputAdditionalDetails" form="inputUserLimit">Additional details</label> 
                            </div>
                            <div className="col-sm-8">                           
                                <input className="form-control" type="text"  id="inputAdditionalDetails" name="inputAdditionalDetails" placeholder="Additional details"></input> 
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