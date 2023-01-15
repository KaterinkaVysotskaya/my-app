import React, {ChangeEvent, useEffect} from 'react';
import styled from "styled-components";
import {HeaderPacks} from "../../common/components/HeaderPackslist/HeaderPackslist";
import {BasicTable} from './Table/PacksBasicTable';
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {getPacksTC} from "./packsReducer";
import { SettingsBar } from './SettingBar/SettingBar';


export const PacksListContainer = styled.div`
  padding: 0 136px;
`

function Packslist() {
    const dispatch = useDispatch()
useEffect(()=>{
    // @ts-ignore
    dispatch(getPacksTC())
},[])
    return (
        <PacksListContainer>
            <HeaderPacks buttonName={'Add new pack'} title={'Packs list'}/>
            <SettingsBar/>
            <BasicTable/>
        </PacksListContainer>
    );
}

export default Packslist;



