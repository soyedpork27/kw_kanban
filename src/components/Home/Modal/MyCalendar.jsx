import React, {useState} from 'react';

// 리액트 캘린더
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../../../style/Home/calendar.css';

import { FaCalendarAlt } from "react-icons/fa";

function MyCalendar({Date}) {

  const [date, setDate] = useState(Date);

  const [isView, setIsView] = useState(false);

  const calendarToggle = {
    display : 'block'
  }

  // const selectedCal = {
  //   color : '#f00',
  // }

  // 달력 토글하기
  const handleView = () => {
      setIsView((prev) => !(prev));
  }

  // react-calendar 에서 날짜 선택 시 실행되는 핸들러 함수
  const handleDateChange = (date) => {

    // console.log(date.toISOString());

    const selectedDate = date.toISOString().split('T')[0];

    const result = [...selectedDate.split('-')];
    result[2] = (parseInt(result[2])+1).toString();




    setDate(result.join('-'));
  }

  return (
    <div className='MY_Calendar-wrap'>
      <div className='Calendar-icons-box'>
        <FaCalendarAlt className={`MY_calendar-icon ${isView?'calendar-icon_active':''}`} onClick={handleView} />

        <span className='MY_Calendar-box' style={isView?calendarToggle:{}}>
          <Calendar className='MY_Calendar' value={date} onChange={handleDateChange} />
        </span>
      </div>

      {/* <div className='MY_Calendar-box' style={isView?calendarToggle:{}} > */}
      {/* </div> */}

      <span className={`${isView?'dateIsSelected':''}`}>
        {date}
      </span>
      
    </div>
  );
}

export default MyCalendar;