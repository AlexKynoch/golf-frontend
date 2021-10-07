import Profile from "./Profile"
import PPVolunteer from "./PPVolunteer"
import "./VolunteerProfile.css"
import NavBar from "../NavBar"


function VolunteerProfile(props) {
  const links = [
    false,
    { name: "Calendar", url: "/volunteer/calendar" },
    { name: "Profile", url: "/volunteer/profile" },
    { name: "Log Out", url: "/landingpage" },

  ]

  return (
    <div className="row volunteerDashboardRow">
      <div className="navOffset">
        <NavBar links={links} />
      </div>
      <div className="col volunteerDashboardCol"><Profile /></div>
      <div className="col volunteerDashboardCol"><PPVolunteer client={props.client} /></div>
    </div>
  )
}

export default VolunteerProfile



