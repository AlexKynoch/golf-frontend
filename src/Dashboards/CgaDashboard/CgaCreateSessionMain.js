import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CreateSession from "./CgaCreateSession"
import VolunteerAvailability from "./CgaVolunteerAvailability"
import './Cga.css'
import NavBar from "./../../NavBar"

function CgaCreateSessionMain(props) {
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
          <Container fluid>
            <Row > 
              <Col lg={6} className = 'create-session'>
                <CreateSession client = {props.client}/>
              </Col>
              <Col lg={6}>
                <VolunteerAvailability client = {props.client} />
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default CgaCreateSessionMain