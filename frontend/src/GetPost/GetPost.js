import React, { useCallback, useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'

import { Post } from '../Post/Post';
import { BodyContainer } from '../BodyContainer/BodyContainer';
import { AlertMessage } from '../AlertMessage/AlertMessage';

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

    const [postID, setPostID] = useState("");
    const { id } = useParams()
    const [alert, setAlert] = useState({
        message: "",
        severity: "",
        active: false
    })

    const getPost = useCallback((id) => {
        axios.get(`${API_ENDPOINT}/${id}`)
            .then((response) => {
                console.log(response.data)
                setPostData(postData => {
                    return {
                        ...postData, ...response.data, exists: true
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                setPostData(postData => {
                    return {
                        ...postData, exists: true, id: null
                    }
                })
                if (error.code === "ERR_NETWORK") {
                    setAlert({
                        message: `Unable to communicate with backed. Server is down or you have internet connection problem.  `,
                        severity: "error",
                        active: true
                    })

                }
                else if (error.response.status === 404) {
                    setAlert({
                        message: `Post not found`,
                        severity: "error",
                        active: true
                    })
                }
                else {
                    setAlert({
                        message: `Unknown error occurred ${error}`,
                        severity: "error",
                        active: true
                    })
                }
            })
    }, [id])

    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect runs")
        if (id) {
            console.log(id)
            setPostID(id)
            getPost(id)
        }
        else {
            console.log(id)
            setPostID("")
            setPostData(postData => { return { ...postData, id: null } })
        }
    }, [id])


    function handleChange(event) {
        // console.log(event.target.value)
        setPostID(event.target.value)
    }




    function handleSubmit(event) {
        console.log(event)
        event.preventDefault()
        if (postID === "") {
            console.log("imput is empty!!!!")
            setAlert({
                message: "Post ID is required",
                severity: "error",
                active: true
            })
            navigate(`/post`);

        }
        // navigate the the url and useEffect will handle the rest
        else {
            // setAlert({ ...alert, active: false })

            navigate(`/post/${postID}`);
        }

    }

    return (
        <BodyContainer>
            <Paper elevation={3} sx={{ padding: "2rem 0rem" }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'grid', gap: 5, }} >
                    <Grid container spacing={5} sx={{ justifyContent: "center" }}>
                        <Grid xs={4} >
                            <TextField required variant="outlined" fullWidth onChange={handleChange} value={postID} label="Post ID" ></TextField>
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
            {alert.active &&
                <AlertMessage alert={alert} setAlert={setAlert} />}

        </BodyContainer >
    )
}