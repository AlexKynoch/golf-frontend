import React from "react"
import { ApiClient } from "./apiClient"
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./NavBar"
import './App.css'
import Footer from "./Footer"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import VolunteerCalendar from "./Calendar/VolunteerCalendar"
import CgaCalendar from "./Calendar/CgaCalendar"
import VolunteerProfile from "./Profilepage/VolunteerProfile"
import CreateSession from "./CgaDashboard/CgaCreateSession"
import CgaCreateSessionMain from "./CgaDashboard/CgaCreateSessionMain"



function App() {
  const client = new ApiClient()

  return (
      <Router>
    <div className="App">
      <div className="navOffset">
        <NavBar client = {client} />
      </div>
      <div className="contentContainer">
      <Container>
        <Switch>
          <Route path = '/dashboard'>
            <CgaCalendar client = {client} />
          </Route>
          <Route path = '/create-session'>
            <CgaCreateSessionMain client = {client}/>
          </Route>
          <Route path = '/view-users'>
            <VolunteerProfile />
          </Route>
          <Route exact path = '/'>
            <VolunteerCalendar client = {client} />
          </Route>
          <Route path = '/'>Error: 404 not found</Route>
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
