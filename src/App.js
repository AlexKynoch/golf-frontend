import React from "react"
import { ApiClient } from "./apiClient"
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./NavBar"
import './App.css'
import Footer from "./Footer"
import Container from 'react-bootstrap/Container'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import VolunteerCalendar from "./Calendar/VolunteerCalendar"
import VolunteerProfile from "./Profilepage/VolunteerProfile"
import CgaDashboard from "./CgaDashboard"
import CgaCreateSessionMain from "./CgaDashboard/CgaCreateSessionMain"
import ViewUsers from "./CgaDashboard/CgaViewUsers"
import PPUser from "./Profilepage/PPUser"

function App() {
  const client = new ApiClient()

  return (
    <Router>
      <div className="App">
        <div className="navOffset">
          <NavBar client={client} />
        </div>
        <div className="contentContainer">
          <Container>
            <Switch>
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
              <Route path='/pp/user'>
                <ViewUsers client={client} />
              </Route>


              <Route exact path='/'>
                <VolunteerCalendar client={client} />
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
