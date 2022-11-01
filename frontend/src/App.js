import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

import { CreatePost } from './CreatePost'
import { GetPost } from './GetPost/GetPost'
// import { MenuAppBar } from './MenuAppBar/MenuAppBar'

import { Routes, Route, Outlet, Link } from "react-router-dom";

import './App.css';
import { MenuAppBar } from './MenuAppBar/MenuAppBar';


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
      <MenuAppBar />
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post" element={<GetPost />} />
        <Route path="/user-posts" />
      </Routes>
    </ThemeProvider>
  );
}


function Example() {
  return (
    <h3>Hello </h3>
  )
}


export default App;
