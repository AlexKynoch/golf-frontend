import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import './App.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from "./NavBar"

function UserLoginPage(props) {
  const [signUp, cSignUp] = useState(false)
  const [disabled, cDisabled] = useState(false)
  let history = useHistory()
  const links = [
    { name: "Customer", url: "/login/user" },
    { name: "Volunteer", url: "/login/volunteer" },
    { name: "Admin", url: "/login/admin" },
    { name: "Home", url: "/home" }
  ] 
  const showSuccess = () => {
    toast.success("New user added")
  }

  const submitHandler = (e) => {
    
    if (signUp) { // sign up new user
      e.preventDefault(); 
      props.client.addUser({
          userName: e.target.username.value, 
          password: e.target.password.value,
          location: e.target.location.value,
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
        cSignUp(false)
        resetInput() 
      })
      .catch(() => {
        alert('please fill in both the username and password')
        cDisabled(false)
        resetInput()
      })
    } else { // log in with existing user
    e.preventDefault()
    cDisabled(true)
    props.client.userlogin(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false)
        if (response.data.user.role === 'user') {
          props.loggedIn(response.data.user.token)
          props.cCurrentUser(response.data.user)
          history.push('/customer/calendar')
        } else {
          alert('not a valid username or password')
          cDisabled(false)
          resetInput()
        }
      })
      .catch(() => {
        alert('not a valid username or password')
        cDisabled(false)
        resetInput()
      })
    }
  }

  const resetInput = () => {
    document.getElementById('addLogin').reset()
  }

  const showSignUp = () => {
    if (signUp) {
      return <div className = 'account-sign-up'>Already have an account? <a href="#/login/user" className = 'purple-text' onClick = {() => {cSignUp(false); resetInput()}}> Sign In</a></div>
    } else {
      return <div className = 'account-sign-up'>Don't have an account? <a href="#/login/user" className = 'purple-text'onClick = {() => {cSignUp(true); resetInput()}}> Register</a></div>
    }
  }

  return (
    <div>
        <div className="navOffset">
            <NavBar links={links} client = {props.client} landing = {true}/>
        </div>
        <div>
          <div className = 'd-flex justify-content-center'>
            <Card id = 'myProfile' className = 'profile-card cga-session-card' style = {{maxWidth: '30rem'}}>
              <Card.Body className = 'profile-card-body'>
              <Card.Title className = 'profile-card-title'>{signUp ? 'Register as a customer' : 'Sign in as a customer'}</Card.Title>
                {!signUp? 
                <form onSubmit={(e) => submitHandler(e)} id = 'addLogin'>
                  <br />
                  <input 
                    className = 'form-control' 
                    type = 'text' 
                    name = 'username' 
                    placeholder = 'Username' 
                    disabled = {disabled} 
                    autoComplete = 'off'
                  />
                  <br />
                  <input 
                    className = 'form-control' 
                    type = 'password' 
                    name = 'password' 
                    placeholder = 'Password' 
                    disabled = {disabled} 
                    autoComplete = 'off'
                  />
                  <br />
                  <div className = 'btn-container justify-content-center'>
                    <Button className = 'button-profile' type = 'submit' disabled = {disabled}>
                      {' '}
                      {'Sign In'}{' '}
                    </Button>
                    <ToastContainer position = 'bottom-center' />
                  </div>
                  <br />
                </form> : 
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
                        <input 
                            className = 'form-control' 
                            type = 'text' 
                            name = 'location' 
                            placeholder = 'Location' 
                            disabled = {disabled} 
                            autoComplete = 'off'
                        /> 
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
            }
                {showSignUp()}
              </Card.Body>
            </Card>
          </div>
        </div>
    </div>
  )
}

export default UserLoginPage