import React from "react"
import { ApiClient } from "./apiClient"
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./NavBar"
import './App.css'
import Footer from "./Footer"
import VolunteerProfile from "./Profilepage/VolunteerProfile"


function App() {
  const client = new ApiClient()

  return (
    <div className="App">
      {/* <NavBar client={client} /> */}
      <Footer />
      <VolunteerProfile client={client} />
    </div>
  );
}

export default App;
