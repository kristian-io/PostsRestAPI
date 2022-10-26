import React from 'react';
import './App.css';
import { Container, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  spacing: 2,
});


function UserInput({ value=null, label = null }) {
  return (
    <TextField 
      id="outlined-basic" 
      label={label} 
      variant="outlined"
      value={value}
      // helperText="User ID"
    />
  )
}

function TitleInput({ value=null, label = null }) {
  return (
    <TextField
    id="outlined-multiline-static"
    label={label}
    value={value}
    fullWidth
    // helperText="Title of your post"
    // defaultValue="Title of your post."
    />
  )
}


function ContentInput({ label = null }) {
  return (
    <TextField
    id="outlined-multiline-static margin-normal"
    label={label}
    multiline
    rows={4}
    fullWidth 
    // defaultValue="Write your post text here."
    helperText="Write your post :) "
    />
  )
}



function PostContainer() {
  return (
    <div className="post_container">
      <Container 
        sx = {{
          maxWidth: '70%'
        }}>
      <h1> Create a new post</h1>
      <Box
      component="form"
      noValidate
      sx={{
        display: 'grid',
        gap: 10,
      }}
      >
        <UserInput
          label="User ID"
        >
        </UserInput>
        {/* <hr/> */}
        <TitleInput
          label="Title"
        >
        </TitleInput>
        {/* <hr/> */}
        <ContentInput
          label="Content">
        </ContentInput>
      </Box>
      </Container>
        </div>
  )
}


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PostContainer />
    </ThemeProvider>
  );
}

export default App;