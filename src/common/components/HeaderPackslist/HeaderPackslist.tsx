import styled from "styled-components";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {addPacksTC, getPacksTC} from "../../../features/packs/packsReducer";
import {StyledTitle} from "../../styles/FormStyles/Form.styles";
import {Button} from "../reusableComponents/button/Button";
import React from "react";
import {NewCardsPackType} from "../../../api/packs-api";

type HeaderPacksType = {
    title: string
    buttonName: string
}
export const HeaderPacksBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const newCardsPack = {
    name: 'my new cardspack',
    path: '',
    grade: 3,
    shots: 3,
    rating: 3,
    deckCover: "url or base64",
    private: false,
    type: 'packs'
}


export const HeaderPacks = ({title, buttonName}: HeaderPacksType) => {
    const dispatch = useDispatch()

    const onClickHandler = () => {
        // @ts-ignore
        dispatch(addPacksTC(newCardsPack))
    }
    return (
        <HeaderPacksBlock>
            <StyledTitle>{title}</StyledTitle>
            <Button width={'175px'} buttonname={buttonName} onClick={onClickHandler}/>
        </HeaderPacksBlock>
    )
}