import {ListHeader} from "../../common/components/HeaderPackslist/HeaderPackslist";
import React from "react";
import {useAppDispatch} from "../../app/store";
import BackToPackListsButton
    from "../../common/components/reusableComponents/BackToPacksListButton/BackToPackListsButton";
import {useAppSelector} from "../../common/hooks/react-redux-hooks";
import {searchCards} from "./cardsReducer";
import {Search} from "../packs/SettingBar/Search";
import {StyledContainer} from "../../common/styles/lists.styles";

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const search = useAppSelector(state=>state.cards.search)
    const onClickHandler = () => {
        // dispatch(addCardTC(addCard))
    }
    return(
        <StyledContainer>
            <BackToPackListsButton/>
            <ListHeader
                buttonName={'Add new card'}
                title={'My Pack'}
                onClick={onClickHandler}
            />
            <Search width={'100%'}
                    search={search}
                    title={'Search'}
                    searchTC={searchCards}
            />


        </StyledContainer>
    )
}