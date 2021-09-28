import React, { useState, useEffect } from 'react'
import * as dateFns from 'date-fns'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

function Calendar() {
  const [currentMonth, cCurrentMonth] = useState(new Date())
  const [userBooking, cUserBooking] = useState(false)
  const [currentDate, cCurrentDate] = useState(new Date())
  // const [selectedDate, cSelectedDate] = useState(new Date())
  const [sessionInfo, cSessionInfo] = useState([
    {name: "One-to-One Coaching",
    description:"These person-centred sessions are delivered by one of our trained team at a local golf club. The service provides an enjoyable & rewarding day for the golfer PLUS a deserved respite break for carers. No golfing experience is necessary.",
    cost: "£20 per hour"
    },
    {name: "The Perfect Three Ball",
    description:"Two golfers enjoying golf & companionship with a member of our team at a local golf club. This service provides an enjoyable & rewarding day out, the chance to make new friends and a well deserved respite break for carers. No golfing experience is necessary.",
    cost: "£15 per hour"
    },
    {name: "Group Session",
    description:"At present we’re limited to the “rule of six”. The sessions are perfect for people who enjoy socialising, being part of a team and group coaching.",
    cost: "£10 per hour"
    }
  ])
  const [users, cUsers] = useState([
    {id: "1",
    userName: "Pauln1",
    location: "Sheffield",
    role: "user",
    firstName: "Paul",
    booked:[]
    },
    {id: "2",
    userName: "Jenny12m",
    location: "Sheffield",
    role: "user",
    firstName: "Jenny",
    booked:[]
    }
  ])
  const [sessions, cSessions] = useState([
  { volunteer: "Thomas",
    users: ["3"],
    location: "Sheffield",
    date: "7 September 2021",
    timeStart: "14:00",
    timeEnd: "15:00",
    limit: 1,
    id:"1a"
  },
  { volunteer: "John",
    users: ['1'],
    location: "Sheffield",
    date: "6 September 2021",
    timeStart: "16:00",
    timeEnd: "17:00",
    limit: 2,
    id:"2a"
  },
  {volunteer: "Jenny",
  users: [],
  location: "Sheffield",
  date: "17 September 2021",
  timeStart: "13:00",
  timeEnd: "14:00",
  limit: 5,
  id:"3a"
},])
const [sort, cSort] = useState('unsorted')
  
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => prevMonth()}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={() => nextMonth()}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  const renderFilters = () => {
    return (
      <Row>
      <Col className = "filters">
        <ul className = "filter-list-bullet">
          <li className = "bullet-green"><span className = "bullet-text">Booked sessions</span></li>
          <li className = "bullet-green bullet-blue"><span className = "bullet-text"> Sessions available to book</span></li>
        </ul>
      </Col>
      <Col>
      <div>
      <div className = 'dropdown-container'>
          <div className = 'dropdown-name'>Filter calendar by booked sessions or sessions available to book:</div>
              <select className = 'dropdown-list' onChange={(e) => cSort(e.target.value)} value={sort}>
                  <option value={'showAll'}>Show All</option>
                  <option value={'booked'}>Booked Sessions</option>
                  <option value={'available'}>Available Sessions</option>
              </select>
      </div>
    </div>
      </Col>
      </Row>
    )
  }
console.log(sort)
  const renderDays = () => {
    const dateFormat = "iiii";
    const days = [];

    let startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, currentDate) ? "selected" : ""
            }`}
            key={day} 
          >
            <span className="number">{formattedDate}</span>
            <span><ul className = "ul-show-sessions">{showSessions(day)}</ul></span>
          </div>
        );
        day = dateFns.addDays(day, 1); 
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  //puts sessions into the calendar
  const showSessions = (day) => {
    return sessions.map((session, i) => {
      const sessionDate = new Date(session.date)
      if (sessionDate.getTime() === day.getTime()){
        console.log(displaySessions(session, i))
        return displaySessions(session, i)
      } 
    }) 
  }

  // // displays session info
  const displaySessions = (session, i) => {
    return (
      <OverlayTrigger key = {i} trigger="click" placement="bottom" overlay={popoverClick(session)} rootClose>
        <li className = "dis-session-info li-show-sessions" 
        style={{ backgroundColor : session.users.includes(users[0].id) ? '#5cb85c': session.users.length === session.limit ? 'White' : '#0D6EFD', 
        color : session.users.length === session.limit ? 'rgb(170, 163, 163)' : 'White'}} 
        >
          {session.timeStart}{" "}{displaySessionDescription(session.limit).name}
        </li>
      </OverlayTrigger>
    )    
  }

  const nextMonth = () => {
    cCurrentMonth(dateFns.addMonths(currentMonth, 1))
  };

  const prevMonth = () => {
    cCurrentMonth(dateFns.subMonths(currentMonth, 1))
  };

    // display correct session details based on the user limit
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


  const bookingHandler = (e, ses) => {
    e.preventDefault()
    sessions.forEach((session, index) => {
      if (session.id === ses.id) {
        sessions[index].users.push(users[0].id)
      }
    })
    cUserBooking(!userBooking) 
  }

  const cancelBookingHandler = (e, ses) => {
    e.preventDefault()
    console.log("hi", sessions)
    sessions.forEach((session, index) => {
      if (session.id === ses.id) {
        sessions[index].users = sessions[index].users.filter((i) => i !== users[0].id)
      }
    })
    console.log(sessions)
    cUserBooking(!userBooking) 
  }
  
  const showBookingButton = (session) => {
    if (session.users.includes(users[0].id)) {
      return <Button className = 'booking-btn btn-danger' onClick={(e) => cancelBookingHandler(e, session)}>Cancel booking</Button>
    } if (!session.users.includes(users[0].id) && session.users.length === session.limit) {
      return <Button className = 'booking-btn btn-secondary'>Fully booked</Button>
    } else {
      return <Button className = 'booking-btn' onClick={(e) => bookingHandler(e, session)}>Book session</Button>
    }
  }

  useEffect(() => {
    renderHeader()
    renderDays()
    renderCells()
  }, [userBooking])

  const popoverClick = (session) => (
    <Popover className = "popover-main" id="popover-trigger-click" title="Popover bottom">
      <Card className = "popover-card">
        <Card.Body className = "popover-body">
          <Row className = "session-name">
          {displaySessionDescription(session.limit).name}
          </Row>
          <Row>
          {session.date}{" "}{session.timeStart}{"-"}{session.timeEnd}
          </Row>
          <Row className = "session-description">
          {displaySessionDescription(session.limit).description}
          </Row>
          <Row>
          {displaySessionDescription(session.limit).cost}
          </Row>
          <Row className = 'booking-btn-row'>
          {showBookingButton(session)}
          </Row>
          </Card.Body>
      </Card>
    </Popover>
  );

  return (
    
    <div className="calendar">
      {renderHeader()}
      {renderFilters()}
      {renderDays()}
      {renderCells()}
    </div>
  ); 
}

export default Calendar;