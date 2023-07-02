import {Title, ToolContainer} from "./styes.settingsBar";
import {Button, ButtonGroup} from "@material-ui/core";
import React from "react";
import {ToolPropsType} from "./SettingBar";
import s from './ShowMyAllPacksButton.module.css'

export type setPackOwnerType = {
    setPackOwner:(packOwner: 'my' | 'all') => void
    packOwner: 'my' | 'all'
}
export const ShowMyAllPacks = ({title, ...props}: ToolPropsType & setPackOwnerType) => {
    const onMyBtnHandler = ()=>{
        props.setPackOwner('my')
    }
    const onAllBtnHandler = ()=>{
        props.setPackOwner('all')
    }

    return (
        <ToolContainer width={'196px'}>
            <Title>{title}</Title>
            <div>
                <ButtonGroup color={'inherit'} aria-label="outlined primary button group">
                    <Button className={props.packOwner ==='my' ? s.active : ''} onClick={onMyBtnHandler}>My</Button>
                    <Button className={props.packOwner ==='all' ? s.active : ''}  onClick={onAllBtnHandler}>All</Button>
                </ButtonGroup>
            </div>

        </ToolContainer>
    )
}