import React, {ChangeEvent, useEffect} from 'react';
import styled from "styled-components";
import {HeaderPacks} from "../../common/components/HeaderPackslist/HeaderPackslist";
import {Button, ButtonGroup, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import RemoveIcon from '../../assets/images/icons/Filter-Remove.png'
import {BasicTable} from './Table/PacksBasicTable';
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {getPacksTC} from "./packsReducer";


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

export const SettingsContainer = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`

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
export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0;
  text-align: left;
  align-items: center;
  color: #000000;
  padding-bottom: 8px;
`
type ToolPropsType = {
    title: string
}
type ToolContainerProps = {
    width?: string
}
export const ToolContainer = styled.div<ToolContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width ? props.width : '127px'};
`

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
    return (
        <ToolContainer width={'196px'}>
            <Title>{title}</Title>
            <div>
                <ButtonGroup color='primary' aria-label="outlined primary button group">
                    <Button>My</Button>
                    <Button>All</Button>
                </ButtonGroup>
            </div>

        </ToolContainer>
    )
}

export const Box = styled.div`
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  left: 817px;
  top: 192px;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SliderContainer = styled.div`
display: flex;
`

export const SliderSettings = ({title}: ToolPropsType) => {
    const [value, setValue] = React.useState<number | number[]>([20, 37]);

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
                <Box>min</Box>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <Box>max</Box>
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

