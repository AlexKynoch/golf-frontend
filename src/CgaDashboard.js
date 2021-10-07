import CgaCalendar from "./Calendar/CgaCalendar"
import CgaNotifications from "./CgaDashboard/CgaNotifications"
import './Calendar/Calendar.css'
import NavBar from "./NavBar"

function CgaDashboard(props) {
  // document.getElementById("mon").checked = false

  const links = [
    false,
    { name: "Dashboard", url: "/volunteer/calendar" },
    { name: "Create Session", url: "/cga/create-session" },
    { name: "View Users", url: "/cga/view-users/landingpage" },
    { name: "Log Out", url: "/landingpage" },

  ]
  return (
    <div>
      <div className="navOffset">
        <NavBar links={links} />
      </div>
      <CgaNotifications client={props.client} />
      <CgaCalendar client={props.client} />
    </div>
  )
}

export default CgaDashboard

