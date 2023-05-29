/* Входная страница приложения */

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormLabel, Typography } from '@mui/material';

import styled from 'styled-components';


type props = {
  setEnteredStatus: (status: boolean) => void;
  setUsername: (name: string) => void;
}

export default function EnterCard({setEnteredStatus, setUsername}: props) {
  return (
    <EnterPage>
      <EnterCardDiv>
        <EnterCardHeader>Как тебя зовут?</EnterCardHeader>
        <EnterInput onChange={(e) => {setUsername(e.target.value)}}></EnterInput>
        <EnterButton onClick={() => setEnteredStatus(true)}>Войти!</EnterButton>
      </EnterCardDiv>
    </EnterPage>
  );
}

const EnterPage = styled.div`
  width: 98vw;
  height: 96vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const EnterCardDiv =styled.div`
  width: 300px;
  height: 200px;
  margin: auto;
  border: solid grey 2px;
  text-align: center;
`

const EnterInput = styled.input`
  
`

const EnterCardHeader = styled.h1`
  
`

const EnterButton = styled.button`
  
`