import { Snackbar } from '@material-ui/core';
import React from 'react'
import {useDispatch} from "react-redux";
import { useAppSelector } from '../../hooks/react-redux-hooks';
import {setAppErrorAC} from "../../../app/appReducer";
import {Alert, AlertProps} from "@material-ui/lab";


// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref,
// ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function CustomizedSnackbars() {
    const dispatch = useDispatch()
    const error = useAppSelector(state=>state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))

    };

    return (
        <>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" >
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}