import React from 'react';
import ReactDOM from 'react-dom'
import EnterCard from './components/EnterCard';
import Chat from './components/Chat';
import { useAppSelector } from './redux-features/hooks';


function App() {
  const username = useAppSelector(state => state.username);
  
  return ( username.enteredStatus ? 
    <Chat /> :
    <EnterCard />
  );
  //если enteredStatus = false, отображается карточка входа; если enteredStatus = true, отображается страница чата
  }; 

export default App;
