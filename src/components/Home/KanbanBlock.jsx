import React, {useState} from 'react';
import Modal from '../Modal';

function KanbanBlock({value, index, handleDragStart}) {

  const [isModalUse, setIsModalUse] = useState(false);

  const modalClose = () => {
    setIsModalUse(false);
  }

  let borderCol;
  if(index===0){
    borderCol = 'box-undo';
  }else if(index===1){
    borderCol = 'box-progress';
  }else{
    borderCol = 'box-done';
  }


  return (
    <>
      <article className={`kanban-block ${borderCol}`} draggable onDragStart={(e)=>handleDragStart(e,value.kanban_id,index)} onClick={()=>setIsModalUse(true)} >
        <div className='kanban-header'>
          <h3 className='block-title'>{!value.title?'제목을 입력해주세요.':value.title}</h3>
          {index===0&&<p className='kanban-type'>상태 : 대기중</p>}
          {index===1&&<p className='kanban-type'>상태 : 진행중</p>}
          {index===2&&<p className='kanban-type'>상태 : 완료</p>}
        </div>
        {(value.sDate && value.eDate)&& <p className='block-start-date'>
            {value.sDate?.toISOString().split('T')[0]} ~ {value.eDate?.toISOString().split('T')[0]}
          </p>}
          
        <p className='block-content'>{!value.content?'내용을 입력해주세요':value.content}</p>
        

      </article>
      {isModalUse?<Modal value={value} index={index} modalClose={modalClose} />:<></>}
    </>
  );
}

export default KanbanBlock;