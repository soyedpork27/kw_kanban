import { useState, createContext } from "react";

import { v4 as uuidv4 } from 'uuid';

export const kanbanContext = createContext();


export function KanbanContextProvider({children}){

  const [progressNum, setProgressNum] = useState(5);

  const [undo, setUndo] = useState([]);

  const [progress, setProgress] = useState([
    {
      id: uuidv4(),
      title : '칸반보드 제작',
      sDate: new Date('2024-08-10'),
      eDate: new Date('2024-08-16'),
      content : '토이프로젝트 칸반보드 앱 만들기!',
    },
  ]);

  const [done, setDone] = useState([]);



  // 드래그 시 칸반 위치 변경 함수
  const moveItem = (itemId, from, to) => {

    if(from===to){
      return;
    }

    if(to==='progress'){
      if(progress.length === progressNum){
        alert(`진행중인 이슈는 최대 ${progressNum}개 입니다.`);
        return;
      }
    }

    let itemToMove;
    if (from === "undo") {
      itemToMove = undo.find((item) => item.id === itemId);
      setUndo(undo.filter((item) => item.id !== itemId));
    } else if (from === "progress") {
      itemToMove = progress.find((item) => item.id === itemId);
      setProgress(progress.filter((item) => item.id !== itemId));
    } else {
      itemToMove = done.find((item) => item.id === itemId);
      setDone(done.filter((item) => item.id !== itemId));
    }

    if (to === "undo") {
      setUndo([...undo, itemToMove]);
    } else if (to === "progress") {
      setProgress([...progress, itemToMove]);
    } else {
      setDone([...done, itemToMove]);
    }
  };


  // 모달에서 칸반 내용 변경
  const fixItem = (itemId, data, index) => {

    let fixData;

    if(index===0){
      fixData = undo.find((item) => item.id === itemId);
      fixData = {...data,id:fixData.id};
      setUndo((prev) => {
        const result = [...prev.filter((item) => item.id !== itemId),{...fixData}];
        return result;
      });

    }else if(index===1){

      fixData = progress.find((item) => item.id === itemId);
      fixData = {...data,id:fixData.id};
      setProgress((prev) => {
        const result = [...prev.filter((item) => item.id !== itemId),{...fixData}];
        return result;
      });

    }else{
      fixData = done.find((item) => item.id === itemId);
      fixData = {...data,id:fixData.id};
      setDone((prev) => {
        const result = [...prev.filter((item) => item.id !== itemId),{...fixData}];
        return result;
      });
    }

  }

  // add-btn 클릭시 추가하기
  const addItem = (index) => {

    if(index===1 && progress.length === progressNum ){
      alert(`진행중인 이슈는 최대 ${progressNum}개 입니다.`);
      return ;
    }

    const addObj = {
      id: uuidv4(),
    title : '',
    sDate : '',
    eDate : '',
    content : '',
    }

    if(index===0){
      setUndo((prev) => ([...prev,{...addObj}]));
    }else if(index===1){
      setProgress((prev) => ([...prev,{...addObj}]));
    }else{
      setDone((prev) => ([...prev,{...addObj}]));
    }
  }

  // delete-btn 클릭시 삭제하기 (아이템 아이디, 유형인덱스)
  const deleteItem = (itemId, index) => {

    if(index===0){
      setUndo((prev) => ([...prev.filter((i) => i.id !== itemId)]));
    }else if(index===1){
      setProgress((prev) => ([...prev.filter((i) => i.id !== itemId)]));
    }else{
      setDone((prev) => ([...prev.filter((i) => i.id !== itemId)]));
    }
  }



  return (<kanbanContext.Provider value={{undo, progress, done, moveItem, fixItem, addItem, deleteItem, progressNum, setProgressNum}}>{children}</kanbanContext.Provider>)
}


