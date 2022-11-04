import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'


import { Post } from '../Post/Post';
import { BodyContainer } from '../BodyContainer/BodyContainer';


import './styles.css'

// const axios = require('axios').default;
import axios from 'axios'

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
    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setPostID(id)
            getPost(id)
        }
    }, [id])


    function handleChange(event) {
        // console.log(event.target.value)
        setPostID(event.target.value)
    }


    function getPost(id) {
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

    function handleSubmit(event) {
        console.log(event)
        event.preventDefault()
        // navigate the the url and useEffect will handle the rest
        navigate(`/post/${postID}`);

    }

    return (
        <BodyContainer>
            <Paper elevation={3} sx={{ padding: "2rem 0rem" }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'grid', gap: 5, }} >
                    <Grid container spacing={5} sx={{ justifyContent: "center" }}>
                        <Grid xs={4} >
                            <TextField variant="outlined" fullWidth onChange={handleChange} value={postID} label="Get Post by ID" ></TextField>
                        </Grid>
                        <Grid xs={4} >
                            <Button variant="outlined" onClick={handleSubmit} size="large" sx={{ height: "100%", minWidth: "100%", justifySelf: 'center' }}> Get </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            {postData.id &&
                <Paper sx={{ padding: "2rem 0rem", marginTop: "2rem" }} elevation={3} >
                    <Post userId={postData.userId} id={postData.id} title={postData.title} body={postData.body} />
                </Paper>}
            {!postData.exists && <h4>Not found</h4>}

        </BodyContainer>
    )
}