import CgaCalendar from "./CgaCalendar"
import CgaNotifications from "./CgaNotifications"
import  "./../../CalendarComponents/Calendar.css"
import NavBar from "./../../NavBar"

function CgaDashboard(props) {
  // document.getElementById("mon").checked = false

  const links = [
    false,
    { name: "Dashboard", url: "/cga/dashboard" },
    { name: "Create Session", url: "/cga/create-session" },
    { name: "View Users", url: "/cga/view-users" },
    { name: "Log Out", url: "/home" },

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