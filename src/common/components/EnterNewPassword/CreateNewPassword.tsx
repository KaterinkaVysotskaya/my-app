import React from 'react';
import s from './EnterNewPassword.module.css'
import {Button,  FormControl, FormGroup, FormLabel, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {FormikErrorType} from "../../../features/auth/SingIn/SignIn";
import {useAppDispatch} from "../../../app/store";
import st from '../../styles/CommonStyles.module.css'
import {setNewPassword} from "../../../features/auth/authReducer";

function CreateNewPassword() {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.email = 'Required'
            }
            return errors
        },
        onSubmit: values => {
             dispatch(setNewPassword(values.password))
            formik.resetForm()
        },
    })
    return (
        <div className={s.container}>
            <div className={s.forgotPasswordBlock}>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <FormLabel>
                                <h1>Create new password</h1>
                            </FormLabel>
                            <TextField label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            <p>Create new password and we will send you further instructions to email</p>
                            <Button className = {st.button} type={'submit'} variant={'contained'} color={'primary'}>
                                Create new password
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default CreateNewPassword;