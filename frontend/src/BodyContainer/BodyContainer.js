import React from 'react';

import { Container } from '@mui/system';

import './styles.css'

export function BodyContainer(props) {

    return (
        <Container maxWidth="md" className="body-container" >
            {props.children}
        </Container>
    )
}