import {ListHeader} from "../../common/components/HeaderPackslist/HeaderPackslist";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../app/store";
import BackToPackListsButton
    from "../../common/components/reusableComponents/BackToPacksListButton/BackToPackListsButton";
import {useAppSelector} from "../../common/hooks/react-redux-hooks";
import {addCardTC, getCardsTC, searchCards, setPack_ID} from "./cardsReducer";
import {Search} from "../packs/SettingBar/Search";
import {StyledContainer} from "../../common/styles/lists.styles";
import {CardsTable} from "./CardsTable";
import {EmptyPack} from "../../common/components/EmptyPack/EmptyPack";

export const CardsList = () => {
    const pack_ID = useAppSelector(state=>state.cards.pack_ID)
    const search = useAppSelector(state=>state.cards.search)
    const cardsData = useAppSelector(state=>state.cards)
    const cards = useAppSelector(state=>state.cards.cards)
    const profileId = useAppSelector(state=>state.profile.userProfile?._id)
    const dispatch = useAppDispatch()

    const addCard = {
            cardsPack_id: pack_ID ? pack_ID :
                "",
            question: 'What is DOM?',
            answer: 'Document Object Model',
            grade: 5

    }
    const addNewCardHandler = () => {
        dispatch(addCardTC(addCard))
    }
    const LearnToPackHandler = () => {

    }
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pack_ID = params.get('pack_ID')
        dispatch(setPack_ID({pack_ID: pack_ID}))
        dispatch(getCardsTC({packId: pack_ID ? pack_ID : ''}))
    }, [search])

    return(
        <StyledContainer>
            <BackToPackListsButton/>
            <ListHeader
                buttonName={cardsData.packUserId === profileId ?'Add new card' : 'Learn to pack'}
                title={cardsData.packUserId === profileId ?'My Pack' : cardsData.packName}
                onClick={cardsData.packUserId === profileId ? addNewCardHandler : LearnToPackHandler }
            />
            {cards && !cards.length
                ? <EmptyPack/>
                : <>
                    <Search width={'100%'}
                        search={search}
                        title={'Search'}
                        searchTC={searchCards}
                        />
                    <CardsTable/>
                  </>
            }



        </StyledContainer>
    )
}