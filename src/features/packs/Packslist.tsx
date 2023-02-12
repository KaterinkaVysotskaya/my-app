import React, {ChangeEvent, useEffect} from 'react';
import styled from "styled-components";
import {ListHeader} from "../../common/components/HeaderPackslist/HeaderPackslist";
import {BasicTable} from './Table/PacksBasicTable';
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {addPacksTC, getPacksTC} from "./packsReducer";
import { SettingsBar } from './SettingBar/SettingBar';
import {useAppSelector} from "../../common/hooks/react-redux-hooks";
import {getCardsTC} from "../cards/cardsReducer";
import {useAppDispatch} from "../../app/store";
import {StyledContainer} from "../../common/styles/lists.styles";



const newCardsPack = {
    name: 'my new cardspack',
    path: '',
    grade: 3,
    shots: 3,
    rating: 3,
    private: false,
    type: 'packs'
}

function Packslist() {
    const search = useAppSelector(state=>state.packs.search)
    const page = useAppSelector(state=>state.packs.search)
    const pageCount = useAppSelector(state=>state.packs.search)
    const max = useAppSelector(state=>state.packs.max)
    const min = useAppSelector(state=>state.packs.min)
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(addPacksTC(newCardsPack))

        // @ts-ignore
        // dispatch(getCardsTC({packId: "63e6ad75cbbd6323340353fc"}))

        // dispatch(updateCardTC({_id: "63e8cd3ad73a854b6845fcdd"}))
        // @ts-ignore
        // dispatch(deleteCardTC("63e8c663d73a854b6845fcd9"))
    }

useEffect(()=>{
    // @ts-ignore
    dispatch(getPacksTC())

},[search, page, pageCount, max, min])
    return (
        <StyledContainer>
            <ListHeader buttonName={'Add new pack'} title={'Packs list'} onClick={onClickHandler}/>
            <SettingsBar />
            <BasicTable/>
        </StyledContainer>
    );
}

export default Packslist;



