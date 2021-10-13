import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import './App.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import NavBar from "./NavBar"

function UserLoginPage(props) {
  const [disabled, cDisabled] = useState(false)
  let history = useHistory()
  const links = [
      { name: "Home", url: "/home" },
      { name: "Sign In as Customer", url: "/login/user" },
      { name: "Sign In as Volunteer", url: "/login/volunteer" },
      { name: "Create an account", url: "/register" }
  ] 
 
  const submitHandler = (e) => {
    e.preventDefault()
    cDisabled(true)
    props.client.userlogin(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false)
        if (response.data.user.role === 'user') {
          props.loggedIn(response.data.user.token)
          props.setUser(response.data.user)
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

  const resetInput = () => {
    document.getElementById('addLogin').reset()
  }

  return (
    <div>
        <div className="navOffset">
            <NavBar links={links} client = {props.client} landing = {true}/>
        </div>
        <div>
          <div className = 'd-flex justify-content-center'>
            <Card id = 'myProfile' className = 'profile-card cga-session-card' style = {{maxWidth: '20rem'}}>
              <Card.Body className = 'profile-card-body'>
              <Card.Title className = 'profile-card-title'>Sign in as a customer</Card.Title>
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

export default UserLoginPage