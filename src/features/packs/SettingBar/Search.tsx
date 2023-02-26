import {ToolPropsType} from "./SettingBar";
import {Title, ToolContainer} from "./styes.settingsBar";
import React from "react";
import {CustomizedInputBase} from "../../../common/components/CustomizedInputBase/CustomizedInputBase";

export const Search = ({title, width='413px'}: ToolPropsType) => {

    return (
        <ToolContainer width={width}>
            <Title>{title}</Title>
            <CustomizedInputBase  />
        </ToolContainer>
    )
}