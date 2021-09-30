import React, { useState, useEffect } from "react";
import { ApiClient } from "./apiClient"
import UserCalendar from "./components/UserCalendar";
import VolunteerCalendar from "./components/VolunteerCalendar";
import AdminCalendar from "./components/AdminCalendar";
import CgaCalendar from "./components/CgaCalendar";
// import "./App.css";


function App() {
  const client = new ApiClient()
  

 
    return (
      <div className="App"> 
        <main>
          <UserCalendar client={client}/>
          {/* <VolunteerCalendar client={client}/>
          <AdminCalendar client={client}/>
          <CgaCalendar client={client}/> */}
        </main>
      </div>
    )  
}

export default App;