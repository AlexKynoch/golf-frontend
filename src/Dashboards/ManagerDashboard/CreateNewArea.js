import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Autocomplete from './../../CalendarComponents/AutoComplete'
import './../../CalendarComponents/autoComplete.css'

function NewArea(props) {
    const [autoCompleteInputBooking, cAutoCompleteInputBooking] = useState('')
    const [disabled, cDisabled] = useState(false)
    const activeManager = props.currentUser._id

    // get names and usernames of all the CGAs
    const allCGAs = () => {
        let arr = []
        props.admins.map((admin) => {
            if (admin.role === 'CGA') {
                arr.push(admin.nameFirst + ' ' + admin.nameLast + ' - ' + admin.userName)
            }
        })
        return arr
    }

    // display message after new session submission

    const showSuccess = () => {
        toast.success('New session has been created')
    }
 
    // submit new session to database
    const submitHandler = (e) => {
        e.preventDefault()
        cDisabled(true)
    
        if (allCGAs().includes(e.target.user.value)) {
            let userName = e.target.user.value.split(' - ')
            let userId
            props.admins.forEach((admin) => {
                if(userName[1] === admin.userName) {
                  userId = admin._id
                }
            })
            props.client.addLocation({
                locationName: e.target.inputLocation.value,
                activeCGA:userId,
                manager:activeManager
            })
            props.client.updateCgaLocation(userId, e.target.inputLocation.value)
            .then(() => {
                showSuccess()
                cDisabled(false)
                document.getElementById('newAreaForm').reset()
                cAutoCompleteInputBooking('')
            })
            .catch(() => {
                alert('an error occured, please try again')
                cDisabled(false)
            })
        } else if (e.target.user.value === '') {
            props.client.addLocation({
                locationName:e.target.inputLocation.value,
                manager:activeManager
            })
            .then(() => {
                showSuccess()
                cDisabled(false)
                document.getElementById('newAreaForm').reset()
                cAutoCompleteInputBooking('')
            })
            .catch(() => {
                alert('an error occured, please try again')
                cDisabled(false)
            })
        } else {
            alert('Please select active CGA from the list or leave it empty')
            document.getElementById('newAreaForm').reset()
            cAutoCompleteInputBooking('')
            cDisabled(false)
        }
    }

    return (
            <Card id = 'myProfile' className = 'profile-card cga-session-card' >
                <Card.Body className = 'profile-card-body'>
                <Card.Title className = 'profile-card-title'>Add new area</Card.Title>
                    <form className = 'cardFormContainer' id = 'newAreaForm' onSubmit = {(e) => submitHandler(e)}>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputLocation' >Location<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'text'  id = 'inputLocation'   name = 'inputLocation' 
                                placeholder='Location' autoComplete = 'off'></input> 
                            </div>      
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputCga' >Active CGA</label> 
                            </div>
                            <div className='col-sm-8'>      
                                <Autocomplete newClassName = {'form-control'}  placeholder = {'Search by CGA...'}input = {autoCompleteInputBooking} setInput = {cAutoCompleteInputBooking}
                                    suggestions = {allCGAs()}
                                /> 
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

export default NewArea