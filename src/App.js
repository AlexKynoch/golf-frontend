import React from "react"
import { ApiClient } from "./apiClient"
import 'bootstrap/dist/css/bootstrap.min.css'
import './CalendarComponents/Calendar.css'
import './App.css'
import NavBar from "./NavBar"
import Footer from "./Footer"
import Container from 'react-bootstrap/Container'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import VolunteerCalendar from "./Dashboards/VolunteerDashboard/VolunteerCalendar"
import VolunteerProfile from "./Profilepage/VolunteerProfile"
import Profile from "./Profilepage/Profile"
import CgaDashboard from "./Dashboards/CgaDashboard/CgaDashboard"
import CgaCreateSessionMain from "./Dashboards/CgaDashboard/CgaCreateSessionMain"
import ViewUsers from "./Dashboards/CgaDashboard/CgaViewUsers"
import UserCalendar from "./Dashboards/UserDashboard/UserCalendar"
import LandingPage from "./LandingPage"
import AdminCalendar from "./Dashboards/AdminDashboard/AdminCalendar"
import UserRegister from "./Dashboards/AdminDashboard/UserRegister"
import LoginPage from "./LoginPage"
import ManagerPage from "./Dashboards/ManagerDashboard/ManagerPage"


function App() {
  const client = new ApiClient()

  return (
    <Router>
      <div className="App">
        {/* <div className="navOffset">
          <NavBar client={client} />
        </div> */}
        <div className="contentContainer">
          <Container>
            <Switch>
              <Route path='/customer/calendar'>
                <UserCalendar client={client} />
              </Route>
              <Route path='/customer/profile'>
                <Profile client={client} />
              </Route>
              <Route path='/volunteer/calendar'>
                <VolunteerCalendar client={client} />
              </Route>
              <Route path='/volunteer/profile'>
                <VolunteerProfile client={client} />
              </Route>
              <Route path='/cga/dashboard'>
                <CgaDashboard client={client} />
              </Route>
              <Route path='/cga/create-session'>
                <CgaCreateSessionMain client={client} />
              </Route>
              <Route path='/cga/view-users'>
                <ViewUsers client={client} />
              </Route> 
              <Route path='/home'>
                <LandingPage client={client} />
              </Route>
              <Route path='/admin'>
                <AdminCalendar client={client} />
              </Route>
              <Route path='/admin/register-user'>
                <UserRegister client={client} />
              </Route>
              <Route path='/login'>
                <LoginPage client={client} />
              </Route>
              <Route path='/manager'>
                <ManagerPage client={client} />
              </Route>
              <Route exact path='/'>
                <LandingPage client={client} />
              </Route>
              <Route path='/'>Error: 404 not found</Route>
            </Switch>
          </Container>
        </div>
        <div className="footerOffset">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
