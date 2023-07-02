import React, {useEffect, useState} from "react";
import useDebounce from "../../hooks/UseDebounceHook";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {useAppDispatch} from "../../../app/store";
import {getPacksTC, setSearchPacks} from "../../../features/packs/packsReducer";
import {useAppSelector} from "../../hooks/react-redux-hooks";



export function CustomizedInputBase() {
    const dispatch = useAppDispatch()
    const packName = useAppSelector(state=>state.packs.packName)

    // const debouncedSearchTerm = useDebounce(packName, 700);
    //
    // useEffect(()=>{
    //     if (debouncedSearchTerm) {
    //         dispatch(getPacksTC({packName: debouncedSearchTerm}));
    //     }
    // },[debouncedSearchTerm])

    return (
        <Paper component="form">
            <IconButton type="submit"
                        aria-label="search">
                <SearchIcon/>
            </IconButton>
            <InputBase
                value={packName}
                onChange={e => dispatch(setSearchPacks({search: e.target.value}))}
                placeholder="Provide your text"
                inputProps={{'aria-label': 'search google maps'}}
            />
        </Paper>
    );
}