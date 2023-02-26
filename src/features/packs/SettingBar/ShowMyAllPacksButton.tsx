import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {Title, ToolContainer} from "./styes.settingsBar";
import {Button, ButtonGroup} from "@material-ui/core";
import {showMyPacks} from "../packsReducer";
import React, {useState} from "react";
import {ToolPropsType} from "./SettingBar";

export const ShowMyAllPacks = ({title}: ToolPropsType) => {
    const [packOwner, setPackOwner] = useState<'my' | 'all'>('all')

    return (
        <ToolContainer width={'196px'}>
            <Title>{title}</Title>
            <div>
                <ButtonGroup color='primary' aria-label="outlined primary button group">
                    <Button onClick={()=>setPackOwner('my')}>My</Button>
                    <Button onClick={()=>setPackOwner('all')}>All</Button>
                </ButtonGroup>
            </div>

        </ToolContainer>
    )
}