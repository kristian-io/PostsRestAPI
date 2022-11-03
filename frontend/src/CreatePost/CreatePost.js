import React, { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { Post } from '../Post/Post'
import { BodyContainer } from '../BodyContainer/BodyContainer';
import { Collapse } from '@mui/material';

import './styles.css'

const axios = require('axios').default;

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

function SaveButton({ onClick, validateData, clearForm, setError }) {

  return (

    <Button color="primary" variant="contained"
      sx={{
        height: "100%",
        minWidth: "100%",
        justifySelf: 'center'
      }}

      onClick={() => {
        if (validateData()) {
          onClick()
          clearForm()
          setError({
            message: "Post saved.",
            severity: "success",
            active: true
          })
        }
        else {
          console.error('no data in the form')
          setError({
            message: "All fields are required!",
            severity: "error",
            active: true
          })
        }
      }}>
      Save
    </Button>

  )
}

function AlertMessage({ error }) {

  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    if (error.active) {
      setOpen(true)
    }
    else {
      setOpen(false)
    }
  }, [error])

  return (
    <Collapse in={open} >
      <Alert
        severity={error.severity}
        onClose={() => {
          console.log("clicked")
          setOpen(!open)
        }}
        onClick={() => {
          setOpen(!open)
        }}>
        {error.message}
      </Alert>
    </Collapse >
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

  const [error, setError] = useState({
    message: "",
    status: null
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
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('done...');
      });
  };

  return (
    <BodyContainer>
      <Paper elevation={3} >
        <h1> Create new post</h1>
        <Box component="form" noValidate sx={{ display: 'grid', gap: 5, }} >
          <Grid container spacing={5} sx={{ justifyContent: "space-between" }}>
            <Grid xs={8} >
              <UserInput label="User ID" onChange={handleFormChange} formData={formData} />
            </Grid>
            <Grid xs={4} >
              <SaveButton onClick={postData} setPost={setPost} validateData={validateData} formData={formData} clearForm={clearForm} setError={setError} />
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
          {error.message && <AlertMessage error={error} setError={setError} />}
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



