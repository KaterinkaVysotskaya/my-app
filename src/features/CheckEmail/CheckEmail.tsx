import React from 'react';
import s from './CheckEmail.module.css'
import { FormControl,  FormGroup, FormLabel} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Button} from "../../common/components/reusableComponents/button/Button";


function CheckEmail() {
    return (
        <div className={s.container}>
            <div className={s.forgotPasswordBlock}>
                    <FormControl>
                        <FormGroup>
                            <FormLabel>
                                <h1>Check Email</h1>
                            </FormLabel>

                        </FormGroup>
                        <FormLabel>
                            <p>We’ve sent an Email with instructions to example@mail.com</p>

                                <Button type='submit' width={'347px'} buttonName={'Back to login'} >
                                    <Link to={'/Login'} className={s.link}>Back to login</Link>
                                </Button>



                        </FormLabel>
                    </FormControl>
            </div>
        </div>
    )
}

export default CheckEmail;
