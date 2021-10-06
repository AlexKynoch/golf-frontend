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
import CgaDashboard from "./CgaDashboard"
import CgaCreateSessionMain from "./CgaDashboard/CgaCreateSessionMain"
import ViewUsers from "./CgaDashboard/CgaViewUsers"

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
            <CgaDashboard client = {client} />
          </Route>
          <Route path = '/create-session'>
            <CgaCreateSessionMain client = {client}/>
          </Route>
          <Route path = '/view-users'>
            <ViewUsers client = {client} />
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
