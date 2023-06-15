/* Страница с чатом */

import ReactDOM from 'react-dom/client';
import TextField from '@mui/material/TextField';
import { Sheet } from '@mui/joy';
import Card from '@mui/material/Card';
import { Button, Chip, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from '../redux-features/hooks';
import { styled } from '@mui/material/styles';
import { loadMessages } from '../redux-features/messagesSlice';
import { enter, changeUsername } from '../redux-features/usernameSlice';
import {io} from 'socket.io-client';

// структура сообщения
export interface IMessage {
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
  //набираемый текст в поле ввода
  const [msgText, setMsgText] = useState('');

  //отправка сообщений на сервер
  function sendData() {
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const currentTime = h + ':' + m + ':' + s; //зафиксировать время отправки
    socket.emit('sendMessage', {name: username, text: msgText, time: currentTime});
    setMsgText(''); //обнулить содержимое текстового поля
  }

  useEffect(() => {
    //Обработка ответов от сервера
    socket.on("sendMessage", (payload: IMessage[]) => {
      dispatch(loadMessages(payload));      
    });
    socket.on("enter", (payload: IMessage[]) => {
      dispatch(loadMessages(payload));
    });
  })

  useEffect(() => {
    //при входе в чат запрашивается история сообщений
    socket.emit('enter', "payload");

    //происходит автоскролл в конец истории сообщений
    scrollRef.current.scrollIntoView({block: 'start'});
  }, [enteredStatus])
  
  const scrollRef = useRef<any>(null);

  return (
    <ChatSheet>
      <BackButton variant="outlined" onClick={() => {
        dispatch(enter(false)); //при клике на кнопку "Назад" происходит возврат на страницу входа
        dispatch(changeUsername("")); //имя пользователя обнуляется
      }}>Назад</BackButton>
      <ChatMessages id="msgFrame">
        <List sx={{display: 'flex', flexDirection: 'column-reverse'}}>
          { //отображение сообщений: если сообщение написал данный пользователь, то оно отображается слева и без имени
            messages.map( (message) => {
              return(
                username == message.sender_name ?
                (<ListItem sx={{justifyContent: 'flex-end', textAlign: 'right'}}>
                  <div>
                    <div>
                      <MessageChip label={message.text_of_message} />
                    </div>
                    <label style={{fontSize: '10px', marginRight: '8px'}}>{message.time_of_sending}</label>
                  </div>
                </ListItem>
                ): (
                <ListItem>
                  <div>
                    <div>
                      <MessageChip label={message.text_of_message} />
                    </div>
                    <label style={{fontSize: '10px', marginLeft: '10px'}}>{message.sender_name + " " + message.time_of_sending}</label>
                  </div>
                </ListItem> ))
          })}
        </List>
        <div ref={scrollRef} style={{height: '10px'}} /> {/* пустой элемент, созданный ради автопрокрутки в конец */}
      </ChatMessages>
      <ChatItems>
        <ChatInput multiline maxRows={3} value={msgText} onChange={(e) => {setMsgText(e.target.value)}}></ChatInput>
        <ChatButton variant='contained'
          onClick={() => { 
            if (msgText.length !== 0) { //если поле ввода не пустое
              sendData(); //отправка сообщения
              setMsgText(""); //содержимое поля обнуляется
            }}}>
        Отправить</ChatButton>
      </ChatItems>
    </ChatSheet>
  );
}

const ChatSheet = styled(Card)({ // рамка с чатом
  margin: 'auto',
  height: '85vh',
  width: '50vw',
  border: 'solid grey 1px',
  display: 'flex',
  flexDirection: 'column',
});

const BackButton = styled(Button)({ //кнопка "Назад"
  height: '5vh'
})

const ChatMessages = styled(Sheet)({ //окно с сообщениями
  width: '50vw',
  height: '70vh',
  overflowY: 'scroll',
})

const MessageChip = styled(Chip)({ //кружок с текстом сообщения
    height: 'auto',
    padding: '8px 0',
    '& .MuiChip-label': {
      overflowWrap: 'anywhere',
      display: 'block',
      whiteSpace: 'normal',
      maxWidth: '350px',}
})

const ChatItems = styled(Sheet)({ // блок на котором располагаются поле ввода и "Отправить"
  borderTop: 'solid teal 4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '30px',
})

const ChatInput = styled(TextField)({ // поле ввода
  width: '37vw',
  
})

const ChatButton = styled(Button)({ //кнопка "Отправить"
  marginLeft: '20px',
})