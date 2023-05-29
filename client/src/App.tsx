import React from 'react';
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react";
import { response } from 'express';
import EnterCard from './components/EnterCard';
import Chat from './components/Chat'
// import { useAppSelector } from './redux-features/hooks';


function App() {
  const [enteredStatus, setEnteredStatus] = useState(false);
  const [username, setUsername] = useState("");

  return ( enteredStatus ? 
    <Chat setEnteredStatus={setEnteredStatus} username={username} /> :
    <EnterCard setEnteredStatus={setEnteredStatus} setUsername={setUsername} />
  );
  //если enteredStatus = false, отображается карточка входа; если enteredStatus = true, отображается страница чата
  }; 

export default App;
