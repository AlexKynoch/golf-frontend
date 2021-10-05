import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CreateSession from "./CgaCreateSession"
import VolunteerAvailability from "./CgaVolunteerAvailability"
import './Cga.css'

function CgaCreateSessionMain(props) {
    return (
      <Container>
        <Row className = 'cga-content-container'>
          <Col>
            <CreateSession client = {props.client}/>
            </Col>
            <Col>
            <VolunteerAvailability client = {props.client} />
            </Col>
        </Row>
      </Container>
    )
}

export default CgaCreateSessionMain