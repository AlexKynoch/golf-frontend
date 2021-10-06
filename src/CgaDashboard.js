import CgaCalendar from "./Calendar/CgaCalendar"
import CgaNotifications from "./CgaDashboard/CgaNotifications"
import './Calendar/Calendar.css'

function CgaDashboard(props) {
  // document.getElementById("mon").checked = false
    return (
      <div>
        <CgaNotifications client = {props.client}/>
        <CgaCalendar client = {props.client}/>   
    </div>
    )
}

export default CgaDashboard