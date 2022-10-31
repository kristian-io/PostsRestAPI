import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Routes, Route, Outlet, Link, BrowserRouter} from "react-router-dom";
import { CreatePost } from '../CreatePost';
import { GetPost } from '../GetPost/GetPost';


function Example() {
  return (
    <h3>Hello </h3>
  )
}

export function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ButtonGroup fullWidth variant="text" size="small" aria-label="text button group ">
            <Routes>
              <Route path="/" element={<App/>}></Route>
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
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
