import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const axios = require('axios').default;

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts';


function UserInput({ value, label = null, onChange }) {
  return (
    <TextField
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
  const [buttonState, setButtonState] = useState({
    message: "Save",
    extraMessage: "Post saved successfully",
    alertOn: false,
    color: "success"
  })
  return (
    <>
      <Button
        color={buttonState.color}
        variant="contained"
        sx={{
          justifySelf: 'center'
        }}
        onClick={() => {
          setButtonState(
            {
              ...buttonState,
              alertOn: true
            })
          onClick()
        }
        }
        value="haha"
      >{buttonState.message}
      </Button>
      {buttonState.alertOn &&
        <Alert
          onClose={() => { }}
          onClick={() => {
            setButtonState({
              ...buttonState,
              alertOn: false,
            })
          }}
        >
          {buttonState.extraMessage}
        </Alert>}
    </>
  )
}

export function CreatePost() {
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    body: ''
  });

  function handleFormChange(event) {
    // console.log(event.target.name, event.target.value)

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }


  function postData() {

    axios.post(API_ENDPOINT, formData)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('done...');
      });

  };



  return (
    <div className="post_container">
      <Container
        maxWidth="sm">
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



