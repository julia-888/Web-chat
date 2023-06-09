/* Страница с чатом */

import React from 'react';
import ReactDOM from 'react-dom/client';
import TextField from '@mui/material/TextField';
import { Sheet } from '@mui/joy';
import Card from '@mui/material/Card';
import { Button, Chip, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../redux-features/hooks';
import { styled } from '@mui/material/styles';
import { loadMessages } from '../redux-features/messagesSlice';
import { enter, changeUsername } from '../redux-features/usernameSlice';
import {io} from 'socket.io-client';


export interface IMessages {
  id_of_message: number,
  text_of_message: string,
  sender_name: string,
  time_of_sending: string,
}

const socket = io(`ws://localhost:5000`, { transports: ["websocket"] });

export default function Chat() {
  //создание типизированных селекторов и диспатча
  const username = useAppSelector(state => state.username.value);
  const messages = useAppSelector(state => state.messages.value);
  const enteredStatus = useAppSelector(state => state.username.enteredStatus);
  const dispatch = useAppDispatch();


  //объект с текущей датой и временем
  const now = new Date();
  //набираемый текст сообщения
  const [msgText, setMsgText] = useState('');

  function sendData() {
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const currentTime = h + ':' + m + ':' + s;
    socket.emit('chat', {name: username, text: msgText, time: currentTime});
    setMsgText('');            
  }

  useEffect(() => {
    socket.on("chat", (payload: IMessages[]) => {
      console.log(payload);
      dispatch(loadMessages(payload));
      //Запрос на сервер
      
    });
    socket.on("first", (payload: IMessages[]) => {
      console.log(payload);
      dispatch(loadMessages(payload));
    });
  })

  useEffect(() => {
    socket.emit('first', "payload");
  }, [enteredStatus])
  

  return (
    <ChatSheet>
      <BackButton variant="outlined" onClick={() => {dispatch(enter(false)); dispatch(changeUsername(""));}}>Назад</BackButton>
      <ChatMessages id="msgFrame">
        <List sx={{display: 'flex', flexDirection: 'column-reverse'}}>
          {
            messages.map( (message) => {
              return(
                username == message.sender_name ?
                  (<ListItem sx={{justifyContent: 'flex-end', textAlign: 'right'}}>
                  <div>
                    <div>
                      <Chip label={message.text_of_message} sx={{
          height: 'auto',
          padding: '8px 0',
          '& .MuiChip-label': {
            overflowWrap: 'anywhere',
            display: 'block',
            whiteSpace: 'normal',
            maxWidth: '350px',
          }}} />
                    </div>
                    <label style={{fontSize: '10px', marginRight: '8px'}}>{message.time_of_sending}</label>
                  </div>
                </ListItem>
              ): (
                <ListItem>
                  <div>
                    <div>
                      <Chip label={message.text_of_message} sx={{
          height: 'auto',
          padding: '8px 0',
          '& .MuiChip-label': {
            overflowWrap: 'anywhere',
            display: 'block',
            whiteSpace: 'normal',
            maxWidth: '350px',
          }}} />
                    </div>
                    <label style={{fontSize: '10px', marginLeft: '10px'}}>{message.sender_name + " " + message.time_of_sending}</label>
                  </div>
                </ListItem>
              ))
          })
          }
        </List>
      </ChatMessages>
        <ChatItems>
          <ChatInput multiline maxRows={3} value={msgText} onChange={(e) => {setMsgText(e.target.value)}}></ChatInput>
          <ChatButton variant='contained'
            onClick={() => { if (msgText.length !== 0) {sendData(); setMsgText("");}}}
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
  flexDirection: 'column',
});

const BackButton = styled(Button)({
  height: '5vh'
})

const ChatMessages = styled(Sheet)({
  width: '50vw',
  height: '70vh',
  overflowY: 'scroll',
})

const ChatItems = styled(Sheet)({
  borderTop: 'solid teal 4px',
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