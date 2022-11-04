import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from "react-router-dom";

import { CreatePost } from './CreatePost/CreatePost'
import { GetPost } from './GetPost/GetPost'
import { MenuAppBar } from './MenuAppBar/MenuAppBar';
import { AllPosts } from './AllPosts/AllPosts';
import { UserPosts } from './UserPosts/UserPosts'

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
      <MenuAppBar />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post" element={<GetPost />} />
        <Route path="/post/:id" element={<GetPost />} />
        <Route path="/user-posts" element={<UserPosts />} />
        <Route path="*" />
      </Routes>
    </ThemeProvider>
  );
}


export default App;
