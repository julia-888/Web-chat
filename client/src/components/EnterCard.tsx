/* Входная страница приложения */

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Sheet from '@mui/joy/Sheet';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FormLabel, Typography } from '@mui/material';


type props = {
  setEnteredStatus: (status: boolean) => void;
  setUsername: (name: string) => void;
  username: string;
}

export default function EnterCard({setEnteredStatus, setUsername, username}: props) {
  return (
    <EnterSheet>
      <EnterCardDiv variant="outlined" >
        <Typography variant="h5" component="div">Как тебя зовут?</Typography>
        <TextField required id="standard-basic" label="Имя" variant="standard" onChange={(e) => {setUsername(e.target.value)}} />
        <Button variant="contained" sx={{ marginTop: '30px'}} onClick={() => username.length !== 0 && setEnteredStatus(true)}>Войти в чат</Button>
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
