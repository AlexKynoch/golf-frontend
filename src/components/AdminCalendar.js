import React, { useState, useEffect } from 'react'
import * as dateFns from 'date-fns'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Calendar.css";
import Autocomplete from "./AutoComplete";
import "./autoComplete.css";

function AdminCalendar(props) {
  const [currentMonth, cCurrentMonth] = useState(new Date())
  const [userBooking, cUserBooking] = useState(false)
  const [currentDate, cCurrentDate] = useState(new Date())
  const [currentUser, cCurrentUser] = useState(undefined)
  const [sessions, cSessions] = useState([])
  const [users, cUsers] = useState([])
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
    },
    {name: 'No session info to show',
    description:'No session with such user limit',
    cost: 'No session info to show'
    }
  ])
  const [usersOld, cUsersOld] = useState([
    {id: '1',
    userName: 'Pauln1',
    location: 'Sheffield',
    role: 'user',
    firstName: 'Paul'
    }
  ])

  const [autoCompleteInput, cAutoCompleteInput] = useState('');

  // gets all the sessions and users from the database

  const refreshList = () => {
    props.client.getSessions().then((response) => cSessions(response.data))
    props.client.getUsers().then((response) => cUsers(response.data))
  }

  // make an array of all database users and their usernames

  const userList = () => {
    let userArray = []
    users.map((user) => {
      if (user.role === 'user'){
      userArray.push(user.nameFirst + ' ' + user.nameLast + ' - ' + user.userName)
      }
    })
    return userArray
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
          <div className = 'icon' onClick={() => prevMonth()}>
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
              <li className = 'bullet-green'><span className = 'bullet-text'>Booked sessions for the selected user</span></li>
              <li className = 'bullet-green bullet-blue'><span className = 'bullet-text'> Available to book</span></li>
              <li className = 'bullet-green bullet-gray'><span className = 'bullet-text'> Fully booked</span></li>
            </ul>
          </Col>
          <Col md={7}>
            <Row>
              <div>
                <div className = 'dropdown-container'>
                    <div className = 'dropdown-name'>Filter calendar by available sessions:</div> 
                      <select className = 'dropdown-list' onChange = {(e) => cSort(e.target.value)} value={sort}>
                          <option className = 'dropdown-option' value = {'showAll'}>Show All</option>
                          <option className = 'dropdown-option' value = {'available'}>Available Sessions</option>
                      </select>
                  </div>
              </div> 
            </Row>
            <Row className = 'search-input'>
            {renderSearchBar()} 
            </Row>
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
        );
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

    let sessionsToDisplay =  sessions.map((session, i) => {
      const sessionDate = new Date(session.date)
      if (sessionDate.getTime() === day.getTime()) {
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
      <OverlayTrigger key = {i} trigger='click' placement='bottom' overlay={popoverClick(session)} rootClose>
        <li className = 'dis-session-info li-show-sessions' 
        style={{ backgroundColor : currentUser !== undefined && session.sessionUsers.includes(currentUser)? 'Green' : session.sessionUsers.length < session.userLimit ? '#0D6EFD' : '#62666b', 
        color : 'White'}} 
        >
          {session.sessionTimeStart}{' '}{displaySessionDescription(session.userLimit).name}
        </li>
      </OverlayTrigger>
    )
  }

  // gets information for that particular session

  const displaySessions = (session, i) => {
    const sessionDateTime = new Date(session.date + ' ' + session.sessionTimeStart)  
    if (sort === 'available'  && session.sessionUsers.length < session.userLimit && !session.sessionUsers.includes(currentUser)) {
      return [sessionEntry(session,i), sessionDateTime] 
    } else if (sort === 'showAll') {
      return [sessionEntry(session,i), sessionDateTime]
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

  // books user into a session

  const bookingHandler = (e, ses) => {
    e.preventDefault()
    if (currentUser) {
    sessions.forEach((session) => {
      if (session._id === ses._id && currentUser !== undefined) {
        addUser(ses._id, currentUser)
      }
    })
  }
  }

  // cancels booking for the selected user

  const cancelBookingHandler = (e, ses) => {
    e.preventDefault()
    sessions.forEach((session) => {
      if (session.id === ses.id) {
        removeUser(ses._id, currentUser)
      }
    })
  }

  // displays either book session, cancel booking or fully booked button depending on the user

  const showBookingButton = (session) => {
    if (session.sessionUsers.includes(currentUser)) {
      return <Button className = 'booking-btn btn-danger' onClick = {(e) => cancelBookingHandler(e, session)}>Cancel booking</Button>
    } if (!session.sessionUsers.includes(currentUser) && session.sessionUsers.length === session.userLimit) {
      return <Button className = 'booking-btn btn-secondary'>Fully booked</Button>
    } else {
      return <Button className = 'booking-btn' onClick = {(e) => bookingHandler(e, session)}>Book session</Button>
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

  // displays search bar to search sessions for a specified user
  
  const renderSearchBar = () => {
    let suggestions = userList()
    return ( 
            <form className = 'user-search-form' onSubmit = {(e) => userSubmitHandler(e, suggestions)} id = 'addUserSearchForm'>
                <label className = 'user-search-form-label' for='userform'>Search sessions by user: </label>
                 <Autocomplete input = {autoCompleteInput} setInput = {cAutoCompleteInput}
                      suggestions = {suggestions}
                  />
                <Button className = 'user-submit' type = 'submit'>Search</Button> 
                <Button className = 'show-all' onClick = {() => showAll()}>Show All</Button>
            </form>
    )
  }

  
  // searches for all the sessions for a specified user

  const userSubmitHandler = (e, suggestions) => {
    e.preventDefault()
    if (suggestions.includes(e.target.user.value)) {
      let userName = e.target.user.value.split('- ')
      users.forEach((user) => {
        if(userName[1] === user.userName) {
          cCurrentUser(user._id)
        }
      })
    } else {
      cCurrentUser(undefined)
    }     
  }

  // show all sessions

  const showAll = () => {
    cCurrentUser(undefined)
    cAutoCompleteInput('')
  }

  // books session for a user inside popover

  const adminUserBooking = (session) => {
    return (
    <form className = 'user-book-form' onSubmit = {(e) => adminUserBookingHandler(e, session)} id = 'adminUserBookingForm'>
      <label className = 'user-book-form-label' for='userform'>Book for a user: </label>
      <input 
        className = 'book-field' 
        type = 'text' 
        name = 'user' 
        placeholder = 'Select user...' 
        autoComplete = 'off'
        id = 'userform'
      />
      <Button className = 'booking-submit' type = 'submit'>Book</Button> 
  </form>)
  }

  // adds user to session users inside popover

  const adminUserBookingHandler = (e, ses) => {
    e.preventDefault()
    sessions.forEach((session, index) => {
      if (session._id === ses._id) {
        addUser(ses._id, e.target.user.value)
      }
    })
    document.getElementById('adminUserBookingForm').reset()
}

// make an array of all the users booked into the session
  
const sessionBookedUsers = (session) => {
  let userArray = []
  let finalArray = []
  sessions.forEach((ses) => {
    if (ses._id === session._id) {
      userArray.push(ses.sessionUsers)
    }
  })

  for (let i = 0; i < userArray[0].length; i++) {
    users.forEach((user) => {
      if (user._id === userArray[0][i]) {
        finalArray.push(user.nameFirst + ' ' + user.nameLast + ' - ' + user.userName)
      }
    })
  }
  return finalArray
}

  // cancels session for a user inside popover

  const adminUserCancelBooking = (session) => {
    let suggestions = sessionBookedUsers(session)
    return (
      <form className = 'user-book-form' onSubmit = {(e) => adminUserCancelHandler(e, session, suggestions)} id = 'adminUserCancelForm'>
        <label className = 'user-book-form-label' for='userform'>Cancel booking for a user: </label>
        <Autocomplete input = {autoCompleteInput} setInput = {cAutoCompleteInput}
                      suggestions = {suggestions}
                  />
        <Button className = 'btn-danger booking-submit' type = 'submit'>Cancel booking</Button> 
      </form>)
  }

  // cancels user session booking inside popover
 
  const adminUserCancelHandler = (e, ses, suggestions) => {
    e.preventDefault()
    if (suggestions.includes(e.target.user.value)) {
      let userName = e.target.user.value.split('- ')
      let userId
      users.forEach((user) => {
        if(userName[1] === user.userName) {
          userId = user._id
        }
      })
      sessions.forEach((session) => {
        if (session._id === ses._id) {
          removeUser(ses._id, userId)
        }
      })
    } 
    cAutoCompleteInput('')
  }

  // displays user booking input fields inside popover

  const showBookingInput = (session) => {
    if (session.sessionUsers.length === session.userLimit) {
      return (
        <div>
          <Button className = 'btn-secondary'>Fully booked</Button>
          {adminUserCancelBooking(session)}
        </div>
      )
    } else {
        return (
          <div>
            {adminUserBooking(session)}
            {adminUserCancelBooking(session)}
          </div>
        )
    }
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
          <Row>
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
          <Row className = 'booking-btn-row '>
            {currentUser ? showBookingButton(session) : ""}
          </Row>
          <Row className = 'admin-user-booking-buttons'>
            {currentUser ? "" : showBookingInput(session)}
          </Row>
        </Card.Body>
      </Card>
    </Popover>
  )

  useEffect(() => {
    refreshList();
  }, [])

  return (
    <div className='calendar'>
      {renderHeader()}
      {renderFilters()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default AdminCalendar