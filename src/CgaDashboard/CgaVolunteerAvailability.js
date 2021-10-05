import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import './Cga.css'
import React, { useState, useEffect } from "react"

function VolunteerAvailability(props) {
    const [volunteers, cVolunteers] = useState([])

    const refreshList = () => {
        props.client.getUserByRole('volunteer').then((response) => cVolunteers(response.data))
        console.log(volunteers)
    }

    const sessionVolunteers = () => {
        let volunteerArray = []
        volunteers.forEach((volunteer) => {
            volunteerArray.push(volunteer.nameFirst + ' ' + volunteer.nameLast)
        })
        return volunteerArray
    }


    useEffect(() => {
    refreshList();
    }, [])


    // builds volunteer availabilit table

    const buildrows = () => {
        if (volunteers.length > 0) {
            return volunteers.map((current) => {
                return <tr key={current._id}>
                <td>{current.nameFirst + ' ' + current.nameLast}</td>
                <td>{current.userName}</td>
                <td><input type="checkbox" name="mon" />&nbsp;</td>
                <td><input type="checkbox" name="tue" />&nbsp;</td>
                <td><input type="checkbox" name="wed" />&nbsp;</td>
                <td><input type="checkbox" name="thu" />&nbsp;</td>
                <td><input type="checkbox" name="fri" />&nbsp;</td>
                <td><input type="checkbox" name="sat" />&nbsp;</td>
                <td><input type="checkbox" name="sun" />&nbsp;</td>
                </tr>
            })
        } else {
            return (
            <tr className = 'no-events-to-show'>
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