import React from 'react';

import { Post } from '../Post/Post';
import { BodyContainer } from '../BodyContainer/BodyContainer';


import './styles.css'

const axios = require('axios').default;

// TODO: move this away
const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/posts/user/';



export function UserPosts() {
    return (
        <BodyContainer>
            <h1>users posts</h1>
        </BodyContainer>
    )
}