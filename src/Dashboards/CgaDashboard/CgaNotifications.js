import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

function CgaNotifications(props) {
    const [volunteers, cVolunteers] = useState([])
    const [users, cUsers] = useState([])
    const CgaLocation = props.currentUser.location
    
    const refreshList = () => {
        props.client.getUserByRole('volunteer').then((response) => {cVolunteers(response.data)})
        props.client.getUserByRole('user').then((response) => {cUsers(response.data)})
    }

    // show popover with a list of new volunteers/customers

    const popoverClick = (arr, changer) => (
        <Popover className = 'popover-main notif-overlay' id = 'popover-trigger-click' title = 'Popover bottom'>
              {newUsersCard(arr, changer)}   
        </Popover>
    )

    // count number of new customers/volunteers

    const userNum = (arr) => {
        let counter = 0
        arr.map((user) => {
            if (user.userNew === true) {
                counter += 1
            }
        })
        return counter
    }

    // build a row for each new customer/volunteer

    <volunteer></volunteer>
    const buildRows = (arr, changer) => {
        return arr.map((current) => {
            if (current.userNew === true) {
            return  <tr key={current._id} className = 'notif-user-row'>
                        <td>{current.nameFirst + ' ' + current.nameLast}</td>
                        <td>{current.email}</td>
                        <td>{current.phone}</td>
                        <td className = 'td-center'><button className = 'button-28' onClick = {() => removeNotification(current, changer, arr)}><svg xmlns = 'http://www.w3.org/2000/svg' width = '16' height = '16' fill = 'currentColor' class = 'bi bi-trash' viewBox = '0 0 16 16'>
                        <path d = 'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>
                        <path fill-rule = 'evenodd' d = 'M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>
                        </svg>
                        </button></td>
                    </tr> 
            }              
        })
    }

    // build notification card popup to view a list of new volunteers/customers

    const newUsersCard = (arr, changer) => {
        return (
            <Card id = 'myProfile' className = 'profile-card cga-session-card new-users' >
                <Card.Body className = 'profile-card-body'>
                <Card.Title className = 'profile-card-title'>{arr === users ? 'New customers' : 'New volunteers'}</Card.Title>
                <Table responsive className = 'notification-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Remove</th>
                        </tr> 
                    </thead>
                    <tbody>{buildRows(arr, changer)}</tbody>
                </Table>
                </Card.Body>
            </Card>

        )
    }

    // build main page notification card

    const notificationCard = () => {
        return (
            <Card id = 'myProfile' className = 'profile-card cga-session-card' >
                <Card.Body className = 'profile-card-body'>
                <Card.Title className = 'profile-card-title'>Notifications</Card.Title>
                    <Table responsive className = 'notification-table'>
                        <thead>
                            <tr>
                                <th>New customers</th>
                                <th>{userNum(users)}</th>
                                <th>
                                    <OverlayTrigger classname = 'notif-overlay' trigger = 'click' placement = 'right' overlay = {popoverClick(users, cUsers)} rootClose>
                                        <Button className = 'th-btn button-profile' disabled = {userNum(users) === 0 ? true : false}>View</Button>
                                    </OverlayTrigger>
                                </th>
                            </tr>
                            <tr>
                                <th>New volunteers</th>
                                <th>{userNum(volunteers)}</th>
                                <th>
                                    <OverlayTrigger classname = 'notif-overlay' trigger = 'click' placement = 'right' overlay = {popoverClick(volunteers, cVolunteers)} rootClose>
                                        <Button className = 'th-btn button-profile' disabled = {userNum(volunteers) === 0 ? true : false}>View</Button>
                                    </OverlayTrigger>
                                </th>
                            </tr>   
                        </thead>
                    </Table>
                </Card.Body>
            </Card>

        )
    }

    // remove notification from popup

    const removeNotification = (current, changer, stateArray) => {
        props.client.updateUser(current._id, {userNew: false})
        const newState = stateArray.filter((i) => {
            if(current._id === i._id){
                return false
            }
            return true
        } )
        changer(newState)
    }

    useEffect(() => {
        refreshList();
    }, [])
 
    return (
        <Row className = 'notification-card'>
            <Col>{notificationCard()}</Col>
        </Row>
  
    )
}

export default CgaNotifications