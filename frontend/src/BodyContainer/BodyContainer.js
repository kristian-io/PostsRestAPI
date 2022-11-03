import React from 'react';

import { Container } from '@mui/system';

import './styles.css'

export function BodyContainer(props) {
    // before we implement this we should refactor the GetPost route to be dynamic.
    // the form is ok, but on submit it should redirect to /post/:id
    // the same logic will be applied here.
    return (
        <Container maxWidth="md" className="body-container" >
            {props.children}
        </Container>
    )
}