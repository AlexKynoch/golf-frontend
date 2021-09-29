import React from "react";

import UserCalendar from "./components/UserCalendar";
import VolunteerCalendar from "./components/VolunteerCalendar";
import AdminCalendar from "./components/AdminCalendar";
import CgaCalendar from "./components/CgaCalendar";

import "./App.css";

class App extends React.Component {
 
  render() {
    return (
      <div className="App"> 
        <main>
          <UserCalendar/>
          <VolunteerCalendar/>
          <CgaCalendar/>
          <AdminCalendar/>
        </main>
      </div>
    );
  }
}

export default App;