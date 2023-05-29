/* Страница с чатом */

import React from 'react';
import ReactDOM from 'react-dom/client';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import Message from './Message';
import { json } from 'stream/consumers';
import styled from 'styled-components';
import axios from 'axios';

type props = {
  setEnteredStatus: (status: boolean) => void;
  username: string;
}

interface IMessages {
  id_of_message: number,
  text_of_message: string,
  sender_name: string,
  time_of_sending: string,
}

export default function Chat({setEnteredStatus, username}: props) {
  //объект с текущей датой и временем
  const now = new Date();
  //набираемый текст сообщения
  const [msgText, setMsgText] = useState('');
  //все сообщения
  const [messages, setMessages] = useState<IMessages[]>([]);

  //get-запросы
  useEffect(() => {
    axios
      .get("http://localhost:5000/messages")
      .then(data => {
        setMessages(data.data);
      })
      .catch((err) => {console.log(err)})
  }, []);

  function sendData() {
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const currentTime = h + ' : ' + m + ' : ' + s;
    const dataForSending = {
      text: msgText,
      name: username,
      time: currentTime
    }
    axios
    .put("http://localhost:5000/sendMessage", {dataForSending})
    .then(data => { setMessages(data.data); });
            
  }
  
  return (
    <ChatFrame>
      <BackButton onClick={() => {setEnteredStatus(false); console.log(messages)}}>Назад!</BackButton>
      <ChatMessages>
        <ul>
          {
          messages.map( message => {return(<li>
            <label>{message.sender_name}</label>
            <span>      {message.text_of_message}     </span>
            <label>{message.time_of_sending}</label>
          </li>)})
          }
            
        
        </ul>
      </ChatMessages>
        <ChatItems>
          <ChatInput onChange={(e) => {setMsgText(e.target.value)}}></ChatInput>
          <ChatButton
            onClick={() => {sendData()}}
          >Отправить!</ChatButton>
        </ChatItems>
      </ChatFrame>
  );
}

const ChatFrame = styled.div`
  margin: auto;
  height: 85vh;
  width: 50vw;
  border: solid black 2px;
  display: flex;
  flex-direction: column;
`

const BackButton = styled.button`
  height: 5vh;
`

const ChatMessages = styled.div`
  width: 50vw;
  height: 70vh;
  border: solid blue 1px;
`

const ChatItems = styled.div`
  height: 10vh;
  border: solid lime 3px;
  justify-self: flex-end;
`

const ChatInput = styled.input`
  
`

const ChatButton = styled.button`
  
`