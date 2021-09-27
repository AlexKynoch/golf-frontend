import React, { useState, useEffect } from "react"
import { ApiClient } from "./apiClient"
import './App.css'
import NavBar from "./NavBar"
import Profile from "./Profile"

function App() {
  const [sessions, cSessions] = useState([]);
  const client = new ApiClient()

  const refreshList = () => {
    client.getSessions().then((response) => cSessions(response.data));
  };

  const makeSessionTable = () => {
    console.log(sessions)
    return sessions.map((session, index) => {
      return (
        <tr key={index}>
          <td>{session.date}</td>
          <td>{session.volunteer}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Profile />
      {/* <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>volunteer</th>
          </tr>
        </thead>
        <tbody>{makeSessionTable()}</tbody>
      </table> */}

    </div>
  );
}

export default App;
