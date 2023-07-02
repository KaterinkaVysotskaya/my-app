import React, {useCallback, useState} from 'react';
import {ListHeader} from "../../common/components/HeaderPackslist/HeaderPackslist";
import {BasicTable} from './Table/PacksBasicTable';
import {addPacksTC, getPacksTC} from "./packsReducer";
import { SettingsBar } from './SettingBar/SettingBar';
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

    const dispatch = useAppDispatch()
    const [packOwner, setPackOwner] = useState<'my' | 'all'>('all')

    const onClickHandler = useCallback(() => {
        dispatch(addPacksTC(newCardsPack))
    }, [])

    return (
        <StyledContainer>
            <ListHeader buttonName={'Add new pack'} title={'Packs list'} onClick={onClickHandler}/>
            <SettingsBar packOwner={packOwner} setPackOwner={setPackOwner} />
            <BasicTable packOwner={packOwner}/>
        </StyledContainer>
    );
}

export default Packslist;



