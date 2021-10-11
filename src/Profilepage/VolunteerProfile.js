import Profile from "./Profile"
import PPVolunteer from "./PPVolunteer"
// import "./VolunteerProfile.css"
import "./Profile.css"
import ChangePassword from "./ChangePassword"
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBar from '.././NavBar'

function VolunteerProfile(props) {
  return (
    <div className="volunteerDashboardContainer">
      <div className="volunteerDashboardRow row">
        {/* <div className="col volunteerDashboardCol"><NavBar /></div> */}
        <div className="volunteerDashboardColContainer col">
          <div className="volunteerDashboardColContainer row">
            <div className="volunteerDashboardCol"><Profile /></div>
            <div className="volunteerDashboardCol"><PPVolunteer /></div>
          </div>
        </div>

      </div>

      <Container>
        <Row>
          <div className="col volunteerDashboardCol">
            <ChangePassword client={props.client} />
          </div>
        </Row>
      </Container>
    </div>

  )
}

export default VolunteerProfile