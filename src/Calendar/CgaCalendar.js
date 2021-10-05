import React, { useState, useEffect } from 'react'
import * as dateFns from 'date-fns'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Calendar.css"

function CgaCalendar(props) {
  const [currentMonth, cCurrentMonth] = useState(new Date())
  const [currentDate, cCurrentDate] = useState(new Date())
  const [location, cLocation] = useState('showAll')
  const [locations, cLocations] = useState([])
  const [sessions, cSessions] = useState([])
  const [users, cUsers] = useState([])
  const [sessionInfo, cSessionInfo] = useState([
    {name: 'One-to-One Coaching',
    description:'These person-centred sessions are delivered by one of our trained team at a local golf club. The service provides an enjoyable & rewarding day for the golfer PLUS a deserved respite break for carers. No golfing experience is necessary.',
    cost: '£20 per hour'
    },
    {name: 'The Perfect Three Ball',
    description:'Two golfers enjoying golf & companionship with a member of our team at a local golf club. This service provides an enjoyable & rewarding day out, the chance to make new friends and a well deserved respite break for carers. No golfing experience is necessary.',
    cost: '£15 per hour'
    },
    {name: 'Group Session',
    description:'At present we’re limited to the “rule of six”. The sessions are perfect for people who enjoy socialising, being part of a team and group coaching.',
    cost: '£10 per hour'
    },
    {name: 'No session info to show',
    description:'No session with such user limit',
    cost: 'No session info to show'
    }
  ])
 
  // gets all the sessions, users and locations from the database

  const refreshList = () => {
    props.client.getSessions().then((response) => cSessions(response.data))
    props.client.getUsers().then((response) => cUsers(response.data))
    props.client.getLocations().then((response) => cLocations(response.data))
  }
  // get all unique session locations

  const sessionLocations = () => {
    let loc = []
    locations.forEach((location) => {
      loc.push(location.locationName)
    })
    return loc
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
              <li className = 'bullet-green bullet-blue'><span className = 'bullet-text'> Available to book</span></li>
              <li className = 'bullet-green bullet-gray'><span className = 'bullet-text'> Fully booked</span></li>
            </ul>
          </Col>
          <Col lg = {3} md = {4} className = 'dropdown-name cga-filter text-lg-end'>Filter calendar by location:</Col>
          <Col lg = {2} md = {3} className = 'user-filter-dropdown text-lg-end'>
            <select className = 'dropdown-list' onChange = {(e) => cLocation(e.target.value)} value = {location}>
                  <option value = {'showAll'}>Show All</option>
                  {sessionLocations().map((location) => (
                  <option value = {location}>{location}</option>))}
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
        formattedDate = dateFns.format(day, dateFormat);
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
    return <div className = 'body'>{rows}</div>;
  }

  // shows sessions in the calendar cell for that specific day

  const showSessions = (day) => {
    return sessions.map((session, i) => {
      const sessionDate = new Date(session.date)
      if (sessionDate.getTime() === day.getTime()){
          return displaySessions(session, i)
      } 
    }) 
  }

  // session HTML to display in calendar cell 

  const sessionEntry = (session, i) => {
    return (
      <OverlayTrigger key = {i} trigger='click' placement='bottom' overlay={popoverClick(session)} rootClose>
        <li className = 'dis-session-info li-show-sessions' 
        style={{ backgroundColor : session.sessionUsers.length < session.userLimit ? '#0D6EFD' : '#62666b', 
        color : 'White'}} 
        >
          {session.sessionTimeStart}{' '}{displaySessionDescription(session.userLimit).name}
        </li>
      </OverlayTrigger>
    )
  }

  // displays the session based on filter

  const displaySessions = (session, i) => {  
    if (location === session.sessionLocation ) {
      return sessionEntry(session,i) 
    } else if (location === 'showAll') {
      return sessionEntry(session,i) 
    } 
  }

  // switches calendar to next month

  const nextMonth = () => {
    cCurrentMonth(dateFns.addMonths(currentMonth, 1))
  }

  // switches calendar to previous month

  const prevMonth = () => {
    cCurrentMonth(dateFns.subMonths(currentMonth, 1))
  }

  // displays correct session details based on the user limit

  const displaySessionDescription = (limit) => {
    switch(limit) {
      case 1:
        return sessionInfo[0] 
      case 2:
        return sessionInfo[1]
      case 5:
        return sessionInfo[2]
      default:
        return sessionInfo[3]
    }
  }

  const findVolunteerName = (session) => {
    return users.map((volunteer) => {
      if (volunteer._id === session.volunteer){
        return 'Session volunteer: ' + volunteer.nameFirst + ' ' + volunteer.nameLast
      }}
    )
  }

  const findVolunteerEmail = (session) => {
    return users.map((volunteer) => {
      if (volunteer._id === session.volunteer){
        return 'Volunteer contact: ' + volunteer.email
      }}
    )
  }

  const displayMemberNames = (session) => {
    let members = []
    users.map((user) => {
      if (session.sessionUsers.includes(user._id)) {
        members.push(user.nameFirst + ' ' + user.nameLast + ' ')
      }
    })
    return members.join(', ')
  }

  // session calendar popover

  const popoverClick = (session) => (
    <Popover className = 'popover-main' id = 'popover-trigger-click' title = 'Popover bottom'>
      <Card className = 'popover-card'>
        <Card.Body className = 'popover-body'>
          <Row className = 'session-name'>
            {displaySessionDescription(session.userLimit).name}
          </Row>
          <Row>
            {session.date}{' '}{session.sessionTimeStart}{'-'}{session.sessionTimeFinish}
          </Row>
          <Row>
            <Col className = 'location-icon' xs='auto'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'>
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
          <Row className = 'members-attending'>
            {'Members attending: '}{displayMemberNames(session)}
          </Row>
          <Row>
            {'Available places: '}{session.userLimit - session.sessionUsers.length}
          </Row>
          <Row className = 'session-volunteer'>
            {findVolunteerName(session)}
          </Row>
          <Row>
            {findVolunteerEmail(session)}
          </Row>
        </Card.Body>
      </Card>
    </Popover>
  )

  useEffect(() => {
    refreshList();
  }, [])

  return (
    <div className = 'calendar-main'>
      <div className = 'calendar'>
      {renderHeader()}
      {renderFilters()}
      {renderDays()}
      {renderCells()}
      </div>
    </div>
  )
}

export default CgaCalendar