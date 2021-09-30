import React, { useState, useEffect } from 'react'
import * as dateFns from 'date-fns'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Calendar.css"

function UserCalendar(props) {
  const [currentMonth, cCurrentMonth] = useState(new Date())
  const [userBooking, cUserBooking] = useState(false)
  const [currentDate, cCurrentDate] = useState(new Date())
  const [sort, cSort] = useState('showAll')
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
    }
  ])
  const [volunteers, cVolunteers] = useState([
    {id: '1',
    userName: 'Thomasn1',
    location: 'Sheffield',
    role: 'volunteer',
    firstName: 'Thomas',
    email: 'tom@gmail.com'
    },
    {id: '2',
    userName: 'Jenny12m',
    location: 'Sheffield',
    role: 'volunteer',
    firstName: 'Jenny',
    email: 'jenny@gmail.com'
    }
  ])
  const [users, cUsers] = useState([
    {id: '1',
    userName: 'Pauln1',
    location: 'Sheffield',
    role: 'user',
    firstName: 'Paul'
    },
    {id: '2',
    userName: 'Jenny12m',
    location: 'Sheffield',
    role: 'user',
    firstName: 'Jenny'
    }
  ])
  const [sessions, cSessions] = useState([
  { volunteer: 'Thomas',
    users: ['3'],
    location: 'Sheffield',
    date: '7 September 2021',
    timeStart: '14:00',
    timeEnd: '15:00',
    limit: 1,
    id:'1a'
  },
  { volunteer: 'Jenny',
    users: ['1'],
    location: 'Sheffield',
    date: '6 September 2021',
    timeStart: '16:00',
    timeEnd: '17:00',
    limit: 2,
    id:'2a'
  },
  {volunteer: 'Jenny',
  users: [],
  location: 'Sheffield',
  date: '17 September 2021',
  timeStart: '13:00',
  timeEnd: '14:00',
  limit: 5,
  id:'3a'
  },])

  const [allSessions, cAllSessions] = useState([])
  const [allUsers, cAllUsers] = useState([])
  const [allVolunteers, cAllVolunteers] = useState([])
  const [allMembers, cAllMembers] = useState([])

  const refreshList = () => {
    props.client.getSessions().then((response) => cAllSessions(response.data))
    props.client.getUsers().then((response) => cAllUsers(response.data))
    separateByRole()
  }

  const addUser = (id, user) => {
    props.client.addSessionUser(id, user)
  }

  const removeUser = (id, user) => {
    props.client.removeSessionUser(id, user)
  }

  // separate volunteers from service users
  const separateByRole = () => {
    allUsers.forEach((user) => {
      if (user.role === 'user') {
        allMembers.push(user)
      } else if (user.role === 'volunteer') {
        allVolunteers.push(user)
      }
    })
  }

  useEffect(() => {
    refreshList();
  }, [])

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

  const buildDayName = (day, i) => {
    return (<div className='col col-center' key={i}>
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

  // puts sessions into the corrent calendar cell
  // const showSessions = (day) => {
  //   return sessions.map((session, i) => {
  //     const sessionDate = new Date(session.date)
  //     if (sessionDate.getTime() === day.getTime()) {
  //         return displaySessions(session, i)
  //     } 
  //   }) 
  // }

  const showSessions = (day) => {
    return allSessions.map((session, i) => {
      const sessionDate = new Date(session.date)
      if (sessionDate.getTime() === day.getTime()) {
          return displaySessions(session, i)
      } 
    }) 
  }

  // builds invidual session entries in calendar 
  // const sessionEntry = (session, i) => {
  //   return (
  //     <OverlayTrigger key = {i} trigger = 'click' placement = 'bottom' overlay = {popoverClick(session)} rootClose>
  //       <li className = 'dis-session-info li-show-sessions' 
  //       style={{ backgroundColor : session.users.includes(users[0].id) ? '#5Cb85C': session.users.length === session.limit ? 'White' : '#0D6EFD', 
  //       color : session.users.length === session.limit ? 'rgb(170, 163, 163)' : 'White'}} 
  //       >
  //         {session.timeStart}{' '}{displaySessionDescription(session.limit).name}
  //       </li>
  //     </OverlayTrigger>
  //   )
  // }

  const sessionEntry = (session, i) => {
    return (
      <OverlayTrigger key = {i} trigger = 'click' placement = 'bottom' overlay = {popoverClick(session)} rootClose>
        <li className = 'dis-session-info li-show-sessions' 
        style={{ backgroundColor : session.sessionUsers.includes(users[0].id) ? '#5Cb85C': session.sessionUsers.length === session.userLimit ? 'White' : '#0D6EFD', 
        color : session.sessionUsers.length === session.userLimit ? 'rgb(170, 163, 163)' : 'White'}} 
        >
          {session.sessionTimeStart}{' '}{displaySessionDescription(session.userLimit).name}
        </li>
      </OverlayTrigger>
    )
  }

  // gets information for that particular session
  // const displaySessions = (session, i) => {
  //   if (sort === 'booked' && session.users.includes(users[0].id)) {
  //     return sessionEntry(session,i)
  //   } else if (sort === 'available' && !session.users.includes(users[0].id) && session.users.length < session.limit) {
  //     return sessionEntry(session,i) 
  //   } else if (sort === 'showAll') {
  //     return sessionEntry(session,i)
  //   }
  // }

  const displaySessions = (session, i) => {
    if (sort === 'booked' && session.sessionUsers.includes(users[0].id)) {
      return sessionEntry(session,i)
    } else if (sort === 'available' && !session.sessionUsers.includes(users[0].id) && session.sessionUsers.length < session.userLimit) {
      return sessionEntry(session,i) 
    } else if (sort === 'showAll') {
      return sessionEntry(session,i)
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
        return sessionInfo[0] 
      case 2:
        return sessionInfo[1]
      case 5:
        return sessionInfo[2]
      default:
        break
    }
  }

  // books user into a session
  // const bookingHandler = (e, ses) => {
  //   e.preventDefault()
  //   sessions.forEach((session, index) => {
  //     if (session.id === ses.id) {
  //       sessions[index].users.push(users[0].id)
  //     }
  //   })
  //   cUserBooking(!userBooking) 
  // }

  const bookingHandler = (e, ses) => {
    e.preventDefault()
    allSessions.forEach((session, index) => {
      if (session.id === ses.id) {
        addUser(ses.id, users[0].id)
      }
    })
    cUserBooking(!userBooking) 
  }

  // cancels users session booking
  // const cancelBookingHandler = (e, ses) => {
  //   e.preventDefault()
  //   sessions.forEach((session, index) => {
  //     if (session.id === ses.id) {
  //       sessions[index].users = sessions[index].users.filter((i) => i !== users[0].id)
  //     }
  //   })
  //   cUserBooking(!userBooking) 
  // }

  const cancelBookingHandler = (e, ses) => {
    e.preventDefault()
    allSessions.forEach((session, index) => {
      if (session.id === ses.id) {
        removeUser(ses.id, users[0].id)
      }
    })
    cUserBooking(!userBooking) 
  }

  // displays either book session, cancel booking or fully booked button depending on the user
  // const showBookingButton = (session) => {
  //   if (session.users.includes(users[0].id)) {
  //     return <Button className = 'booking-btn btn-danger' onClick = {(e) => cancelBookingHandler(e, session)}>Cancel booking</Button>
  //   } if (!session.users.includes(users[0].id) && session.users.length === session.limit) {
  //     return <Button className = 'booking-btn btn-secondary'>Fully booked</Button>
  //   } else {
  //     return <Button className = 'booking-btn' onClick = {(e) => bookingHandler(e, session)}>Book session</Button>
  //   }
  // }

  const showBookingButton = (session) => {
    if (session.sessionUsers.includes(users[0].id)) {
      return <Button className = 'booking-btn btn-danger' onClick = {(e) => cancelBookingHandler(e, session)}>Cancel booking</Button>
    } if (!session.sessionUsers.includes(users[0].id) && session.sessionUsers.length === session.userLimit) {
      return <Button className = 'booking-btn btn-secondary'>Fully booked</Button>
    } else {
      return <Button className = 'booking-btn' onClick = {(e) => bookingHandler(e, session)}>Book session</Button>
    }
  }

  // const findVolunteerName = (session) => {
  //   return volunteers.map((volunteer) => {
  //     if (session.users.includes(users[0].id) && volunteer.firstName === session.volunteer){
  //       return 'Session volunteer: ' + volunteer.firstName
  //     }}
  //   )
  // }

  const findVolunteerName = (session) => {
    return allVolunteers.map((volunteer) => {
      if (session.sessionUsers.includes(users[0].id) && volunteer._id === session.volunteer){
        return 'Session volunteer: ' + volunteer.nameFirst + ' ' + volunteer.nameLast
      }}
    )
  }

  // const findVolunteerEmail = (session) => {
  //   return volunteers.map((volunteer) => {
  //     if (session.users.includes(users[0].id) && volunteer.firstName === session.volunteer){
  //       return 'Volunteer contact: ' + volunteer.email
  //     }}
  //   )
  // }

  const findVolunteerEmail = (session) => {
    return allVolunteers.map((volunteer) => {
      if (session.sessionUsers.includes(users[0].id) && volunteer._id === session.volunteer){
        return 'Volunteer contact: ' + volunteer.email
      }}
    )
  }

  // session calendar popover
  // const popoverClick = (session) => (
  //   <Popover className = 'popover-main' id='popover-trigger-click' title='Popover bottom'>
  //     <Card className = 'popover-card'>
  //       <Card.Body className = 'popover-body'>
  //         <Row className = 'session-name'>
  //           {displaySessionDescription(session.limit).name}
  //         </Row>
  //         <Row>
  //           {session.date}{' '}{session.timeStart}{'-'}{session.timeEnd}
  //         </Row>
  //         <Row>
  //           <Col className = 'location-icon' xs='auto'>
  //             <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'>
  //             <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/>
  //             </svg>  
  //           </Col> 
  //           <Col className = 'location-text'>{session.location}</Col>
  //         </Row>
  //         <Row className = 'session-description'>
  //           {displaySessionDescription(session.limit).description}
  //         </Row>
  //         <Row>
  //           {displaySessionDescription(session.limit).cost}
  //         </Row>
  //         <Row className = 'session-volunteer'>
  //           {findVolunteerName(session)}
  //         </Row>
  //         <Row>
  //           {findVolunteerEmail(session)}
  //         </Row>
  //         <Row className = 'booking-btn-row'>
  //           {showBookingButton(session)}
  //         </Row>
  //       </Card.Body>
  //     </Card>
  //   </Popover>
  // )
  const popoverClick = (session) => (
    <Popover className = 'popover-main' id='popover-trigger-click' title='Popover bottom'>
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
    renderHeader()
    renderDays()
    renderCells()
  }, [userBooking])

  return (
    <div className = 'calendar'>
      {renderHeader()}
      {renderFilters()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default UserCalendar