import CgaCalendar from "./CgaCalendar"
import CgaNotifications from "./CgaNotifications"
import  "./../../CalendarComponents/Calendar.css"

function CgaDashboard(props) {
    return (
      <div>
        <CgaNotifications client = {props.client}/>
        <CgaCalendar client = {props.client}/>   
    </div>
    )
}

export default CgaDashboard