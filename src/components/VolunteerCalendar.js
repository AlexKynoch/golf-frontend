import React, { useState, useEffect } from 'react'
import * as dateFns from 'date-fns'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Calendar.css"

function VolunteerCalendar() {
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
  const [users, cUsers] = useState([
    {id: '1',
    userName: 'Pauln1',
    location: 'Sheffield',
    role: 'user',
    firstName: 'Paul',
    booked:[]
    },
    {id: '2',
    userName: 'Jenny12m',
    location: 'Sheffield',
    role: 'user',
    firstName: 'Jenny',
    booked:[]
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
    users: ['Paul', 'Steven'],
    location: 'Sheffield',
    date: '6 September 2021',
    timeStart: '16:00',
    timeEnd: '17:00',
    limit: 2,
    id:'2a'
  },
  {volunteer: 'Jenny',
  users: ['Terry', 'Doris', 'Helen'],
  location: 'Sheffield',
  date: '17 September 2021',
  timeStart: '13:00',
  timeEnd: '14:00',
  limit: 5,
  id:'3a'
},])

  // renders calendar header
  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
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
          <li className = 'bullet-green'><span className = 'bullet-text'>Sessions you are assigned to</span></li>
          <li className = 'bullet-green bullet-blue'><span className = 'bullet-text'> Sessions you are not assigned to</span></li>
        </ul>
      </Col>
      <Col md = {4} className = 'dropdown-name volunteer-filter'>Filter calendar by your assigned sessions:</Col>
      <Col md = {2}> 
        <select className = 'dropdown-list' onChange={(e) => cSort(e.target.value)} value={sort}>
          <option value={'showAll'}>Show All</option>
          <option value={'assigned'}>Assigned sessions</option>
        </select> 
      </Col>
    </Row>
    )
  }

  // renders calendar days
  const renderDays = () => {
    const dateFormat = 'iiii'
    const days = []
    let startDate = dateFns.startOfWeek(currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className='days row'>{days}</div>
  }

  // renders calendar cells
  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
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
      days = [];
    }
    return <div className='body'>{rows}</div>
  }

  // puts sessions into the corrent calendar cell
  const showSessions = (day) => {
    return sessions.map((session, i) => {
      const sessionDate = new Date(session.date)
      if (sessionDate.getTime() === day.getTime()){
          return displaySessions(session, i)
      } 
    }) 
  }

  // builds invidual session entries in calendar 
  const sessionEntry = (session, i) => {
    return (
      <OverlayTrigger key = {i} trigger='click' placement='bottom' overlay={popoverClick(session)} rootClose>
        <li className = 'dis-session-info li-show-sessions' 
        style={{ backgroundColor : session.volunteer === 'Jenny' ? '#5Cb85C' : '#0D6EFD', color : 'White'}}>
          {session.timeStart}{' '}{displaySessionDescription(session.limit).name}
        </li>
      </OverlayTrigger>
    )
  }

  // gets information for that particular session
  const displaySessions = (session, i) => {
    if (sort === 'assigned' && session.volunteer === 'Jenny'){
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

  // session calendar popover
  const popoverClick = (session) => (
    <Popover className = 'popover-main' id='popover-trigger-click' title='Popover bottom'>
      <Card className = 'popover-card'>
        <Card.Body className = 'popover-body'>
          <Row className = 'session-name'>
            {displaySessionDescription(session.limit).name}
          </Row>
          <Row>
            {session.date}{' '}{session.timeStart}{'-'}{session.timeEnd}
          </Row>
          <Row className = 'session-location'>
            <Col className = 'location-icon' xs='auto'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'>
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/>
              </svg>  
            </Col> 
            <Col className = 'location-text'>{session.location}</Col>
          </Row>
          <Row>
            {'Members attending: '}{session.users.join(', ')}
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
    <div className='calendar'>
      {renderHeader()}
      {renderFilters()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default VolunteerCalendar