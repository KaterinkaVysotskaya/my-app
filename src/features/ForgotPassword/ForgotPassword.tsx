import React, {useState} from 'react';
import s from './ForgotPassword.module.css'
import { FormControl, FormGroup, FormLabel, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {resetForgotPasswordTC} from "../auth/authReducer";
import {FormikErrorType} from "../auth/SingIn/SignIn";
import {useAppDispatch} from "../../app/store";
import CheckEmail from "../CheckEmail/CheckEmail";
import {Button} from "../../common/components/reusableComponents/button/Button";

function ForgotPassword() {
    const [chechEmail, setCheckEmail] = useState(false)
    const dispatch = useAppDispatch()
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
           const res = dispatch(resetForgotPasswordTC(values.email))
            setCheckEmail(true)

            formik.resetForm()
        },
    })
    return (
        <div className={s.container}>
            {
                chechEmail
                    ? <CheckEmail/>
                    : <div className={s.forgotPasswordBlock}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormGroup>
                                    <FormLabel>
                                        <h1>Forgot your password?</h1>
                                    </FormLabel>
                                    <TextField label="Email"
                                               margin="normal"
                                               {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email &&
                                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                    <p>Enter your email address and we will send you further instructions</p>

                                    <Button type='submit' width={'347px'} buttonName={'Send Instructions'} />
                                </FormGroup>
                                <FormLabel>
                                    <p>Did you remember your password?</p>
                                    <p>
                                        <Link to={'/Login'} className={s.link}>Try logging in</Link>
                                    </p>

                                </FormLabel>
                            </FormControl>
                        </form>
                    </div>
            }
        </div>
    );
}

export default ForgotPassword;
