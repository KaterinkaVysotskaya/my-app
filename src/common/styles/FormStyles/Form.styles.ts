import styled from "styled-components";
import {FormGroup, Grid, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import { Button } from "../../components/reusableComponents/button/Button";

export const GridContainer = styled(Grid)`
  display: flex;
  width: 413px ;
  height: 552px;
  left: 434px;
  top: 120px;
  background: #FFFFFF;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`
export const StyledTitle = styled.h1`
  right: 162px;
  top: 35px;
  height: 32px;
  color: #000000;
  text-align: center;
@include text($titleFontFamily, 600, 26 px, 32 px);
`
export const Form = styled(FormGroup)`
  display: flex;
`
export const StyledInput = styled(TextField).attrs(props=>({
    margin: props.margin ? props.margin : '0'
}))`
  input:-webkit-autofill{
    transition: background-color 5000s ease-in-out 0s;}
  display: flex;
  justify-content: space-between;
   
`
export const StyledLink = styled(Link)`
@include text($titleFontFamily, 600, 16 px, 24 px);
  text-align: center;
  text-decoration-line: underline;
  color: #366EFF;
`
export const ForgotPasswordLink = styled.div`
  right: 38px;
  display: flex;
  text-align: center;
  justify-content: flex-end;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin-bottom: 69px;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Text  = styled.p`
@include text($titleFontFamily, 600, 14 px, 24 px);
  margin-top: 31px;
  text-align: center;
  color: #000000;
  opacity: 0.5;
`
export const StyledButton = styled(Button)`
    margin-top: 60px;
  margin-left: 33px;
`

type InputProps = { margin?: string }