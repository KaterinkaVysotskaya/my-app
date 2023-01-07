import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from '@material-ui/core';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import {loginTC} from "../authReducer";
import {useAppDispatch} from "../../../app/store";
import {InputAdornment, IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Button} from "../../../common/components/reusableComponents/button/Button";
import {Footer, ForgotPasswordLink, GridContainer, StyledInput, StyledLink , StyledTitle, Text} from '../../../common/styles/FormStyles/Form.styles';
import {PATH} from "../../../common/components/Routing/Routes";

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


function SignIn() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
        validate: (values) => {
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
        <GridContainer item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <StyledTitle>Sing in</StyledTitle>
                    </FormLabel>
                    <FormGroup>
                        <StyledInput label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}

                        />

                        <StyledInput type={showPassword ? "text" : "password"} label="Password"
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
                                                   {showPassword ? <Visibility/> : <VisibilityOff/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox color='primary'/>}
                                          checked={formik.values.rememberMe}
                                          {...formik.getFieldProps('rememberMe')}
                        />
                        {formik.errors.rememberMe && <div style={{color: 'red'}}>{formik.errors.rememberMe}</div>}

                        <ForgotPasswordLink>
                            <Link to={PATH.FORGOT_PASSWORD}>Forgot Password</Link>
                        </ForgotPasswordLink>

                        <Button type='submit' width={'347px'} buttonname={'Sign in'}/>
                    </FormGroup>

                    <Footer >
                        <Text>Already have un account?</Text>
                        <StyledLink to={PATH.REGISTER}>Sign Up
                        </StyledLink>
                    </Footer>
                </FormControl>
            </form>
        </GridContainer>
    </Grid>
}

export default SignIn;
