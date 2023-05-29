/* Страница с чатом */

import React from 'react';
import ReactDOM from 'react-dom/client';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import Message from './Message';
import { json } from 'stream/consumers';
import styled from '@emotion/styled';

type props = {
  setEnteredStatus: (status: boolean) => void;
  username: string;
}

export default function Chat({setEnteredStatus, username}: props) {
  //набираемый текст сообщения
  const [msg, setMsg] = useState('');
  //все сообщения
  const [messages, setMessages] = useState(Array<string>);

  useEffect(() => {
    
  })
  
  return (
    <ChatFrame>
      <BackButton onClick={() => setEnteredStatus(false)}>Назад!</BackButton>
      <ChatMessages>
        <ul>
          {
            messages.map(message => <ol>{message}</ol>)
        }
        </ul>
      </ChatMessages>
        <ChatItems>
          <ChatInput onChange={(e) => {setMsg(e.target.value)}}></ChatInput>
          <ChatButton
            onClick={() => {setMessages([...messages, msg]); console.log(messages)}}
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