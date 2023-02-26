import React, {useCallback} from 'react';
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

    const onClickHandler = useCallback(() => {
        dispatch(addPacksTC(newCardsPack))

        // @ts-ignore
        // dispatch(getCardsTC({packId: "63e6ad75cbbd6323340353fc"}))

        // dispatch(updateCardTC({_id: "63e8cd3ad73a854b6845fcdd"}))
        // @ts-ignore
        // dispatch(deleteCardTC("63e8c663d73a854b6845fcd9"))
    }, [])

    return (
        <StyledContainer>
            <ListHeader buttonName={'Add new pack'} title={'Packs list'} onClick={onClickHandler}/>
            <SettingsBar />
            <BasicTable/>
        </StyledContainer>
    );
}

export default Packslist;



