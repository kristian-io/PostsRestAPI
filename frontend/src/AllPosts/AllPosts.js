import React, { useEffect, useState } from 'react';

import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { Post } from '../Post/Post';

import './styles.css'
import { Container } from '@mui/system';

const axios = require('axios').default;

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts';


export function AllPosts() {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        axios.get(API_ENDPOINT)
            .then((response) => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch((error) => {
                console.error(error)
            })



    }, [])


    const postList = posts.map((post) =>
        <Grid xs={12} sm={8} md={7} key={post.id} >
            <Container>
                <Paper className="postPaper" elevation={1} >
                    <Post userId={post.userId} id={post.id} title={post.title} body={post.body} />
                </Paper >
            </Container>
        </Grid >
    );

    return (
        <Grid container spacing={3} sx={{
            justifyContent: "center"
        }}>

            {postList.reverse()}

        </Grid >
    )
}