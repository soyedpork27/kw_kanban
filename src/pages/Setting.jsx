import React, { useContext } from 'react';
import { kanbanContext } from '../context/kanbanContext';

import '../style/Setting/setting.css';

function Setting(props) {

  const {progressNum,setProgressNum, progress} = useContext(kanbanContext);

  const handleProgressNum = (e, action) => {
    if(action==='minus'){
      if(progressNum===5){
        alert('진행가능 이슈의 최소 개수는 5개 입니다');
        return;
      }
      if(progress.length===progressNum){
        alert(`현재 진행중인 이슈의 개수가 ${progressNum}개 입니다.`);
        return;
      }

      setProgressNum(prev => prev-1);
    }else{
      if(progressNum===10){
        alert('진행가능 이슈의 최대 개수는 10개 입니다');
        return;
      }
      setProgressNum(prev => prev+1);
    }
  }

  return (
    <section>

      <h2 className='setting_main_title'>설정</h2>

      <h3 className='setting-title'>최대 진행중 이슈(5 ~ 10개)</h3>

      <div className='setting-zone progress-zone'>
        <button type='button' onClick={(e)=>handleProgressNum(e,'minus')} className='setting_btn' >-1</button>
        <span className='setting_target'>{/* 
        */}{progressNum}개
        </span>{/* 
        */}<button type='button' onClick={(e)=>handleProgressNum(e,'plus')} className='setting_btn' >+1</button>
      </div>

    </section>
  );
}

export default Setting;