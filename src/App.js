import React from "react"
import { ApiClient } from "./apiClient"
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./NavBar"
import './App.css'
import Footer from "./Footer"


function App() {
  const client = new ApiClient()

  return (
    <div className="App">
      <NavBar client = {client} />
      <Footer />
    </div>
  );
}

export default App;
