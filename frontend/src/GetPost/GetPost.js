import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
            <Container
                maxWidth="sm">
                {/* <h2>Get post by ID</h2> */}
                <form name="getPostForm" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        onChange={onChange}
                        name="getPost"
                        value={postID}
                        // id="standard-basic" 
                        label="Get Post by ID"
                    />
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            justifySelf: 'center'
                        }}
                        onClick={handleSubmit}> Get
                    </Button>
                </form>
                <Paper
                    elevation={1} >
                    {/* {postData.id && <Box>
                            <h3>{postData.title}</h3>
                            <h4>userId: {postData.userId}</h4>
                            <h5>post Id: {postData.id}</h5>
                            <h5>{postData.body}</h5>
                        </Box>} */}
                    {postData.id &&<Post userId={postData.userId} id={postData.id} title={postData.title} body={postData.body} />}
                </Paper>
                {!postData.exists && <h3>Not found</h3>}
            </Container>
        </>
    )
}