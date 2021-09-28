import React from "react";

import UserCalendar from "./components/UserCalendar";
import VolunteerCalendar from "./components/VolunteerCalendar";
import AdminCalendar from "./components/AdminCalendar";

import "./App.css";

class App extends React.Component {
 
  render() {
    return (
      <div className="App"> 
        <main>
          <AdminCalendar/>
        </main>
      </div>
    );
  }
}

export default App;