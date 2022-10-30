import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { CreatePost } from './CreatePost'
import { GetPost } from './GetPost/GetPost'

import './App.css';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  spacing: 2,
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CreatePost />
      <GetPost />
    </ThemeProvider>
  );
}

export default App;
