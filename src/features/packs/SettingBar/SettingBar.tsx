import React, {ChangeEvent} from "react";
import {Button, ButtonGroup, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "@material-ui/core/Slider";
import RemoveIcon from "../../../assets/images/icons/Filter-Remove.png";
import {Box, SettingsContainer, SliderContainer, Title, ToolContainer } from "./styes.settingsBar";
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import {showMyPacks} from "../packsReducer";
import {useDispatch} from "react-redux/es/hooks/useDispatch";




export const SettingsBar = () => {
    return (
        <SettingsContainer>
            <InputSearch title={'Search'}/>
            <ShowMyAllPacks title={'Show packs cards'}/>
            <SliderSettings title={'Number of cards'}/>
            <ResetButton/>
        </SettingsContainer>
    )
}

type ToolPropsType = {
    title: string
}
export const InputSearch = ({title}: ToolPropsType) => {
    return (
        <ToolContainer width={'413px'}>
            <Title>{title}</Title>
            <CustomizedInputBase/>
        </ToolContainer>
    )
}

export function CustomizedInputBase() {
    return (
        <Paper component="form">
            <IconButton type="submit"
                        aria-label="search">
                <SearchIcon/>
            </IconButton>
            <InputBase
                placeholder="Provide your text"
                inputProps={{'aria-label': 'search google maps'}}
            />
        </Paper>
    );
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
    const [value, setValue] = React.useState<number | number[]>([20, 37]);
    const packsData = useAppSelector(state => state.packs)

    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue);
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <ToolContainer width={'413px'}>
            <Title>{title}</Title>
            <SliderContainer>
                <Box>{packsData.minCardsCount}</Box>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={packsData.minCardsCount}
                    max={packsData.maxCardsCount}
                />
                <Box>{packsData.maxCardsCount}</Box>
            </SliderContainer>

        </ToolContainer>
    )
}


export const ResetButton = () => {
    return (
        <Box>
            <img src={RemoveIcon} alt="filter-remove"/>
        </Box>
    )
}