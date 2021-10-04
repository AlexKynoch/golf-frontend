import React, { useState, useEffect } from "react";
import { ApiClient } from "./apiClient"
import UserCalendar from "./components/UserCalendar";
import VolunteerCalendar from "./components/VolunteerCalendar";
import AdminCalendar from "./components/AdminCalendar";
import CgaCalendar from "./components/CgaCalendar";


function App() {
  const client = new ApiClient()

    return (
      <div className="App"> 
        <main>
          <AdminCalendar client = {client} />
          {/* <UserCalendar client = {client} /> */}
          {/* <VolunteerCalendar client={client}/>
          // <AdminCalendar client={client}/>
          <CgaCalendar client={client}/> */}
        </main>
      </div>
    )  
}

export default App
// import React from "react";
// import Autocomplete from "./AutoComplete";
// import "./styles.css";

// const App = () => {
//   return (
//     <div>
//       <h1>React Autocomplete Demo</h1>
//       <h2>Start typing and experience React autocomplete!</h2>
//       <Autocomplete
//         suggestions={[
//           "Alligator",
//           "Bask",
//           "Crocodilian",
//           "Death Roll",
//           "Eggs",
//           "Jaws",
//           "Reptile",
//           "Solitary",
//           "Tail",
//           "Wetlands"
//         ]}
//       />
//     </div>
//   );
// };

// export default App;