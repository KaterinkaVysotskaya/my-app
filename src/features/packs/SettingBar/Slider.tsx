import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import useDebounce from "../../../common/hooks/UseDebounceHook";
import React, {useEffect} from "react";
import {getPacksTC} from "../packsReducer";
import {Box, SliderContainer, Title, ToolContainer} from "./styes.settingsBar";
import Slider from '@mui/material/Slider';
import {ToolPropsType} from "./SettingBar";
import {useAppDispatch} from "../../../app/store";

const minDistance = 10;

export const SliderSettings = ({title}: ToolPropsType) => {
    const packsData = useAppSelector(state => state.packs)
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const [value1, setValue1] = React.useState<number[]>([packsData.minCardsCount, packsData.maxCardsCount]);
    const dispatch = useAppDispatch()

    const debouncedSearchTerm = useDebounce(value1, 1000);

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    }


    useEffect(()=>{
        if (isLoggedIn) {
            if (debouncedSearchTerm[0] !== packsData.minCardsCount && debouncedSearchTerm[1] !== packsData.maxCardsCount) {
                dispatch(getPacksTC({min: debouncedSearchTerm[0], max: debouncedSearchTerm[1]}));
            }
            // else {
            //     dispatch(searchPacks({search: ''}))
            // }
        }
        console.log('debouncedSearchTerm', debouncedSearchTerm)
    },[debouncedSearchTerm])


    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <ToolContainer width={'413px'}>
            <Title>{title}</Title>
            <SliderContainer>
                <Box>{value1[0]}</Box>
                <Slider style={{margin: '0px 12px'}}
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        min={packsData.minCardsCount}
                        max={packsData.maxCardsCount}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap

                />
                <Box>{value1[1]}</Box>
            </SliderContainer>

        </ToolContainer>
    )
}