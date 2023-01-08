import React from 'react';
import {FormControl, FormGroup, FormLabel, Grid} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import {GridContainer, StyledButton, StyledTitle, Text} from "../../../common/styles/FormStyles/Form.styles";
import MailSvg from '../../../assets/images/icons/mail.svg'
import styled from "styled-components";
import {PATH} from "../../../common/components/Routing/Routes";

export const SmallContainer = styled(GridContainer)`
  width: 413px;
  height: 408px;
`

function CheckEmail() {
    return (
        <Grid container justifyContent={'center'}>
            <SmallContainer item justifyContent={'center'}>
                <FormControl>
                    <FormGroup>
                        <FormLabel>
                            <StyledTitle>Check Email</StyledTitle>
                        </FormLabel>
                        <img src={MailSvg} alt="MailSvg"/>
                    </FormGroup>
                    <FormLabel>
                        <Text>We’ve sent an Email with instructions to example@mail.com</Text>

                        <Link href={PATH.LOGIN}><StyledButton width={'347px'} buttonname={'Back to login'}/></Link>
                    </FormLabel>
                </FormControl>
            </SmallContainer>
        </Grid>
    )
}

export default CheckEmail;
