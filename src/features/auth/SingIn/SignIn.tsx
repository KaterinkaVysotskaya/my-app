import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import {loginTC} from "../authReducer";
import s from './SingIn.module.scss'
import {useAppDispatch} from "../../../app/store";
import {  InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Button} from "../../../common/components/reusableComponents/button/Button";

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

function SignIn() {
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
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
        <Grid item justifyContent={'center'} className={s.formContainer}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel className={s.title}>
                        <h1 >Sing in</h1>
                    </FormLabel>
                    <FormGroup className={s.form}>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}

                        />

                        <TextField type={showPassword ? "text" : "password"} label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                                   InputProps={{ // <-- This is where the toggle button is added.
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}
                                               >
                                                   {showPassword ? <Visibility /> : <VisibilityOff />}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox/>}
                                          checked={formik.values.rememberMe}
                                          {...formik.getFieldProps('rememberMe')}
                        />
                        {formik.errors.rememberMe && <div style={{color: 'red'}}>{formik.errors.rememberMe}</div>}
                        <div className={s.forgotPassword}>
                            <Link to={'/ForgotPassword'}  >Forgot Password</Link>
                        </div>
                        <Button type='submit' width={'347px'} buttonName={'Sign in'} />
                    </FormGroup>
                        <div className={s.footer}>
                            <p>Already have un account?</p>
                            <Link to={'/Register'} className={s.SingUplink} >Sign Up
                        </Link>
                        </div>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

export default SignIn;
