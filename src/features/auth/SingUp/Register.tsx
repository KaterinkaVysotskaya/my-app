import {
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    TextField
} from '@material-ui/core';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux/es/hooks/useDispatch';
import {Link, Navigate} from 'react-router-dom';
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import {registerTC} from "../authReducer";
import s from "../../../common/components/Menu/Menu.module.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Button} from "../../../common/components/reusableComponents/button/Button";


type FormikErrorType = {
    email?: string
    password?: string
    password2?: string
    rememberMe?: boolean
}


function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
    const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2);

    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const addedUser = useAppSelector(state=>state.auth.addedUser)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password2: ''
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
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or more'
            } else if (formik.touched.password2 && values.password !== values.password2) {
                errors.password = 'Passwords do not match'
            }
            return errors
        },
        onSubmit: values => {
            // @ts-ignore
            dispatch(registerTC(values))
            formik.resetForm()
        },
    })
    if (addedUser) {
        return <Navigate to={'/Login'}/>
    }
    if (isLoggedIn) {
        return <Navigate to={'/Profile'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <h1>Sing Up</h1>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField  type={showPassword ? 'text' : 'password'}
                                   label="Password"
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

                        <TextField  type={showPassword2 ? 'text' : 'password'}
                                   label="Confirm Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password2')}
                                   InputProps={{ // <-- This is where the toggle button is added.
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword2}
                                                   onMouseDown={handleMouseDownPassword2}
                                               >
                                                   {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                        />
                        {formik.touched.password2 && formik.errors.password  && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}


                        <Button type='submit' width={'347px'} buttonName={'Sign in'} />
                    </FormGroup>
                    <FormLabel>
                    <p>Already have un account?

                        <Link to={'/Login'} className={s.link} >Sign in</Link>
                    </p>

                </FormLabel>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

export default Register;
