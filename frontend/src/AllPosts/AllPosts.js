import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Container from '@mui/system/Container';

import { Post } from '../Post/Post';

import './styles.css'

const axios = require('axios').default;

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts';


export function AllPosts() {
    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(API_ENDPOINT)
            .then((response) => {
                console.log(response.data)
                setPosts(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
            })



    }, [])


    const postList = posts.map((post) =>
        <Grid xs={12} sm={8} md={8} key={post.id} >
            <Container>
                <Paper className="postPaper" elevation={1} >
                    <Post userId={post.userId} id={post.id} title={post.title} body={post.body} />
                </Paper >
            </Container>
        </Grid >
    );

    return (
        <Container sx={{ paddingTop: "1rem" }}>
            {loading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                    <h3>Loading...</h3>
                </Box>}
            <Grid container spacing={3} sx={{
                justifyContent: "center",
                paddingTop: "1rem"
            }}>
                {postList.reverse()}
            </Grid >
        </Container>
    )
}