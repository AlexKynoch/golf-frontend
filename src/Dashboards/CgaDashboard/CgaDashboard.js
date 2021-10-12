import CgaCalendar from "./CgaCalendar"
import CgaNotifications from "./CgaNotifications"
import  "./../../CalendarComponents/Calendar.css"
import NavBar from "./../../NavBar"

function CgaDashboard(props) {

  const links = [
    false,
    { name: "Dashboard", url: "/cga/dashboard" },
    { name: "Create Session", url: "/cga/create-session" },
    { name: "View Users", url: "/cga/view-users" }

  ]
  return (
    <div>
      <div className="navOffset">
        <NavBar links = {links} client = {props.client} />
      </div>
        <CgaNotifications client={props.client} currentUser = {props.currentUser}/>
        <CgaCalendar client={props.client} currentUser = {props.currentUser} />
    </div>
  )
}

export default CgaDashboard