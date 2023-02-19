import {Cell, ModeBox, TextMode} from "../ModeComponent/ModeComponent";
import styled from "styled-components";
import {IconButton} from "@mui/material";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {PATH} from "../Routing/Routes";
import Link from "@material-ui/core/Link";
import {logoutTC} from "../../../features/auth/authReducer";
import {useAppDispatch} from "../../../app/store";
const BoxHeaderMode = styled(ModeBox)`
      width: 122px;
      height: 104px;
      left: 139px;
      top: 57px;
    `
export const HeaderMode = () => {
    const dispatch = useAppDispatch()
    const logOutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <BoxHeaderMode>
            <IconButton color={"inherit"} >
                <Link href={PATH.PROFILE}> <Cell><Person2OutlinedIcon/><TextMode>Profile</TextMode></Cell></Link>
            </IconButton>
            <IconButton color={"inherit"} onClick={logOutHandler}>
                <Cell><LogoutOutlinedIcon/><TextMode>Log out</TextMode></Cell>
            </IconButton>
        </BoxHeaderMode>
    )
}