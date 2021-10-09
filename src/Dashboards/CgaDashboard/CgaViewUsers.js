import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import NavBar from "./../../NavBar"

function ViewUsers(props) {
    const [users, cUsers] = useState([])
    const [currentCgaLocation, cCurrentCgaLocation] = useState([])
    const [sort, cSort] = useState('all')
    const links = [
        false,
        { name: "Dashboard", url: "/cga/dashboard" },
        { name: "Create Session", url: "/cga/create-session" },
        { name: "View Users", url: "/cga/view-users" },
        { name: "Log Out", url: "/home" },
    ]
    
    const refreshList = () => {
        props.client.getAdminById('615d7e616d365c85eff5f442').then((response) => cCurrentCgaLocation(response.data[0].location))
        props.client.getUserByLocation(currentCgaLocation).then((response) => cUsers(response.data))
    }

    // return an array of users and volunteers

    const usersVolunteers = () => {
        let array = []
        users.forEach((user) => {
            if(user.role === 'volunteer' || user.role === 'user') {
                array.push(user)
            }
        })
        return array
    }

    // if no additional user details in database, return empty string

    const detailsString = (user) => {
        if(user.details === 'String') {
            return ' '
        } else {
            return user.details
        }
    }

    // replace user with customer

    const userToCustomer = (user) => {
        if(user.role === 'user') {
            return 'customer'
        } else {
            return user.role
        }
    }

    // filter table by user role

    const dropDown = () => {
        return (
          <div>
            <div className = 'dropdown-container cga-dropdown-container'>
                <div className = 'dropdown-name'>Sort by role:</div>
                    <select className = 'dropdown-list' onChange={(e) => cSort(e.target.value)} value={sort}>
                        <option value = {'all'}>All</option>
                        <option value = {'customers'}>Customers</option>
                        <option value = {'volunteers'}>Volunteers</option>
                    </select>
            </div>
          </div>
        )
    }

    // build individual table row

    const singleRow = (current) => {
        return (
            <tr key={current._id}>
            <td>{current.nameFirst + ' ' + current.nameLast}</td>
            <td>{current.userName}</td>
            <td>{current.location}</td>
            <td>{userToCustomer(current)}</td>
            <td>{current.email}</td>
            <td>{current.phone}</td>
            <td>{detailsString(current)}</td>
            </tr>
        )
    }

    // build table depending on the applied filter

    const buildrows = () => {
        if (usersVolunteers().length > 0) {
            if (sort === 'all') {
                return usersVolunteers().map((current) => {
                    return singleRow(current);
                })
            } else if (sort === 'customers') {
                return usersVolunteers().map((current) => {
                    if (current.role === 'user') {
                        return singleRow(current)
                    }
                })
            } else if (sort === 'volunteers') {
                return usersVolunteers().map((current) => {
                    if (current.role === 'volunteer') {
                        return singleRow(current)}
                })
            }
        } else {
            return (
                <tr className = 'no-users-to-show'>
                    <td colSpan = '5'>{'No users to show'}</td>
                </tr>
            )
        }
    }

    useEffect(() => {
        refreshList();
        }, [])
      
    return (
        <div>
            <div className="navOffset">
                <NavBar links = {links} />
            </div>
            <Card id = 'myProfile' className = 'profile-card registered-users-table' >
                <Card.Body className = 'profile-card-body'>
                <Card.Title className = 'profile-card-title'>All registered users in the area</Card.Title>
                {dropDown()}
                    <Table responsive className = 'event-table'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Location</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Additional information</th>
                        </tr>
                    </thead>
                    <tbody>{buildrows()}</tbody>
                    </Table>    
                </Card.Body>
            </Card>
        </div>
    )
}

export default ViewUsers