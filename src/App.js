import React, { useEffect, useState } from "react"
import { ApiClient } from "./apiClient"
import 'bootstrap/dist/css/bootstrap.min.css'
import './CalendarComponents/Calendar.css'
import './App.css'
import Footer from "./Footer"
import Container from 'react-bootstrap/Container'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import VolunteerCalendar from "./Dashboards/VolunteerDashboard/VolunteerCalendar"
import VolunteerProfile from "./Profilepage/VolunteerProfile"
import UserProfile from "./Dashboards/UserDashboard/UserProfile"
import CgaDashboard from "./Dashboards/CgaDashboard/CgaDashboard"
import CgaCreateSessionMain from "./Dashboards/CgaDashboard/CgaCreateSessionMain"
import ViewUsers from "./Dashboards/CgaDashboard/CgaViewUsers"
import UserCalendar from "./Dashboards/UserDashboard/UserCalendar"
import LandingPage from "./LandingPage"
import AdminCalendar from "./Dashboards/AdminDashboard/AdminCalendar"
import UserRegister from "./Dashboards/AdminDashboard/UserRegister"
import UserLoginPage from "./UserLoginPage"
import VolunteerLoginPage from "./VolunteerLoginPage"
import AdminLoginPage from "./AdminLoginPage"
import CreateAccount from "./CreateAccount"
import ManagerPage from "./Dashboards/ManagerDashboard/ManagerPage"
import ManagerCalendar from "./Dashboards/ManagerDashboard/ManagerCalendar"

function App() {
  const client = new ApiClient(
    () => token,
    () => logout(),
    () => removeUser()
  )

  const [token, changeToken] = useState(window.localStorage.getItem('token'))
  const [currentUser, cCurrentUser] = useState(JSON.parse(window.localStorage.getItem('user')))

  const setUser = (u) => {
    window.localStorage.setItem('user', JSON.stringify(u))
    cCurrentUser(u)
  }

  const removeUser = () => {
    window.localStorage.removeItem('user')
    cCurrentUser(undefined)
  }

  const login = (t) => {
    window.localStorage.setItem('token', t)
    changeToken(t)
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    changeToken(undefined)
  }

  useEffect(()=> {
    const user = window.localStorage.getItem('user')
    cCurrentUser(JSON.parse(user))
  }, [])

  return (
 
    <Router>
      <div className="App">
        <div className="contentContainer">
          <Container>
            <Switch>
              <Route path='/customer/calendar'>
                <UserCalendar client={client} currentUser = {currentUser} />
              </Route>
              <Route path='/customer/profile'>
                <UserProfile client={client} currentUser = {currentUser} cCurrentUser = {cCurrentUser} />
              </Route>
              <Route path='/volunteer/calendar'>
                <VolunteerCalendar client={client} currentUser = {currentUser}/>
              </Route>
              <Route path='/volunteer/profile'>
                <VolunteerProfile client={client} currentUser = {currentUser}/>
              </Route>
              <Route path='/cga/dashboard'>
                <CgaDashboard client={client} currentUser = {currentUser}/>
              </Route>
              <Route path='/cga/create-session'>
                <CgaCreateSessionMain client={client} currentUser = {currentUser}/>
              </Route>
              <Route path='/cga/view-users'>
                <ViewUsers client={client} currentUser = {currentUser}/>
              </Route> 
              <Route path='/home'>
                <LandingPage client={client} />
              </Route>
              <Route path='/admin/calendar'>
                <AdminCalendar client={client} currentUser = {currentUser}/>
              </Route>
              <Route path='/admin/register-customer'>
                <UserRegister client={client}/>
              </Route>
              <Route path='/login/user'>
                <UserLoginPage setUser = {(u => setUser(u))} loggedIn = {(t => login(t))} client = {client} cCurrentUser = {cCurrentUser}/>
              </Route>
              <Route path='/login/volunteer'>
                <VolunteerLoginPage setUser = {(u => setUser(u))} loggedIn = {(t => login(t))} client = {client} cCurrentUser = {cCurrentUser}/>
              </Route>
              <Route path='/login/admin'>
                <AdminLoginPage setUser = {(u => setUser(u))} loggedIn = {(t => login(t))} client = {client} cCurrentUser = {cCurrentUser}/>
              </Route>
              <Route path='/register'>
                <CreateAccount client = {client}/>
              </Route>
              <Route path='/manager/calendar'>
                <ManagerCalendar client={client} currentUser = {currentUser}/>
              </Route>
              <Route path='/manager/new-areas'>
                <ManagerPage client={client} currentUser = {currentUser}/>
              </Route>
              <Route exact path='/'>
                <LandingPage client={client} />
              </Route>
              <Route path='/'>Error: 404 not found</Route>
            </Switch>
          </Container>
        </div>
        <div className="footerOffset">
          <Footer currentUser = {currentUser}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
