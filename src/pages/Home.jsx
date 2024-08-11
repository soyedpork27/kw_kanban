import React, { useState, useContext } from 'react';
import ListBox from '../components/Home/ListBox';
import { kanbanContext } from '../context/kanbanContext';

function Home(props) {

  const {moveItem} = useContext(kanbanContext);

  const kanban = [
    {
      title : '대기 중',
      type : 'undo',
    },
    {
      title : '진행 중',
      type : 'progress',
    },
    {
      title : '완료',
      type : 'done',
    }
  ];

  const [move, setMove] = useState({id:'',from:''});

  const [to, setTo] = useState('');

  const handleDragStart = (_, id, index) => {
    if(index===0){
      setMove({id:id,from:'undo'});
    }else if(index===1){
      setMove({id:id,from:'progress'});
    }else{
      setMove({id:id,from:'done'});
    }
  }

  const handleDragOver = (index) => {

    if(index===0){
      setTo('undo');
    }else if(index===1){
      setTo('progress');
    }else{
      setTo('done');
    }
  }

  const handleDragEnd = (_) => {
    moveItem(move.id, move.from, to);
  }



  return (
    <>
      <div className='kanban-wrap'>
        {kanban.map((i,idx) => (<ListBox type={i} key={idx} index={idx} handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDragEnd={handleDragEnd} />))}
      </div>
    </>
  );
}

export default Home;