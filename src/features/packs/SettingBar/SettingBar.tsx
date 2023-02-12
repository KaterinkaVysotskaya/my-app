import React, {ChangeEvent, useEffect} from "react";
import {Button, ButtonGroup} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import RemoveIcon from "../../../assets/images/icons/Filter-Remove.png";
import {Box, SettingsContainer, SliderContainer, Title, ToolContainer} from "./styes.settingsBar";
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import {clearSettingsFilter, searchPacks, showMyPacks} from "../packsReducer";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import useDebounce from '../../../common/hooks/UseDebounceHook';
import {Search} from "./Search";



export const SettingsBar = () => {
    const search = useAppSelector(state=>state.packs.search)
    return (
        <SettingsContainer>
            <Search search={search} title={'Search'} searchTC={searchPacks}/>
            <ShowMyAllPacks title={'Show packs cards'}/>
            <SliderSettings title={'Number of cards'}/>
            <ResetButton/>
        </SettingsContainer>
    )
}

export type ToolPropsType = {
    title: string
    search?: string
    searchTC?: any
    width?: string
}


export const ShowMyAllPacks = ({title}: ToolPropsType) => {
    const dispatch = useDispatch()
    return (
        <ToolContainer width={'196px'}>
            <Title>{title}</Title>
            <div>
                <ButtonGroup color='primary' aria-label="outlined primary button group">
                    <Button onClick={()=>dispatch(showMyPacks({ isMyPacks: true}))}>My</Button>
                    <Button onClick={()=>dispatch(showMyPacks({ isMyPacks: false}))}>All</Button>
                </ButtonGroup>
            </div>

        </ToolContainer>
    )
}


export const SliderSettings = ({title}: ToolPropsType) => {
    const packsData = useAppSelector(state => state.packs)
    const [value, setValue] = React.useState<number | number[]>([0, 53]);

    const dispatch = useDispatch()
    const debouncedSearchTerm = useDebounce(value, 500);


    useEffect(()=>{
        if (debouncedSearchTerm) {
            dispatch(searchPacks({min: debouncedSearchTerm[0], max: debouncedSearchTerm[1]}))

        } else {
            dispatch(searchPacks({search: ''}))
        }
    },[debouncedSearchTerm])

    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        console.log('newValue', newValue)
        setValue(newValue);
    };

    function valuetext(value: number) {
        return `${value}`;
    }


    return (
        <ToolContainer width={'413px'}>
            <Title>{title}</Title>
            <SliderContainer>
                <Box>{packsData.min}</Box>
                <Slider style={{margin: '0px 12px'}}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={packsData.minCardsCount}
                    max={packsData.maxCardsCount}
                />
                <Box>{packsData.max}</Box>
            </SliderContainer>

        </ToolContainer>
    )
}


export const ResetButton = () => {
    const dispatch = useDispatch()
    return (
        <Box onClick={()=>dispatch(clearSettingsFilter())}>
            <img src={RemoveIcon} alt="filter-remove"/>
        </Box>
    )
}