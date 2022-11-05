import React, { useState, useEffect } from 'react';

import { Alert, Grow } from '@mui/material';



export function AlertMessage({ alert }) {

    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (alert.active) {
            setOpen(true)
        }
        else {
            setOpen(false)
        }
    }, [alert])

    return (
        <Grow in={open} {...(open ? { timeout: 2000 } : { timeout: 500 })} >
            <Alert
                severity={alert.severity}
                onClose={() => {
                    console.log("clicked")
                    setOpen(!open)
                }}
                onClick={() => {
                    setOpen(!open)
                }}>
                {alert.message}
            </Alert>
        </Grow >
    )
}