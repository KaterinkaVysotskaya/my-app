import React from "react";
import RemoveIcon from "../../../assets/images/icons/Filter-Remove.png";
import {Box, SettingsContainer} from "./styes.settingsBar";
import {getPacksTC, setSearchPacks} from "../packsReducer";
import {Search} from "./Search";
import {setPackOwnerType, ShowMyAllPacks} from "./ShowMyAllPacksButton";
import {SliderSettings} from "./Slider";
import {useAppDispatch} from "../../../app/store";
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";


export const SettingsBar = ({setPackOwner, packOwner}: setPackOwnerType) => {
    const packsData = useAppSelector(state => state.packs)
    const [value1, setValue1] = React.useState<number[]>([packsData.minCardsCount, packsData.maxCardsCount]);
    return (
        <SettingsContainer>
            <Search title={'Search'}/>
            <ShowMyAllPacks packOwner={packOwner} setPackOwner={setPackOwner} title={'Show packs cards'}/>
            <SliderSettings value1={value1} setValue1={setValue1} title={'Number of cards'}/>
            <ResetButton setValue1={setValue1} setPackOwner={setPackOwner}/>
        </SettingsContainer>
    );
}

type ResetButtonType = {
    setValue1: (value1: number[]) => void
    setPackOwner: (packOwner: 'my' | 'all') => void
}

export const ResetButton = (props: ResetButtonType) => {
    const packsData = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()

    const onResetButtonHandler = () => {
        dispatch(setSearchPacks({search: ''}))
        props.setPackOwner('all')
        props.setValue1([packsData.minCardsCount, packsData.maxCardsCount])
        dispatch(getPacksTC({}));
    }
    return (
        <Box onClick={onResetButtonHandler}>
            <img src={RemoveIcon} alt="filter-remove"/>
        </Box>
    )
}

export type ToolPropsType = {
    title: string
    search?: string
    searchTC?: any
    width?: string
}