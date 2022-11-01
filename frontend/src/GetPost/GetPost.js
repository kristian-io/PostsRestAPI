import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import './styles.css'
import { Post } from '../Post/Post';

const axios = require('axios').default;

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts';




export function GetPost() {
    const [postData, setPostData] = useState({
        id: null,
        userId: null,
        title: "",
        body: "",
        exists: true
    })

    const [postID, setPostID] = useState('');

    function onChange(event) {
        console.log(event.target.value)
        setPostID(event.target.value)
    }

    function handleSubmit(event) {
        console.log(event)
        event.preventDefault()

        const id = postID

        axios.get(`${API_ENDPOINT}/${id}`)
            .then((response) => {
                console.log(response.data)
                setPostData({
                    ...postData, ...response.data, exists: true
                })
            })
            .catch((error) => {
                setPostData({
                    ...postData, exists: false, id: null
                })
            })
    }

    return (
        <>
            <Container maxWidth="sm" sx={{ padding: '20px' }}>
                {/* <h2>Get post by ID</h2> */}
                <form name="getPostForm" onSubmit={handleSubmit}>
                    <Grid container justify="space-between" alignItems="center" spacing={1}>
                        <Grid item xs={6} >
                            <TextField
                                variant="outlined"
                                onChange={onChange}
                                name="getPost"
                                value={postID}
                                // id="standard-basic" 
                                label="Get Post by ID"
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Button
                                size="large"
                                variant="contained"
                                sx={{
                                    justifySelf: 'center'
                                }}
                                onClick={handleSubmit}> Get
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Paper
                    elevation={1} >
                    {postData.id && <Post userId={postData.userId} id={postData.id} title={postData.title} body={postData.body} />}
                </Paper>
                {!postData.exists && <h3>Not found</h3>}
            </Container>
        </>
    )
}