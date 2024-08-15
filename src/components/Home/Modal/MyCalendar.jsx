import React, {useState} from 'react';

// 리액트 캘린더
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// CSS 오버라이딩
import '../../../style/Home/calendar.css';

import moment from 'moment';

import { FaCalendarAlt } from "react-icons/fa";

function MyCalendar({Date, isStart, setsDate, seteDate}) {

  // 컴포넌트에서 선택되는 날짜
  const date = isStart?Date[0]:Date[1];

  // 다른 컴포넌트에서 선택되는 날짜
  const subDate = isStart?Date[1]:Date[0];

  // const key = subDate?subDate.toISOString().split('T')[0]:'';

  // let obj = {}

  // obj[key] = { style: { backgroundColor: 'blue' } }

  // const mark = [{...obj}];
  // console.log(JSON.stringify(mark));



  const [isView, setIsView] = useState(false);

  const calendarToggle = {
    display : 'block'
  }




  // 달력 토글하기
  const handleView = () => {
      setIsView((prev) => !(prev));
  }

  // react-calendar 에서 날짜 선택 시 실행되는 핸들러 함수
  const handleDateChange = (getDate) => {

    // 시작일과 종료일이 문제가 있는 경우
    if (subDate !== undefined) {
      if (isStart && moment(getDate).isAfter(subDate)) {
        // 같거나 이후인 경우
        alert('시작 날짜는 종료 날짜 이전이어야 합니다.');
        return ;
      } else if (!isStart && moment(getDate).isBefore(subDate)) { // 같거나 이전인 경우
        alert('종료 날짜는 시작 날짜 이후여야 합니다.');
        return ;
      }
    }


    // 다루는 날짜가 시작일인지 종료일인지에 따라 set 함수가 달라진다
    if(isStart){
      setsDate(getDate);
    }else{
      seteDate(getDate);
    }
  }

  return (
    <div className='MY_Calendar-wrap'>
      <div className='Calendar-icons-box'>
        <FaCalendarAlt className={`MY_calendar-icon ${isView?'calendar-icon_active':''}`} onClick={handleView} />

        <span className='MY_Calendar-box' style={isView?calendarToggle:{}}>
          <Calendar className='MY_Calendar' value={date} onChange={handleDateChange} formatDay={(locale, date) => moment(date).format("DD")} 
            // markedDates={mark}
          />
        </span>
      </div>

      {/* <div className='MY_Calendar-box' style={isView?calendarToggle:{}} > */}
      {/* </div> */}

      <span className={`cal-date ${isView?'dateIsSelected':''}`} onClick={handleView} >
        {/* {date} */}
        {moment(date).format("YYYY년 MM월 DD일")} 
      </span>
      
    </div>
  );
}

export default MyCalendar;