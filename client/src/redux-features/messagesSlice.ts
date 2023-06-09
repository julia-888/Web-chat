// import { IMessages } from './../components/Chat';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessages } from "../components/Chat";

//Интерфейс типов данных
export interface MessagesState {
  value: IMessages[];
}

const initialState: MessagesState = {
  value: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      loadMessages: (state, action: PayloadAction<IMessages[]>) => {
        state.value = action.payload; // добавление переданного сообщения в список с сообщениями
      },
    },
});

//Экспорт экшенов, т.е. функции изменения списка сообщений
export const { loadMessages } = messagesSlice.actions;


//Экспорт редюсера
export default messagesSlice.reducer;
