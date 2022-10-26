import React, { useState } from 'react';

import { Container, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


import './App.css';

const axios = require('axios').default;


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  spacing: 2,
});


const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts';


function UserInput({ value, label = null, onChange }) {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value.userId}
      name="userId"
      // helperText="User ID"
      onChange={onChange}
    />
  )
}

function TitleInput({ value = null, label = null, onChange }) {
  return (
    <TextField
      id="outlined-multiline-static"
      label={label}
      value={value.title}
      name="title"
      fullWidth
      // helperText="Title of your post"
      // defaultValue="Title of your post."
      onChange={onChange}
    />
  )
}


function ContentInput({ value, label = null, onChange }) {
  return (
    <TextField
      id="outlined-multiline-static margin-normal"
      label={label}
      multiline
      rows={4}
      fullWidth
      value={value.body}
      name="body"
      // defaultValue="Write your post text here."
      helperText="Write your post :) "
      onChange={onChange}
    />
  )
}


function SaveButton({ onClick }) {
  const [props, setProps] = useState({
    message: "Save",
    extraMessage: "",
    color: "success"
  })
  return (
    <>
      <Button
        color={props.color}
        variant="contained"
        sx={{
          justifySelf: 'center'
        }}
        onClick={onClick}
        value="haha"
      >{props.message}
      </Button>
      {props.extraMessage && 
        <p
          sx={{
            justifyContent: 'center'
          }}
        >
          {props.extraMessage}
        </p>}
    </>
  )
}


function CreatePost() {
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    body: ''
  });

  function handleFormChange(event) {
    // console.log('change happened.')
    // console.log(event.target.name, event.target.value)

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }


  function postData() {
    // console.log('here!!!! ')
    // console.log(formData)

    axios.post(API_ENDPOINT, formData)
      .then((response) => {
        // handle success
        console.log(response.status);
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('done...');
      });

  };



  return (
    <div className="post_container">
      <Container
        sx={{
          maxWidth: '70%'
        }}>
        <h1> Create a new post</h1>
        <Box
          component="form"
          noValidate
          sx={{
            display: 'grid',
            gap: 5,
          }}
        >
          <UserInput
            label="User ID"
            onChange={handleFormChange}
            value={formData.userId}
          >
          </UserInput>
          {/* <hr/> */}
          <TitleInput
            label="Title"
            onChange={handleFormChange}
            value={formData.title}
          >
          </TitleInput>
          {/* <hr/> */}
          <ContentInput
            label="Content"
            onChange={handleFormChange}
            value={formData.body}
          >
          </ContentInput>

          <SaveButton
            onClick={postData}
          />
        </Box>
      </Container>
    </div>
  )
}


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CreatePost />
    </ThemeProvider>
  );
}

export default App;
