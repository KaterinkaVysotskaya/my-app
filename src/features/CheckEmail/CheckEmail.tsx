import React from 'react';
import s from './CheckEmail.module.css'
import { FormControl,  FormGroup, FormLabel} from "@material-ui/core";
import {Link} from "react-router-dom";


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
                            <p>
                                <Link to={'/Login'} className={s.link}>Back to login</Link>
                            </p>

                        </FormLabel>
                    </FormControl>
            </div>
        </div>
    )
}

export default CheckEmail;
