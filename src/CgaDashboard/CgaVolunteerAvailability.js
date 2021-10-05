import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import './Cga.css'
import React, { useState, useEffect } from "react"

function VolunteerAvailability(props) {
    const [volunteers, cVolunteers] = useState([])

    const refreshList = () => {
        props.client.getUserByRole('volunteer').then((response) => cVolunteers(response.data))
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
                <td>{current.nameFirst}</td>
                <td>{current.userName}</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
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