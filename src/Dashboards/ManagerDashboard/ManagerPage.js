import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CreateNewArea from "./CreateNewArea"
import CreateNewCGA from "./CreateNewCGA"
import NavBar from "./../../NavBar"

function Managerpage(props) {
  const links = [
    false,
    { name: "Calendar", url: "/manager/calendar" },
    { name: "Add new areas", url: "/manager/new-areas" }
  ]
    return (
      <div>
          <div className="navOffset">
            <NavBar links = {links} client = {props.client} />
          </div>
          <Container fluid>
            <Row >
              <Col lg={6} className = 'create-session'>
                <CreateNewArea client = {props.client} currentUser = {props.currentUser}/>
              </Col>
              <Col lg={6}>
                <CreateNewCGA client = {props.client} />
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default Managerpage