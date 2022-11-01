import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";


export function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{
          justifyContent: "center",
          gap: "10%"
        }}>
          {/* <ButtonGroup fullWidth variant="text" size="small" aria-label="text button group "> */}
          <Link to="/">
            <Button>
              home
            </Button>
          </Link>
          <Link to="/create">
            <Button>
              create
            </Button>
          </Link>

          <Link to="/post" >
            <Button>
              show post
            </Button>
          </Link>
          <Link to="/user-posts" >
            <Button>
              posts by user
            </Button>
          </Link>

          {/* </ButtonGroup> */}
        </Toolbar>
      </AppBar>
    </Box >
  );
}
