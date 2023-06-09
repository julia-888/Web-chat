import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Интерфейс типов данных
export interface UsernameState {
  value: string;
  enteredStatus: boolean;
}

// Определение начального состояния
const initialState: UsernameState = {
  value: '',
  enteredStatus: false,
}

//Создание слайса для хранения имени пользователя
export const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
      changeUsername: (state, action: PayloadAction<string>) => {
        state.value = action.payload; //присвоение переданного значения имени пользователя
      },
      enter: (state, action: PayloadAction<boolean>) => {
        state.enteredStatus = action.payload; //вход в чат
      }
    },
});

//Экспорт экшенов, т.е. функции изменения имени пользователя
export const { changeUsername, enter } = usernameSlice.actions;


//Экспорт редюсера
export default usernameSlice.reducer;
