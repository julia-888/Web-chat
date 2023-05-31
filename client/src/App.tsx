import React from 'react';
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react";
import { response } from 'express';
import EnterCard from './components/EnterCard';
import Chat from './components/Chat'


function App() {
  const [enteredStatus, setEnteredStatus] = useState(false);
  const [username, setUsername] = useState("");

  return ( enteredStatus ? 
    <Chat setEnteredStatus={setEnteredStatus} setUsername={setUsername} username={username} enteredStatus={enteredStatus} /> :
    <EnterCard setEnteredStatus={setEnteredStatus} setUsername={setUsername} username={username} />
  );
  //если enteredStatus = false, отображается карточка входа; если enteredStatus = true, отображается страница чата
  }; 

export default App;
