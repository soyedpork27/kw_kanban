import React, {  useEffect } from 'react';
import '../style/Home/timer.css';


function Timer({sendData, isChange, setIsChange}) {

  // const [ani, setAni] = useState(false);

  useEffect(() => {
      // setAni(true); // 애니메이션 시작

      const timer = setTimeout(() => {
        sendData();
        // setAni(false); // 애니메이션 중단
      }, 5000); // 5초동안 통신 제한

      return () => {
        clearTimeout(timer);
        // console.log('타이머 중단!');
      };
  }, [sendData, isChange, setIsChange]);


  return (
    <div className='Timer_wrap'>
      <p className='Timer_text'>
        데이터 전송중입니다...
      </p>
      <p className='Timer_text'>
        잠시만 기다려주세요
      </p>
      {/* <div className='Timer_Ani_BG'>
        <div className={`Timer_Ani_Time ${ani?'timer_ani':''}`}>

        </div>
      </div> */}
    </div>
  );
}

export default Timer;