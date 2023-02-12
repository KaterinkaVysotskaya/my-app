import styled from "styled-components";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {StyledTitle} from "../../styles/FormStyles/Form.styles";
import {Button} from "../reusableComponents/button/Button";
import React from "react";

type HeaderPacksType = {
    title: string
    buttonName: string
    onClick: ()=>void
}
export const HeaderPacksBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`




export const ListHeader = ({title, buttonName, onClick}: HeaderPacksType) => {

    const dispatch = useDispatch()


    return (
        <HeaderPacksBlock>
            <StyledTitle>{title}</StyledTitle>
            <Button width={'175px'} buttonname={buttonName} onClick={onClick}/>
        </HeaderPacksBlock>
    )
}