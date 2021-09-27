import React, { useState } from 'react'
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
  const [currentDate, cCurrentDate] = useState(new Date())
  const [selectedDate, cSelectedDate] = useState(new Date())
  const [sessionInfo, cSessionInfo] = useState("")
  const [users, cUsers] = useState([
    {id: "1",
    userName: "Pauln1",
    location: "Sheffield",
    role: "user",
    firstName: "Paul"
    },
    {id: "2",
    userName: "Jenny12m",
    location: "Sheffield",
    role: "user",
    firstName: "Jenny"
    }
  ])
  const [sessions, cSessions] = useState([
  { volunteer: "Paul",
    users: [],
    location: "Sheffield",
    date: "7 September 2021",
    timeStart: "2.00pm",
    timeEnd: "3.00pm",
    limit: 1
  },
  { volunteer: "Paul",
    users: [],
    location: "Sheffield",
    date: "7 September 2021",
    timeStart: "2.00pm",
    timeEnd: "3.00pm",
    limit: 2
  }])
  
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
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, currentDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => onDateClick(dateFns.toDate(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span><ul>{showInfo(day)}</ul></span>
            <span className="bg">{formattedDate}</span>
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


  const displaySessionInfo = (session) => {
    return (
        <li className = "dis-session-info">
          {session.date}
        </li>
    )    
  }

  //puts session into the calendar
  const showInfo = (day) => {
    return sessions.map((session) => {
      const sessionDate = new Date(session.date)
      if (sessionDate.getTime() === day.getTime()){
        return displaySessionInfo(session)
      } 
    }) 
  }
  
  const onDateClick = (day) => {
    cSelectedDate(day)
    
  };

  const nextMonth = () => {
    cCurrentMonth(dateFns.addMonths(currentMonth, 1))
  };

  const prevMonth = () => {
    cCurrentMonth(dateFns.subMonths(currentMonth, 1))
  };

  // const popoverClick = (
  //   <Popover id="popover-trigger-click" title="Popover bottom">
  //     <Card className = "popover-card">
  //       {/* <Card.Header className = "popover-header">{session.name}</Card.Header> */}
  //       <Card.Body className = "popover-body">
  //         <Row>
  //         {session.name}
  //         </Row>
  //         <Row>
  //         {session.date}{" "}{session.time}
  //         </Row>
  //         </Card.Body>
  //     </Card>
  //   </Popover>
  // );
  
  return (
    
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  ); 
}

export default Calendar;