import React, { useContext, useEffect, useState } from 'react';

import { IoIosAddCircle } from "react-icons/io";


import '../../style/Home/home.css';
import { kanbanContext } from '../../context/kanbanContext';
import KanbanBlock from './KanbanBlock';

function ListBox({type, index, handleDragStart, handleDragOver, handleDragEnd}){

  const {undo, progress, done, addItem, progressNum} = useContext(kanbanContext);

  const [d,setD] = useState([]);

  useEffect(()=>{

    if(!index){
      setD([...undo]);
    }else if (index===1){
      setD([...progress]);
    }else {
      setD([...done]);
    }

  },[undo,progress,done, index]);

  const overStyle = {
    backgroundColor : '#333'
  }

  const [over, setOver] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
    setOver(true);
    handleDragOver(index);
  }
  const dragLeave = (e) => {
    e.preventDefault();
    setOver(false);
  }
  const dragDrop = (e) => {
    e.preventDefault();
    setOver(false);
    if(index===1 && progressNum <=d.length){
      console.log(`최대 진행중인 이슈는 ${progressNum}개 입니다.`);
      alert(`최대 진행중인 이슈는 ${progressNum}개 입니다.`);
    }else{
      handleDragEnd();
    }
  }

  const handleAdd = () => {

    if(index===1 && progressNum <= d.length){
      console.log(`최대 진행중인 이슈는 ${progressNum}개 입니다.`);
      alert(`최대 진행중인 이슈는 ${progressNum}개 입니다.`);
    }else{
      addItem(index);
    }
  }


  return (
    <section className={`kanban-listbox ${type.type}`}>
      <h2 className='kanban-title'>
        {type.title} ({d.length}개)
        {index===1&&<span className='progress-alarm' style={progressNum===d.length?{color:`#f00`}:{}} >최대 이슈 개수 {progressNum}개</span>}
      </h2>

      <div className={`kanban-box box-${type.type}`} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop} style={over?overStyle:{}} >
        {/* 이 안에 칸반 리스트들 나옴! */}
        {d.map((i,idx) => (<KanbanBlock key={idx} value={i} index={index} handleDragStart={handleDragStart} />))}

{/* 추가 */}
        <div className={`add-btn`} onClick={handleAdd} >
          <IoIosAddCircle className='add_icon' />
        </div>

      </div>

    </section>
  );
}
export default ListBox;