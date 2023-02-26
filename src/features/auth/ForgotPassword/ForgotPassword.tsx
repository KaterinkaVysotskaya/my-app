import React, {useState} from 'react';
import {FormControl, FormLabel, Grid} from "@material-ui/core";
import {useFormik} from "formik";
import {resetForgotPasswordTC} from "../authReducer";
import {FormikErrorType} from "../SingIn/SignIn";
import {useAppDispatch} from "../../../app/store";
import CheckEmail from "../CheckEmail/CheckEmail";
import {
    Footer,
    Form,
    GridContainer,
    StyledButton,
    StyledInput,
    StyledLink,
    StyledTitle,
    Text
} from '../../../common/styles/FormStyles/Form.styles';
import styled from 'styled-components';
import {PATH} from "../../../common/Routing/Routes";

export const InputForgotPassword = styled(StyledInput)`
  margin: 33px;
`
export const ForgotPasswordButton = styled(StyledButton)`
  margin: 33px 33px;
`

export const StyledFormControl = styled(FormControl)`
  margin: 33px;
`
const SmallContainer = styled(GridContainer)`
  width: 413px;
  height: 456px;
`

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
    return <Grid container justifyContent={'center'}>
        <SmallContainer item style={{justifyContent:"center"}}>
            {
                chechEmail
                    ? <CheckEmail/>
                    : <div>
                        <form onSubmit={formik.handleSubmit}>
                            <StyledFormControl>

                                <FormLabel>
                                    <StyledTitle>Forgot your password?</StyledTitle>
                                </FormLabel>
                                <Form>
                                    <div style={{padding: '0px 30px'}}>
                                        <StyledInput

                                            label="Email"
                                            margin="normal"
                                            {...formik.getFieldProps('email')}
                                        />
                                    </div>



                                    {formik.touched.email && formik.errors.email &&
                                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                    <Text>Enter your email address and we will send you further instructions</Text>

                                    <ForgotPasswordButton type='submit' width={'347px'} buttonname={'Send Instructions'}/>
                                </Form>
                                <Footer>
                                    <Text>Did you remember your password?</Text>
                                    <StyledLink to={PATH.LOGIN}>Try logging in</StyledLink>
                                </Footer>
                            </StyledFormControl>
                        </form>
                    </div>
            }
        </SmallContainer>
    </Grid>
}

export default ForgotPassword;
