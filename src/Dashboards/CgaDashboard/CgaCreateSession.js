import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CreateSession(props) {
    const [volunteers, cVolunteers] = useState([])
    const [currentCgaLocation, cCurrentCgaLocation] = useState([])
    const location = 'Newcastle'
    const [disabled, cDisabled] = useState(false)
    const [input, cInput] = useState()

    // get data from database
    const refreshList = () => {
        props.client.getUserByRole('volunteer').then((response) => cVolunteers(response.data))
        props.client.getAdminById('615d7e616d365c85eff5f442').then((response) => cCurrentCgaLocation(response.data.location)) 
    }

    // return all registered volunteers for a location

    const sessionVolunteers = () => {
        let volunteerArray = []
        volunteers.forEach((volunteer) => {
            if (volunteer.location === location) {
                volunteerArray.push(volunteer)
            }
        })
        return volunteerArray
    }

    // return all volunteers that are available on the selected date 

    const availableVolunteerFilter = () => {
        const days = [6, 0, 1, 2, 3, 4, 5]
        const sessionDate = new Date(input)
        const day = days[sessionDate.getDay()]
        let volunteerArray = []
       
        if (input) {
            sessionVolunteers().forEach((volunteer) => {
                if (volunteer.availability[day][1] === true) {
                    volunteerArray.push(volunteer)
                }
            })     
            return volunteerArray
        } else {
            return sessionVolunteers()
        }
    }

    // display message after new session submission

    const showSuccess = () => {
        toast.success('New session has been created')
    }

    // get dropdown list value

    const getItemValue = (q) => {
        const e = document.getElementById(q)
        return e.options[e.selectedIndex].value
    }

    // submit new session to database

    const submitHandler = (e) => {
        e.preventDefault()
        cDisabled(true)
        if (getItemValue('inputVolunteer') !== 'default' && getItemValue('inputUserLimit') !== 'default' ) {
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
        } else {
            alert('Please fill in volunteer and session type fields')
            cDisabled(false)
        }
      }

    useEffect(() => {
    refreshList();
    }, [])

    return (
            <Card id = 'myProfile' className = 'profile-card cga-session-card' >
                <Card.Body className = 'profile-card-body'>
                <Card.Title className = 'profile-card-title'>Add new session</Card.Title>
                    <form className = 'cardFormContainer' id = 'sessionForm' onSubmit = {(e) => submitHandler(e)}>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputDate' >Date<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'date'  id = 'inputDate'   name = 'inputDate' 
                                placeholder='Date' onChange = {(e) => cInput(e.target.value)}></input> 
                            </div>      
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputStartTime' >Start time<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className='col-sm-8'>                           
                                <input className = 'form-control' type = 'time'  id = 'inputStartTime'  name = 'inputStartTime' placeholder = 'Start time'></input> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputFinishTime' >Finish time<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'time'  id = 'inputFinishTime' name = 'inputFinishTime' placeholder = 'Finish time'></input> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputLocation' >Location<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className='col-sm-8'>                           
                                <input className='form-control' type='text'  id='location' name='inputLocation' value = {location}></input> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputUserLimit'>Session type<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                            <select className = 'form-control' id = 'inputUserLimit' defaultValue = {'default'}>
                                <option value = 'default' disabled>-- select an option --</option>
                                <option value = '1' >One-to-One Coaching</option>
                                <option value = '2' >The Perfect Three Ball</option>
                                <option value = '3' >Group Session</option>
                            </select> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputVolunteer' >Volunteer<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                            <select size = '1' className = 'form-control' id = 'inputVolunteer' defaultValue = {'default'} >
                                <option value = 'default' disabled>-- select an option --</option>
                                {availableVolunteerFilter().map((volunteer) => (
                                <option key = {volunteer._id} value = {volunteer._id}>{volunteer.nameFirst + ' ' + volunteer.nameLast}</option>))}
                            </select> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'inputAdditionalDetails' form = 'inputUserLimit'>Additional details</label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'text'  id = 'inputAdditionalDetails' name = 'inputAdditionalDetails' placeholder = 'Additional details' autoComplete = 'off'></input> 
                            </div>
                        </div>
                        <div className = 'btn-container justify-content-end'>
                            <Button className = 'button-profile' type = 'submit' variant = 'light' disabled = {disabled}>Submit</Button>
                            <ToastContainer position = 'bottom-center' />
                        </div>        
                    </form>
                </Card.Body>
            </Card>
    )
}

export default CreateSession