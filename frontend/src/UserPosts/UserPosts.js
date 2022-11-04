import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';



import { Post } from '../Post/Post';
import { BodyContainer } from '../BodyContainer/BodyContainer';


import './styles.css'
import '../AllPosts/styles.css'

import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts/user';



export function UserPosts() {
    const [posts, setPosts] = useState([]);

    const [userID, setUserID] = useState("");
    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setUserID(id)
            getPosts(id)
        }
        else {
            setUserID("");
            getPosts(id)
        }
    }, [id])

    function handleChange(event) {
        // console.log(event.target.value)
        setUserID(event.target.value)
    }



    function getPosts(id) {
        axios.get(`${API_ENDPOINT}/${id}`)
            .then((response) => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function handleSubmit(event) {
        console.log(event)
        event.preventDefault()
        // navigate the the url and useEffect will handle the rest
        navigate(`/user-posts/${userID}`);
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
                            <TextField variant="outlined" fullWidth onChange={handleChange} value={userID} label="User ID" ></TextField>
                        </Grid>
                        <Grid xs={4} >
                            <Button variant="outlined" onClick={handleSubmit} size="large" sx={{ height: "100%", minWidth: "100%", justifySelf: 'center' }}> Get </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

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