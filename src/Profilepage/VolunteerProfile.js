import Profile from "./Profile"
import PPVolunteer from "./PPVolunteer"
import "./VolunteerProfile.css"

function VolunteerProfile(props) {
    return (
    <div className="row volunteerDashboardRow">
        <div className="col volunteerDashboardCol"><Profile /></div>
        <div className="col volunteerDashboardCol"><PPVolunteer /></div>
      </div>
    )
}

export default VolunteerProfile