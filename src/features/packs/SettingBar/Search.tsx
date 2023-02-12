import {ToolPropsType} from "./SettingBar";
import {Title, ToolContainer} from "./styes.settingsBar";
import React from "react";
import {CustomizedInputBase} from "../../../common/components/CustomizedInputBase/CustomizedInputBase";
import {searchPacks} from "../packsReducer";

export const Search = ({title, search, searchTC, width='413px'}: ToolPropsType) => {

    return (
        <ToolContainer width={width}>
            <Title>{title}</Title>
            <CustomizedInputBase search={search} searchTC={searchTC}/>
        </ToolContainer>
    )
}