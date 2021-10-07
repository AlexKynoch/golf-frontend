import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'

function VolunteerAvailability(props) {
    const [volunteers, cVolunteers] = useState([])
    const [location, cLocation] = useState('Newcastle')
    const [radios, cRadios] = useState([]);

    const refreshList = () => {
        props.client.getUserByRole('volunteer').then((response) => cVolunteers(response.data))
        props.client.getUser('615d7fb42d2b095a0593e6d7').then((response) => {cRadios(response.data[0]['availability'])})
    }

    // return an array of volunteers in the area

    const sessionVolunteers = () => {
        let volunteerArray = []
        volunteers.forEach((volunteer) => {
            if (volunteer.location === location) {
                volunteerArray.push(volunteer)
            }
        })
        return volunteerArray
    }

    // builds volunteer availability table

    const buildrows = () => {
        if (sessionVolunteers().length > 0) {
            return sessionVolunteers().map((current) => {
                return <tr key={current._id}>
                <td>{current.nameFirst + ' ' + current.nameLast}</td>
                <td>{current.userName}</td>
                <td><input type = 'checkbox' id = 'mon' readOnly checked={current.availability[0][1]}/>&nbsp;</td>
                <td><input type = 'checkbox' id = 'tue' readOnly checked={current.availability[1][1]}/>&nbsp;</td>
                <td><input type = 'checkbox' id = 'wed' readOnly checked={current.availability[2][1]}/>&nbsp;</td>
                <td><input type = 'checkbox' id = 'thu' readOnly checked={current.availability[3][1]}/>&nbsp;</td>
                <td><input type = 'checkbox' id = 'fri' readOnly checked={current.availability[4][1]}/>&nbsp;</td>
                <td><input type = 'checkbox' id = 'sat' readOnly checked={current.availability[5][1]}/>&nbsp;</td>
                <td><input type = 'checkbox' id = 'sun'readOnly checked={current.availability[6][1]} />&nbsp;</td>
                </tr>
            })
        } else {
            return (
            <tr className = 'no-volunteers-to-show'>
                <td colSpan = '9'>{'No volunteers to show'}</td>
            </tr>
            )
        }
    }

    useEffect(() => {
        refreshList();
        }, [])
   
    return (
        <Card id = 'myProfile' className = 'profile-card volunteer-availability-card' >
            <Card.Body className = 'profile-card-body'>
            <Card.Title className = 'profile-card-title'>Volunteer Availability</Card.Title>
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