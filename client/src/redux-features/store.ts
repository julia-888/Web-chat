import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usernameReducer from './usernameSlice';
import messagesReducer from './messagesSlice';

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    messages: messagesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
