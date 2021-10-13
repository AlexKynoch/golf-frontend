import React from "react"
import "./Footer.css"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Footer(props) {
    return (
        <div className="footer">
            <Row>
                <Col lg = {1} className = 'text-black custom-nav-item nav-link contact-margin'><p>CONTACT US:</p></Col>
                <Col lg = {2} className = 'center-footer text-black custom-nav-item nav-link'><p>golfinsociety@gmail.com</p></Col>
                <Col lg = {1} className = 'margin-footer text-black custom-nav-item nav-link'><p >07491694938</p></Col>
                <Col lg = {2} className = 'text-black custom-nav-item nav-link'><p>Mon-Fri 8am - 6pm</p></Col>
                {props.currentUser ? null :  <Col className='custom-nav-item nav-link admin-login-container'><a href="#/login/admin" className = 'admin-login' >Admin Log In</a></Col>}
                        
            </Row>
        </div>
    )
}

export default Footer;