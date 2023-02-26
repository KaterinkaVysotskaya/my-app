import React from 'react';
import {FormControl, FormGroup, FormLabel, Grid} from "@material-ui/core";
import {useFormik} from "formik";
import {FormikErrorType} from "../SingIn/SignIn";
import {useAppDispatch} from "../../../app/store";
import {useNavigate, useParams} from "react-router-dom";
import {setNewPassword} from "../authReducer";
import {SmallContainer} from '../CheckEmail/CheckEmail';
import {StyledButton, StyledInput, StyledTitle, Text} from '../../../common/styles/FormStyles/Form.styles';
import {PATH} from "../../../common/Routing/Routes";



function CreateNewPassword() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {token} = useParams<"token" | "id">()
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
            if (token) {
                dispatch(setNewPassword({password: values.password, resetPasswordToken: token}))
                    .then(res => {
                        navigate(PATH.LOGIN);
                    })
            }
            formik.resetForm()
        },
    })
    return (
        <Grid container justifyContent={'center'}>
            <SmallContainer item style={{justifyContent:"center"}}>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <FormLabel>
                                <StyledTitle>Create new password</StyledTitle>
                            </FormLabel>
                            <div style={{padding: '0px 30px'}}>
                                <StyledInput label="Password"
                                             margin="normal"
                                             {...formik.getFieldProps('password')}
                                />
                            </div>


                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            <Text>Create new password and we will send you further instructions to email</Text>

                            <StyledButton type='submit' width={'347px'} buttonname={'Create new password'}/>
                        </FormGroup>
                    </FormControl>
                </form>
            </SmallContainer>
        </Grid>
    );
}

export default CreateNewPassword;
