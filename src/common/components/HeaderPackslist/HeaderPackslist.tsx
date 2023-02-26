import styled from "styled-components";
import {StyledTitle} from "../../styles/FormStyles/Form.styles";
import {Button} from "../reusableComponents/button/Button";
import React, {useState} from "react";
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import {IconButton} from "@material-ui/core";
import {ModeComponent} from "../ModeComponent/ModeComponent";
import {useAppSelector} from "../../hooks/react-redux-hooks";

type HeaderPacksType = {
    title: string
    buttonName: string
    onClick: () => void
}
export const HeaderPacksBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`


export const ListHeader = React.memo(({title, buttonName, onClick}: HeaderPacksType) => {
    const packUserId = useAppSelector(state => state.cards.packUserId)

    const profileId = useAppSelector(state => state.profile.userProfile?._id)
    const [mode, setMode] = useState(false)


    return (
        <HeaderPacksBlock>
            <StyledTitle>{title}
                {
                    profileId === packUserId &&
                    <IconButton color={"inherit"} onClick={() => setMode(!mode)} onBlur={() => setMode(false)}>
                        <PendingOutlinedIcon fontSize={"large"}/>
                    </IconButton>
                }
                {mode && <ModeComponent/>}
            </StyledTitle>
            <Button width={'175px'} buttonname={buttonName} onClick={onClick}/>
        </HeaderPacksBlock>
    )
})