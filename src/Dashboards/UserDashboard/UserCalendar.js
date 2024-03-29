import React, { useState, useEffect } from 'react'
import * as dateFns from 'date-fns'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import sessionInfo from "./../../CalendarComponents/sessionInfo"
import sessionDate from "./../../CalendarComponents/sessionDate"
import NavBar from '../../NavBar'

function UserCalendar(props) {
  const [currentMonth, cCurrentMonth] = useState(new Date())
  const [sort, cSort] = useState('showAll')
  const [sessions, cSessions] = useState([])
  const [users, cUsers] = useState([])
  const currentUser = props.currentUser._id
  const currentLocation = props.currentUser.location
  const currentDate = new Date()
  const links = [
    false,
    { name: "Calendar", url: "/customer/calendar" },
    { name: "Profile", url: "/customer/profile" }
  ]
 
  // gets all the sessions and users from the database

  const refreshList = () => {
    props.client.getSessionByLocation(currentLocation).then((response) => cSessions(response.data))
    props.client.getUsers().then((response) => cUsers(response.data))
  }

  // adds user to session users (booking)

  const addUser = async (id, user) => {
    const res = await props.client.addSessionUser(id, user)
    const updated = sessions.map((session) => {
      if(session._id === id){
        session.sessionUsers = res.data.body.sessionUsers
      }
      return session
    })
    cSessions(updated)
  }
  
  // removes user from session users (booking cancellation)

  const removeUser = async (id, user) => {
    const res = await props.client.removeSessionUser(id, user)
    const updated = sessions.map((session) => {
      if(session._id === id){
        session.sessionUsers = res.data.body.sessionUsers
      }
      return session
    })
    cSessions(updated)
  }

  // renders calendar header

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy'
    return (
      <div className = 'header row flex-middle'>
        <div className = 'col col-start'>
          <div className = 'icon' onClick = {() => prevMonth()}>
            chevron_left
          </div>
        </div>
        <div className = 'col col-center'>
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>
        <div className = 'col col-end' onClick = {() => nextMonth()}>
          <div className = 'icon'>chevron_right</div>
        </div>
      </div>
    )
  }

  // renders calendar key and filters

  const renderFilters = () => {
    return (
      <Row className = 'filters'>
        <Col className = 'bullet-list'>
          <ul className = 'filter-list-bullet'>
            <li className = 'bullet-green'><span className = 'bullet-text'>Booked sessions</span></li>
            <li className = 'bullet-green bullet-blue'><span className = 'bullet-text'> Sessions available to book</span></li>
          </ul>
        </Col>
        <Col lg = {5} md = {4} className = 'dropdown-name user-filter'>Filter calendar by your booked sessions or sessions still available to book:</Col>
        <Col lg = {2} md = {3} className = 'user-filter-dropdown'> 
          <select className = 'dropdown-list' onChange={(e) => cSort(e.target.value)} value={sort}>
            <option className = 'dropdown-option' value={'showAll'}>Show All</option>
            <option className = 'dropdown-option' value={'booked'}>Booked Sessions</option>
            <option className = 'dropdown-option' value={'available'}>Available Sessions</option>
          </select> 
        </Col>
      </Row>
    )
  }

  // displays names of days in calendar

  const buildDayName = (day, i) => {
    return (
      <div className='col col-center' key={i}>
        {day}
      </div>)
  }

  // renders calendar days

  const renderDays = () => {
    const shortDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    const longDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let days
    if (window.innerWidth < 768) {
      days = shortDays.map((day, i) => buildDayName(day, i))
    } else {
      days =  longDays.map((day, i) => buildDayName(day, i))
    }
    return <div className='days row'>{days}</div>
  }

  // renders calendar cells
  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = dateFns.endOfWeek(monthEnd)
    const dateFormat = 'd'
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        days.push(
          <div 
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, currentDate) ? 'selected' : ''
            }`}
            key={day} 
          >
            <span className='number'>{formattedDate}</span>
            <span><ul className = 'ul-show-sessions'>{showSessions(day)}</ul></span>
          </div>
        )
        day = dateFns.addDays(day, 1); 
      }
      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      ) 
      days = []
    }
    return <div className='body'>{rows}</div>
  }

  // shows sessions in the calendar cell for that specific day

  const showSessions = (day) => {
    let sessionsArray = []
    let finalSessionsArray = []
    const dateFormat = 'yyyy-MM-dd'
    const formattedDay = dateFns.format(day, dateFormat)

    let sessionsToDisplay =  sessions.map((session, i) => {
      if (session.date === formattedDay) {
          return displaySessions(session, i)
      } 
    })

    for (let i = 0; i < sessionsToDisplay.length; i++) {
      if (sessionsToDisplay[i] !== undefined) {
        sessionsArray.push(sessionsToDisplay[i])
      }
    }

    let sortedArray = sessionsArray.sort((a, b) => a[1] - b[1])
    for (let i = 0; i < sortedArray.length; i++) {
      finalSessionsArray.push(sortedArray[i][0])
    }
    return finalSessionsArray
  }

  // session HTML to display in calendar cell

  const sessionEntry = (session, i) => {
    return (
      <OverlayTrigger key = {i} trigger = 'click' placement = 'bottom' overlay = {popoverClick(session)} rootClose>
        <li className = 'dis-session-info li-show-sessions' 
        style={{ backgroundColor : session.sessionUsers.includes(currentUser) ? '#5Cb85C': session.sessionUsers.length === session.userLimit ? 'White' : '#0D6EFD', 
        color : session.sessionUsers.includes(currentUser) ? 'White' : session.sessionUsers.length === session.userLimit ? 'rgb(170, 163, 163)' : 'White'}} 
        >
          {session.sessionTimeStart}{' '}{displaySessionDescription(session.userLimit).name}
        </li>
      </OverlayTrigger>
    )
  }

  // displays the session based on filter, user's booking and session user limit

  const displaySessions = (session, i) => {
    const sessionDateTime = new Date(session.date + ' ' + session.sessionTimeStart)
    if (sort === 'booked' && session.sessionUsers.includes(currentUser)) {
      return [sessionEntry(session,i), sessionDateTime]
    } else if (sort === 'available' && !session.sessionUsers.includes(currentUser) && session.sessionUsers.length < session.userLimit) {
      return [sessionEntry(session,i), sessionDateTime]
    } else if (sort === 'showAll') {
      return [sessionEntry(session,i), sessionDateTime]
    }
  }

  // switches calendar to next month

  const nextMonth = () => {
    cCurrentMonth(dateFns.addMonths(currentMonth, 1))
  };

  // switches calendar to previous month

  const prevMonth = () => {
    cCurrentMonth(dateFns.subMonths(currentMonth, 1))
  };

  // displays correct session details based on the user limit

  const displaySessionDescription = (limit) => {
    switch(limit) {
      case 1:
        return sessionInfo()[0] 
      case 2:
        return sessionInfo()[1]
      case 5:
        return sessionInfo()[2]
      default:
        return sessionInfo()[3]
    }
  }

  // books user into a session

  const bookingHandler = async (e, ses) => {
    e.preventDefault()
    sessions.forEach(async (session) => {
      if (session._id === ses._id) {
        addUser(ses._id, currentUser)
      }
    })
  }

  // cancels booking for the user
  
  const cancelBookingHandler = async (e, ses) => {
    e.preventDefault()
    sessions.forEach(async (session) => {
      if (session._id === ses._id) {
        removeUser(ses._id, currentUser)
      }
    })
  }

  // displays either book session, cancel booking or fully booked button depending on the user

  const showBookingButton = (session) => {
    if (session.sessionUsers.includes(currentUser)) {
      return <Button className = 'btn-danger' onClick = {(e) => cancelBookingHandler(e, session)}>Cancel booking</Button>
    } if (!session.sessionUsers.includes(currentUser) && session.sessionUsers.length === session.userLimit) {
      return <Button className = 'btn-secondary'>Fully booked</Button>
    } else {
      return <Button className = 'btn-book-session' onClick = {(e) => bookingHandler(e, session)}>Book session</Button>
    }
  }

  const findVolunteerName = (session) => {
    return users.map((volunteer) => {
      if (session.sessionUsers.includes(currentUser) && volunteer._id === session.volunteer){
        return 'Session volunteer: ' + volunteer.nameFirst + ' ' + volunteer.nameLast
      }}
    )
  }

  const findVolunteerEmail = (session) => {
    return users.map((volunteer) => {
      if (session.sessionUsers.includes(currentUser) && volunteer._id === session.volunteer){
        return 'Volunteer contact: ' + volunteer.email
      }}
    )
  }

  const popoverClick = (session) => (
    <Popover className = 'popover-main' id='popover-trigger-click' title='Popover bottom'>
      <Card className = 'popover-card'>
        <Card.Body className = 'popover-body'>
          <Row className = 'session-name'>
            {displaySessionDescription(session.userLimit).name}
          </Row>
          <Row>
            {sessionDate(session)}{' '}{session.sessionTimeStart}{'-'}{session.sessionTimeFinish}
          </Row>
          <Row>
            <Col className = 'location-icon' xs='auto'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-geo-alt-fill' viewBox='0 0 16 16'>
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/>
              </svg>  
            </Col> 
            <Col className = 'location-text'>{session.sessionLocation}</Col>
          </Row>
          <Row className = 'session-description'>
            {displaySessionDescription(session.userLimit).description}
          </Row>
          <Row>
            {displaySessionDescription(session.userLimit).cost}
          </Row>
          <Row className = 'session-volunteer'>
            {findVolunteerName(session)}
          </Row>
          <Row>
            {findVolunteerEmail(session)}
          </Row>
          <Row className = 'booking-btn-row'>
            {showBookingButton(session)}
          </Row>
        </Card.Body>
      </Card>
    </Popover>
  )

  useEffect(() => {
    refreshList();
  }, [])

  return (
    <div>
        <div className="navOffset">
            <NavBar links = {links} client = {props.client} />
        </div>
        <div className = 'calendar'>
          {renderHeader()}
          {renderFilters()}
          {renderDays()}
          {renderCells()}
        </div>
    </div>
  )
}

export default UserCalendar