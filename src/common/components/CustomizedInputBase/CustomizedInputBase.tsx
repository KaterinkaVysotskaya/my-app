import React, {useEffect, useState} from "react";
import useDebounce from "../../hooks/UseDebounceHook";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {useAppDispatch} from "../../../app/store";



type SearchPropsType = {
    search?: string
    searchTC?: any
}
export function CustomizedInputBase( props: SearchPropsType) {
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 700);


    useEffect(()=>{
        if (debouncedSearchTerm) {
            dispatch(props.searchTC({search: debouncedSearchTerm}))

        } else {
            dispatch(props.searchTC({search: ''}))
        }
    },[debouncedSearchTerm])
    return (
        <Paper component="form">
            <IconButton type="submit"
                        aria-label="search">
                <SearchIcon/>
            </IconButton>
            <InputBase
                value={props.search}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Provide your text"
                inputProps={{'aria-label': 'search google maps'}}
            />
        </Paper>
    );
}