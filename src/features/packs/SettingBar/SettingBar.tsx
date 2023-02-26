import React from "react";
import RemoveIcon from "../../../assets/images/icons/Filter-Remove.png";
import {Box, SettingsContainer} from "./styes.settingsBar";
import {clearSettingsFilter, getPacksTC, setSearchPacks} from "../packsReducer";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {Search} from "./Search";
import {ShowMyAllPacks} from "./ShowMyAllPacksButton";
import {SliderSettings} from "./Slider";
import {useAppDispatch} from "../../../app/store";


export const SettingsBar = () => {

    return (
        <SettingsContainer>
            <Search title={'Search'}/>
            <ShowMyAllPacks title={'Show packs cards'}/>
            <SliderSettings title={'Number of cards'}/>
            <ResetButton/>
        </SettingsContainer>
    );
}



export const ResetButton = () => {
    const dispatch = useAppDispatch()

    const onResetButtonHandler = ()=> {
        dispatch(setSearchPacks({search: ''}))
    }
    return (
        <Box onClick={ onResetButtonHandler}>
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