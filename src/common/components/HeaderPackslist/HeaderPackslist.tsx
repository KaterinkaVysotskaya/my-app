import styled from "styled-components";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {getPacksTC} from "../../../features/packs/packsReducer";
import {StyledTitle} from "../../styles/FormStyles/Form.styles";
import {Button} from "../reusableComponents/button/Button";
import React from "react";

type HeaderPacksType = {
    title: string
    buttonName: string
}
export const HeaderPacksBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderPacks = ({title, buttonName}: HeaderPacksType) => {
    const dispatch = useDispatch()

    const onClickHandler = () =>{
        // @ts-ignore

    }
    return (
        <HeaderPacksBlock >
            <StyledTitle>{title}</StyledTitle>
            <Button width={'175px'} buttonname={buttonName} onClick={onClickHandler}/>
        </HeaderPacksBlock>
    )
}