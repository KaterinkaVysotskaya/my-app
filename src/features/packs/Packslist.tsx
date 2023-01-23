import React, {ChangeEvent, useEffect} from 'react';
import styled from "styled-components";
import {HeaderPacks} from "../../common/components/HeaderPackslist/HeaderPackslist";
import {BasicTable} from './Table/PacksBasicTable';
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {getPacksTC} from "./packsReducer";
import { SettingsBar } from './SettingBar/SettingBar';
import {useAppSelector} from "../../common/hooks/react-redux-hooks";


export const PacksListContainer = styled.div`
  padding: 0 136px;
`

function Packslist() {
    const search = useAppSelector(state=>state.packs.search)
    const page = useAppSelector(state=>state.packs.search)
    const pageCount = useAppSelector(state=>state.packs.search)
    const dispatch = useDispatch()
useEffect(()=>{
    // @ts-ignore
    dispatch(getPacksTC())
},[search, page, pageCount])
    return (
        <PacksListContainer>
            <HeaderPacks buttonName={'Add new pack'} title={'Packs list'}/>
            <SettingsBar />
            <BasicTable/>
        </PacksListContainer>
    );
}

export default Packslist;



