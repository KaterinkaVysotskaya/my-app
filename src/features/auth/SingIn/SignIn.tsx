import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import {loginTC} from "../authReducer";
import s from "../../../common/components/header/Header.module.css";
import {useAppDispatch} from "../../../app/store";


export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

function SignIn() {
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) =>{
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 2) {
                errors.password = 'Must be 2 characters or more'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    if (isLoggedIn) {
        return <Navigate to={'/Profile'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <h1>Sing in</h1>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox/>}
                                          checked={formik.values.rememberMe}
                                          {...formik.getFieldProps('rememberMe')}
                        />
                        {formik.errors.rememberMe && <div style={{color: 'red'}}>{formik.errors.rememberMe}</div>}
                        <div>
                            <Link to={'/ForgotPassword'} className={s.link} >Forgot Password</Link>
                        </div>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sing in
                        </Button>
                    </FormGroup>
                    <FormLabel>
                    <p>Already have un account?
                        <Link to={'/Register'} className={s.link} >Sign Up</Link>
                    </p>

                </FormLabel>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

export default SignIn;
