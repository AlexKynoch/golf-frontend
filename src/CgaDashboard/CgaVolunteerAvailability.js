import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from "react"

function VolunteerAvailability(props) {
    const [volunteers, cVolunteers] = useState([])
    const [location, cLocation] = useState('Leeds')

    const refreshList = () => {
        props.client.getUserByRole('volunteer').then((response) => cVolunteers(response.data))
    }

    const sessionVolunteers = () => {
        let volunteerArray = []
        volunteers.forEach((volunteer) => {
            if (volunteer.location === location) {
                volunteerArray.push(volunteer)
            }
        })
        return volunteerArray
    }

    const availability = [0, 2, 4, 5]
    useEffect(() => {
    refreshList();
    }, [])

    
    // builds volunteer availability table

    const buildrows = () => {
        if (sessionVolunteers().length > 0) {
            return sessionVolunteers().map((current) => {
                return <tr key={current._id}>
                <td>{current.nameFirst + ' ' + current.nameLast}</td>
                <td>{current.userName}</td>
                <td><input type="checkbox" id="mon" />&nbsp;</td>
                <td><input type="checkbox" id="tue" />&nbsp;</td>
                <td><input type="checkbox" id="wed" />&nbsp;</td>
                <td><input type="checkbox" id="thu" />&nbsp;</td>
                <td><input type="checkbox" id="fri" />&nbsp;</td>
                <td><input type="checkbox" id="sat" />&nbsp;</td>
                <td><input type="checkbox" nid="sun" />&nbsp;</td>
                </tr>
            })
        } else {
            return (
            <tr className = 'no-volunteers-to-show'>
                <td colSpan = '5'>{'No volunteers to show'}</td>
            </tr>
            )
        }
    }
   
    return (
            <Card id="myProfile" className="profile-card volunteer-availability-card" >
                <Card.Body className="profile-card-body">
                <Card.Title className="profile-card-title">Volunteer Availability</Card.Title>
                    <Table responsive className = 'event-table'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>{buildrows()}</tbody>
                    </Table>    
                </Card.Body>
            </Card>  
    )
}

export default VolunteerAvailability