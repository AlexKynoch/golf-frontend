import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CreateSession from "./CgaCreateSession"
import VolunteerAvailability from "./CgaVolunteerAvailability"
import './Cga.css'

function CgaCreateSessionMain(props) {
    return (
      <Container fluid>
        <Row className = 'cga-content-container'>
          <Col md={6}>
            <CreateSession client = {props.client}/>
            </Col>
            <Col md={6}>
            <VolunteerAvailability client = {props.client} />
            </Col>
        </Row>
      </Container>
    )
}

export default CgaCreateSessionMain