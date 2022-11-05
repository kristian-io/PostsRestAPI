import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';

import { useNavigate, useParams } from 'react-router-dom';

import { Post } from '../Post/Post';
import { BodyContainer } from '../BodyContainer/BodyContainer';
import { AlertMessage } from '../AlertMessage/AlertMessage';

import './styles.css'
import '../AllPosts/styles.css'


import axios from 'axios';

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts/user';


export function UserPosts() {
    const [posts, setPosts] = useState([]);

    const [userID, setUserID] = useState("");
    const { id } = useParams()

    const [alert, setAlert] = useState({
        message: "",
        severity: "",
        active: false
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setUserID(id)
            getPosts(id)
        }
        else {
            setUserID("");
            // getPosts(id)
            setPosts([])
        }
    }, [id])

    function handleChange(event) {
        // console.log(event.target.value)
        setUserID(event.target.value)
    }



    function getPosts(id) {
        axios.get(`${API_ENDPOINT}/${id}`)
            .then((response) => {
                // console.log(response.data)
                setPosts(response.data)
            })
            .catch((error) => {
                console.error(error)
                setPosts([])
                if (error.code === "ERR_NETWORK") {
                    setAlert({
                        message: `Unable to communicate with backed. Server is down or you have internet connection problem.  `,
                        severity: "error",
                        active: true
                    })

                }
                else if (error.response.status === 404) {
                    setAlert({
                        message: `User's post not found`,
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
    }

    function handleSubmit(event) {
        // console.log(event)
        event.preventDefault()
        if (userID === "") {
            setAlert({
                message: "User ID is required",
                severity: "error",
                active: true
            })
            navigate(`/user-posts`);
        }
        else {
            // navigate the the url and useEffect will handle the rest
            setAlert({ ...alert, active: false })
            navigate(`/user-posts/${userID}`);

        }
    }


    const postList = posts.map((post) =>
        <Grid xs={12} sm={10} md={10} key={post.id} >
            <Container>
                <Paper className="postPaper" elevation={1} >
                    <Post userId={post.userId} id={post.id} title={post.title} body={post.body} />
                </Paper >
            </Container>
        </Grid >
    );



    return (
        <BodyContainer>
            <Paper elevation={3} sx={{ padding: "2rem 0rem" }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'grid', gap: 5, }} >
                    <Grid container spacing={5} sx={{ justifyContent: "center" }}>
                        <Grid xs={4} >
                            <TextField required variant="outlined" fullWidth onChange={handleChange} value={userID} label="User ID" ></TextField>
                        </Grid>
                        <Grid xs={4} >
                            <Button variant="outlined" onClick={handleSubmit} size="large" sx={{ height: "100%", minWidth: "100%", justifySelf: 'center' }}> Get </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            {alert.active &&
                <AlertMessage alert={alert} setAlert={setAlert} />}

            {posts &&
                <Grid container spacing={3} sx={{
                    justifyContent: "center",
                    paddingTop: "3rem"
                }}>
                    {postList.reverse()}
                </Grid >}
        </BodyContainer>
    )
}