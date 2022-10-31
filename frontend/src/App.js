import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

import { CreatePost } from './CreatePost'
import { GetPost } from './GetPost/GetPost'
// import { MenuAppBar } from './MenuAppBar/MenuAppBar'

import { Routes, Route, Outlet, Link } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<App />}>
          Home
        </Route>
        <Route path="/createPost" element={<Example />}>
          Create Post
        </Route>
        <Route path="/getPost" element={<Example />}>
          <Button>Get Post</Button>
        </Route>
        <Route path="/getUserPosts">
          <Button>Get Post by User</Button>
        </Route>
      </Routes>

      <hr />
      <Outlet />
    </ThemeProvider>
  );
}


function Example() {
  return (
    <h3>Hello </h3>
  )
}


export default App;
