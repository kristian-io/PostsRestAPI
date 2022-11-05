import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { Post } from '../Post/Post'
import { BodyContainer } from '../BodyContainer/BodyContainer';
import { AlertMessage } from '../AlertMessage/AlertMessage';

import './styles.css'

import axios from 'axios'
// const axios = require('axios').default;

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts';


function UserInput({ formData, label = null, onChange }) {
  return (
    <TextField
      required
      fullWidth
      label={label}
      variant="outlined"
      value={formData.userId}
      name="userId"
      sx={{
        // maxWidth: "fit-content"
      }}
      // helperText="User ID"
      onChange={onChange}
    />
  )
}

function TitleInput({ formData, label = null, onChange }) {
  return (
    <TextField
      required
      label={label}
      value={formData.title}
      name="title"
      fullWidth
      // helperText="Title of your post"
      // defaultValue="Title of your post."
      onChange={onChange}
    />
  )
}

function ContentInput({ formData, label = null, onChange }) {
  return (
    <TextField
      required
      label={label}
      multiline
      rows={8}
      fullWidth
      value={formData.body}
      name="body"
      // defaultValue="Write your post text here."
      helperText="Write your post :) "
      onChange={onChange}
    />
  )
}

function SaveButton({ onClick, validateData, clearForm, setAlert }) {
  function handleClick() {
    if (validateData()) {
      onClick()
      clearForm()
      setAlert({
        message: "Post saved.",
        severity: "success",
        active: true
      })
    }
    else {
      console.error('no data in the form')
      setAlert({
        message: "All fields are required!",
        severity: "error",
        active: true
      })
    }

  }
  return (

    <Button color="primary" variant="contained"
      sx={{
        height: "100%",
        minWidth: "100%",
        justifySelf: 'center'
      }}
      onClick={handleClick}>
      Save
    </ Button >

  )
}


export function CreatePost() {
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    body: ''
  });

  const [post, setPost] = useState({
  })

  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    active: false
  })

  function handleFormChange(event) {
    // console.log(event.target.name, event.target.value)

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function validateData() {
    if (formData.userId && formData.title && formData.body) return true
    return false
  }

  function clearForm() {
    setFormData({
      ...formData,
      userId: '',
      title: '',
      body: ''
    })

  }

  function postData() {
    axios.post(API_ENDPOINT, formData)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        setPost(response.data)
        setFormData({
          ...formData,
          userId: '',
          title: '',
          body: ''
        })
      })
      .catch((alert) => {
        console.log(alert);
      })
      .finally(() => {
        console.log('done...');
      });
  };

  return (
    <BodyContainer>
      <Paper elevation={3} sx={{ padding: "3rem 1rem" }}>
        <h1> Create new post</h1>
        <br />
        <Box component="form" noValidate sx={{ display: 'grid', gap: 5, }} >
          <Grid container spacing={5} sx={{ justifyContent: "space-between" }}>
            <Grid xs={8} >
              <UserInput label="User ID" onChange={handleFormChange} formData={formData} />
            </Grid>
            <Grid xs={4} >
              <SaveButton onClick={postData} setPost={setPost} validateData={validateData} formData={formData} clearForm={clearForm} setAlert={setAlert} />
            </Grid>
          </Grid>
          <TitleInput label="Title" onChange={handleFormChange} formData={formData} />
          <ContentInput label="Content" onChange={handleFormChange} formData={formData} />
          {(formData.body || formData.title || formData.userId) && <Button onClick={() => {
            console.log('clearing')
            clearForm()
          }}>
            clear
          </Button>}
          <br />
          {alert.message && <AlertMessage alert={alert} setAlert={setAlert} />}
          <br />
        </Box>
        {post.id && <Container>
          <Paper elevation={1}>
            <Post userId={post.userId} id={post.id} title={post.title} body={post.body} />
          </Paper>
        </Container>}
      </Paper >
    </BodyContainer >
  )
}



