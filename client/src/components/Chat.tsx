/* Страница с чатом */

import React from 'react';
import ReactDOM from 'react-dom/client';
import TextField from '@mui/material/TextField';
import { Sheet } from '@mui/joy';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import Message from './Message';
import { json } from 'stream/consumers';
import { styled } from '@mui/material/styles';
import axios from 'axios';

type props = {
  setEnteredStatus: (status: boolean) => void;
  setUsername: (name: string) => void;
  username: string;
}

interface IMessages {
  id_of_message: number,
  text_of_message: string,
  sender_name: string,
  time_of_sending: string,
}

export default function Chat({setEnteredStatus, setUsername, username}: props) {
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
    <ChatSheet>
      <BackButton variant="outlined" onClick={() => {setEnteredStatus(false); setUsername("")}}>Назад</BackButton>
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
          <ChatButton variant='contained'
            onClick={() => {sendData()}}
          >Отправить</ChatButton>
        </ChatItems>
      </ChatSheet>
  );
}

const ChatSheet = styled(Card)({
  margin: 'auto',
  height: '85vh',
  width: '50vw',
  border: 'solid grey 1px',
  display: 'flex',
  flexDirection: 'column'
});

const BackButton = styled(Button)({
  height: '5vh'
})

const ChatMessages = styled(Sheet)({
  width: '50vw',
  height: '70vh',
})

const ChatItems = styled(Sheet)({
  borderTop: 'dashed lime 4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '30px',
})

const ChatInput = styled(TextField)({
  width: '37vw',
})

const ChatButton = styled(Button)({
  marginLeft: '20px',
})