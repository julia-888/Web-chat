// import { IMessage } from './../components/Chat';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../components/Chat";

//Интерфейс типов данных
export interface MessagesState {
  value: {date: string, messages: IMessage[]}[];
}

const initialState: MessagesState = {
  value: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      loadMessages: (state:any, action: PayloadAction<{date: string, messages: IMessage[]}[]>) => {
        state.value = action.payload; // добавление переданного сообщения в список с сообщениями
      },
    },
});

//Экспорт экшенов, т.е. функции изменения списка сообщений
export const { loadMessages } = messagesSlice.actions;


//Экспорт редюсера
export default messagesSlice.reducer;
