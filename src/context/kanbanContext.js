import { useState, createContext, useCallback, useEffect } from "react";

import { v4 as uuidv4 } from 'uuid';
import { httpRequest } from "../axios/httpRequest";
import Timer from "./Timer";

export const kanbanContext = createContext();


export function KanbanContextProvider({children}){


  const [isChange, setIsChange] = useState(false);

  const [progressNum, setProgressNum] = useState(5);

  const [undo, setUndo] = useState([]);

  const [progress, setProgress] = useState([]);

  const [done, setDone] = useState([]);

  // 컴포넌트 첫 랜더링(처음 화면 켰을때, 데이터 전송 직후)때 실행되어야 함
  useEffect(()=>{
    console.log('첫 랜더링!');
    async function fetchData() {
      const response = await httpRequest.get('/kanban');
      try {
        const Gundo = [...response.data.kanban_undo.map((i) => {
          let sDate = new Date(i.sDate);
          let eDate = new Date(i.eDate);
          const result = {...i,sDate,eDate};
          return result;
        })];

        const Gprogress = [...response.data.kanban_progress.map((i) => {
          let sDate = new Date(i.sDate);
          let eDate = new Date(i.eDate);
          const result = {...i,sDate,eDate};
          return result;
        })];

        const Gdone = [...response.data.kanban_done.map((i) => {
          let sDate = new Date(i.sDate);
          let eDate = new Date(i.eDate);
          const result = {...i,sDate,eDate};
          return result;
        })];
        setUndo([...Gundo]);
        setProgress([...Gprogress]);
        setDone([...Gdone]);
      } catch (err) {
        console.error(err);
      } finally {
        console.log('초기 통신 요청이 완료되었습니다!');
      }
    }

    if(!isChange){
      fetchData(); // 비동기 함수 호출
    }else{
      return ;
    }

  },[isChange]);



  // 드래그 시 칸반 위치 변경 함수
  const moveItem = (itemId, from, to) => {

    if(from===to){
      return;
    }

    if(isChange){
      // true 인 경우
      setIsChange((prev) => !prev);
    }

    if(to==='progress'){
      if(progress.length === progressNum){
        // alert(`진행중인 이슈는 최대 ${progressNum}개 입니다.`);
        return;
      }
    }

    let itemToMove;
    if (from === "undo") {
      itemToMove = undo.find((item) => item.kanban_id === itemId);
      setUndo(undo.filter((item) => item.kanban_id !== itemId));
    } else if (from === "progress") {
      itemToMove = progress.find((item) => item.kanban_id === itemId);
      setProgress(progress.filter((item) => item.kanban_id !== itemId));
    } else {
      itemToMove = done.find((item) => item.kanban_id === itemId);
      setDone(done.filter((item) => item.kanban_id !== itemId));
    }

    if (to === "undo") {
      setUndo([...undo, itemToMove]);
    } else if (to === "progress") {
      setProgress([...progress, itemToMove]);
    } else {
      setDone([...done, itemToMove]);
    }

    setIsChange(true);
    // moveItem 드래그 끝
  };

  // 모달에서 칸반 내용 변경
  const fixItem = (itemId, data, index) => {

    let fixData;

    if(index===0){
      fixData = undo.find((item) => item.kanban_id === itemId);
      fixData = {...data,kanban_id:fixData.kanban_id};
      setUndo((prev) => {
        const result = [...prev.filter((item) => item.kanban_id !== itemId),{...fixData}];
        return result;
      });

    }else if(index===1){

      fixData = progress.find((item) => item.kanban_id === itemId);
      fixData = {...data,kanban_id:fixData.kanban_id};
      setProgress((prev) => {
        const result = [...prev.filter((item) => item.kanban_id !== itemId),{...fixData}];
        return result;
      });

    }else{
      fixData = done.find((item) => item.kanban_id === itemId);
      fixData = {...data,kanban_id:fixData.kanban_id};
      setDone((prev) => {
        const result = [...prev.filter((item) => item.kanban_id !== itemId),{...fixData}];
        return result;
      });
    }

    setIsChange(true);
    // fixItem 끝 칸반 내용 변경 끝
  }

  // add-btn 클릭시 추가하기
  const addItem = (index) => {

    if(isChange){
      setIsChange(false);
    }

    if(index===1 && progress.length === progressNum ){
      // alert(`진행중인 이슈는 최대 ${progressNum}개 입니다.`);
      return ;
    }

    const addObj = {
    kanban_id: uuidv4(),
    title : '',
    sDate : new Date(),
    eDate : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    content : '',
    }

    if(index===0){
      setUndo((prev) => ([...prev,{...addObj}]));
    }else if(index===1){
      setProgress((prev) => ([...prev,{...addObj}]));
    }else{
      setDone((prev) => ([...prev,{...addObj}]));
    }

    setIsChange(true);

    // addItem 끝
  }

  // delete-btn 클릭시 삭제하기 (아이템 아이디, 유형인덱스)
  const deleteItem = (itemId, index) => {

    if(index===0){
      setUndo((prev) => ([...prev.filter((i) => i.kanban_id !== itemId)]));
    }else if(index===1){
      setProgress((prev) => ([...prev.filter((i) => i.kanban_id !== itemId)]));
    }else{
      setDone((prev) => ([...prev.filter((i) => i.kanban_id !== itemId)]));
    }

    setIsChange(true);
    // deleteItem 끝
  }




  // 칸반 데이터 보내는 요청 함수
  // 데이터 보내기 함수 (useCallback으로 메모이제이션)
  const sendData = useCallback(async () => {

    try {
      const response = await httpRequest.put('/kanban', {undo, progress, done});
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('데이터 전송 실패:', error);
    } finally {
      setIsChange(false);
    }
  }, [undo,progress,done]);

  const lastSend = useCallback(() => {
    if (isChange) {
      const undoQuery = encodeURIComponent(JSON.stringify(undo));
      const progressQuery = encodeURIComponent(JSON.stringify(progress));
      const doneQuery = encodeURIComponent(JSON.stringify(done));
  
      // GET 요청 URL 생성
      const url = `/kanban/unload?undo=${undoQuery}&progress=${progressQuery}&done=${doneQuery}`;
  
      // GET 요청 보내기
      httpRequest.get(url)
        .then(response => {
          console.log('서버 응답:', response.data);
        })
        .catch(error => {
          console.error('데이터 전송 실패:', error);
        });
    }
    return;
  }, [isChange, undo, progress, done]);

  // 브라우저 닫는 경우 실행할 이벤트
  useEffect(() => {
    window.addEventListener('beforeunload', lastSend);
  
    return () => {
      window.removeEventListener('beforeunload', lastSend);
    };
  }, [lastSend]);



  return (<kanbanContext.Provider value={{undo, progress, done, moveItem, fixItem, addItem, deleteItem, progressNum, setProgressNum, sendData, isChange, setIsChange}}>{children}
    {isChange&&<Timer sendData={sendData} isChange={isChange} setIsChange={setIsChange} />}
  </kanbanContext.Provider>)
}