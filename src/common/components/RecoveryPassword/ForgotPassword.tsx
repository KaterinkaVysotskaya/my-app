import React from 'react';
import s from './ForgotPassword.module.css'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {loginTC} from "../../../features/auth/authReducer";
import {FormikErrorType} from "../../../features/auth/SingIn/SignIn";

function ForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            // @ts-ignore
            //  dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    return (
        <div className={s.container}>
            <div className={s.forgotPasswordBlock}>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <h1>Forgot your password?</h1>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            <p>Enter your email address and we will send you further instructions</p>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Send Instructions
                            </Button>
                        </FormGroup>
                        <FormLabel>
                            <p>Did you remember your password?</p>
                            <p>
                                <Link to={'/R'} className={s.link}>Try logging in</Link>
                            </p>

                        </FormLabel>
                    </FormControl>
                </form>
            </div>
            RecoveryPassword
        </div>
    );
}

export default ForgotPassword;
