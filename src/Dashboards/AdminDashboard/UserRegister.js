import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '../../NavBar'

function UserRegister(props) {
  const [disabled, cDisabled] = useState(false)
  const [location, cLocation] = useState('')
  const [locations, cLocations] = useState([])
  const links = [
    false,
    { name: "Calendar", url: "/admin/calendar" },
    { name: "Register a customer", url: "/admin/register-customer" }
  ]

  useEffect(() => {
    props.client.getLocations().then((res) => {const newArray = res.data.map((location) => {
        return (location.locationName)
    })
    cLocations(newArray)})
  }, [])

  const showSuccess = () => {
    toast.success("New user added")
  }

  const submitHandler = (e) => {
      e.preventDefault(); 
      props.client.addUser({
          userName: e.target.username.value, 
          password: e.target.password.value,
          location: location,
          role: 'user', 
          email: e.target.email.value,
          phone: e.target.phone.value, 
          nameFirst: e.target.nameFirst.value,
          nameLast: e.target.nameLast.value, 
          details: e.target.adDetail.value,
      })
      .then((response) => {
        cDisabled(false)
        showSuccess()
        resetInput() 
      })
      .catch(() => {
        alert('please fill in all required fields')
        cDisabled(false)
        resetInput()
      })
    }

  const resetInput = () => {
    document.getElementById('addLogin').reset()
  }

  return (
    <div>
        <div className="navOffset">
            <NavBar links = {links} client = {props.client}/>
        </div>
        <div>
          <div className = 'd-flex justify-content-center'>
            <Card id = 'myProfile' className = 'profile-card cga-session-card' style = {{maxWidth: '30rem'}}>
              <Card.Body className = 'profile-card-body'>
              <Card.Title className = 'profile-card-title'>Register a new customer</Card.Title>
                <form onSubmit={(e) => submitHandler(e)} id = 'addLogin'>
                <br />
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'username' >Username<span className = 'required-asterisk'>*</span></label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <input 
                            className = 'form-control' 
                            type = 'text' 
                            name = 'username' 
                            placeholder = 'Username' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
                    </div>      
                </div>
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'password' >Password<span className = 'required-asterisk'>*</span></label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <input 
                            className = 'form-control' 
                            type = 'password' 
                            name = 'password' 
                            placeholder = 'Password' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
                    </div>      
                </div>
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'location' >Location<span className = 'required-asterisk'>*</span></label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <select size='1' className='form-control' onChange={(e) => cLocation(e.target.value)} id='inputLocation' defaultValue={'default'} >
                            <option value='default' disabled>-- select an option --</option>
                            {locations.map((location) => (
                            <option key={location} value={location} name="location">{location}</option>))}
                        </select>
                    </div>      
                </div>
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'email' >Email<span className = 'required-asterisk'>*</span></label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <input 
                            className = 'form-control' 
                            type = 'text' 
                            name = 'email' 
                            placeholder = 'Email' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
                    </div>      
                </div>
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'phone' >Phone</label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <input 
                            className = 'form-control' 
                            type = 'text' 
                            name = 'phone' 
                            placeholder = 'Phone' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
                    </div>      
                </div>
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'nameFirst' >First name<span className = 'required-asterisk'>*</span></label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <input 
                            className = 'form-control' 
                            type = 'text' 
                            name = 'nameFirst' 
                            placeholder = 'First name' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
                    </div>      
                </div>
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'nameLast' >Last name</label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <input 
                            className = 'form-control' 
                            type = 'text' 
                            name = 'nameLast' 
                            placeholder = 'Last name' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
                    </div>      
                </div>
                <div className = 'form-group row'>
                    <div className = 'col-form-label col-sm-4'>
                        <label className = 'input-form-label' form = 'adDetail' >Additional details</label> 
                    </div>
                    <div className = 'col-sm-8'>                           
                        <input 
                            className = 'form-control' 
                            type = 'text' 
                            name = 'adDetail' 
                            placeholder = 'Additional details' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
                    </div>      
                </div>
                <br />
                <div className = 'btn-container justify-content-center'>
                  <Button className = 'button-profile' type = 'submit' disabled = {disabled}>
                    {' '}
                    {'Register'}{' '}
                  </Button>
                  <ToastContainer position = 'bottom-center' />
                </div>
                <br />
              </form> 
              </Card.Body>
            </Card>
          </div>
        </div>
    </div>
  )
}

export default UserRegister