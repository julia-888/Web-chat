/* Входная страница приложения */

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Sheet from '@mui/joy/Sheet';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux-features/hooks';
import { enter, changeUsername } from '../redux-features/usernameSlice';

export default function EnterCard() {
  const username = useAppSelector(state => state.username);
  const dispatch = useAppDispatch();

  return (
    <EnterSheet>
      <EnterCardDiv variant="outlined" >
        <Typography variant="h5" component="div">Как тебя зовут?</Typography>
        <TextField required id="standard-basic" label="Имя" variant="standard" multiline maxRows={2} value={username.value} onChange={(e) => {dispatch(changeUsername(e.target.value.slice(0,20)))}} />
        <Button variant="contained" sx={{ marginTop: '30px'}} 
                onClick={() => {username.value.length !== 0 && dispatch(enter(true));
        }}>Войти в чат</Button>
      </EnterCardDiv >
    </EnterSheet>
  );
}

const EnterSheet = styled(Sheet)({
  width: '98vw',
  height: '96vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const EnterCardDiv = styled(Card) ({
  width: 300,
  textAlign: 'center', 
  border: 'solid black 1px', 
  padding: '30px 5px'
})
