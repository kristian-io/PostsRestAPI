import React from 'react'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export function Post({ title, body, userId, id }) {
    //{ title, body, userId, id }
    //     const title = "Pariatur esse enim velit esse irure do ipsum nisi aute ad aliqua id exercitation." 
    //     const body = "Aliqua in elit anim nostrud. Et ex esse nisi mollit dolore et exercitation. Consequat occaecat deserunt Lorem dolor. Sit aliqua quis proident do tempor velit. Ullamco qui aute et tempor enim. \n \
    // Aliqua consectetur aliquip elit esse incididunt excepteur labore esse culpa consequat anim nisi est eu. Qui ullamco sit pariatur culpa in aliqua ea consequat aliqua anim elit qui. Ad deserunt ex duis Lorem sunt. Commodo esse amet dolor ipsum. Veniam est exercitation voluptate ea veniam veniam nostrud commodo incididunt sint cupidatat enim pariatur elit. Commodo adipisicing incididunt tempor exercitation id. \n \
    // Sint voluptate tempor ipsum nulla eiusmod cupidatat laborum id tempor magna ex cupidatat quis. In quis quis dolore adipisicing sit. In deserunt pariatur duis enim reprehenderit labore. Ad excepteur pariatur do tempor ullamco culpa exercitation ipsum consequat do id esse ex.";
    //     const userId = "1" 
    //     const id = "15" 


    return (
        <Container
            sx={{
                margin: "1rem",
                justifyContent: 'center'
            }}>
            <Typography variant='h3' gutterBottom> {title} </Typography>
            <Typography variant="caption" display="inline" gutterBottom> userId: {userId} </Typography>
            <Typography variant="caption" display="inline" gutterBottom> id: {id} </Typography>
            <Typography variant="body1"> {body} </Typography>
        </Container>
    )
}