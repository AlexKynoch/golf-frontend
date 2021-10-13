import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CreateNewCGA(props) {
    const [location, cLocation] = useState('none')
    const [locations, cLocations] = useState([])
    const [disabled, cDisabled] = useState(false)

    // get data from database

    const refreshList = () => {
        props.client.getLocations().then((response) => cLocations(response.data))
    }

    // gets all unique session locations

    const sessionLocations = () => {
        let loc = []
        locations.forEach((location) => {
          if (!loc.includes(location.locationName)) {
            loc.push(location.locationName)
          }
        })
        return loc
      }

    // display message after new session submission

    const showSuccess = () => {
        toast.success('New session has been created')
    }

    // submit new session to database

    const submitHandler = (e) => {
        e.preventDefault()
        cDisabled(true)
        
        props.client.addCga(
            e.target.inputUsername.value,
            e.target.inputPassword.value,
            location,
            e.target.inputEmail.value,
            e.target.inputPhone.value,
            e.target.inputNamefirst.value,
            e.target.inputNamelast.value,
        )
        .then(() => {
            showSuccess()
            props.cNewCga(!props.newCga)
            cDisabled(false)
            document.getElementById('newCgaForm').reset()
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
            <Card id = 'myProfile' className = 'profile-card cga-session-card' >
                <Card.Body className = 'profile-card-body'>
                <Card.Title className = 'profile-card-title'>Add new Community Golf Activator</Card.Title>
                    <form className = 'cardFormContainer' id = 'newCgaForm' onSubmit = {(e) => submitHandler(e)}>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputUsername' >Username<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'text'  id = 'inputUsername'   name = 'inputUsername' 
                                placeholder='Username' autoComplete = 'off'></input> 
                            </div>      
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputPassword' >Password<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className='col-sm-8'>                           
                                <input className = 'form-control' type = 'password'  id = 'inputPassword'  name = 'inputPassword' placeholder = 'Password' autoComplete = 'off'></input> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputLocation'>Location</label> 
                            </div>
                            <div className='col-sm-8'>
                                <select className = 'form-control' id = 'inputLocation' onChange = {(e) => cLocation(e.target.value)} defaultValue = {'default'}>
                                    <option value = 'default' disabled>-- select an option --</option>
                                    <option value = 'none'>None of the below</option>
                                    {sessionLocations().map((location) => (
                                    <option value = {location}>{location}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputNamefirst'>First name<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'text'  id = 'inputNamefirst' name = 'inputNamefirst' placeholder = 'First name' autoComplete = 'off'></input> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputNamelast'>Last name</label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'text'  id = 'inputNamelast' name = 'inputNamelast' placeholder = 'Last name' autoComplete = 'off'></input> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputPhone'>Phone</label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'text'  id = 'inputPhone' name = 'inputPhone' placeholder = 'Phone' autoComplete = 'off'></input> 
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <div className = 'col-form-label col-sm-4'>
                                <label className = 'input-form-label' form = 'inputEmail'>Email<span className = 'required-asterisk'>*</span></label> 
                            </div>
                            <div className = 'col-sm-8'>                           
                                <input className = 'form-control' type = 'text'  id = 'inputEmail' name = 'inputEmail' placeholder = 'Email' autoComplete = 'off'></input> 
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

export default CreateNewCGA