import React from 'react'
import { DialogTitle, Dialog, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';

const Alert = (props) => {
    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Algo deu errado"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary" autoFocus>
                        Ok
          </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Alert;