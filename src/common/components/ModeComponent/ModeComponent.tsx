import editIcon from '../../../assets/images/icons/Edit.svg'
import deleteIcon from '../../../assets/images/icons/Delete.svg'
import learnIcon from '../../../assets/images/icons/teacher.svg'
import styled from "styled-components";
import {IconButton} from "@mui/material";
import {deletePacksTC, updatePacksTC} from "../../../features/packs/packsReducer";
import {useAppDispatch} from "../../../app/store";
import {useAppSelector} from "../../hooks/react-redux-hooks";

export const ModeBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  width: 116.5px;
  height: 136.5px;
  left: 55px;
  top: 60px;
  z-index: 999;
  flex-direction: column;
  justify-content: space-around;
  background: #FFFFFF;
  border: 1px solid #CFCFCF;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.06);
`
export const TextMode = styled.span`
  font-family: 'Montserrat ',sans-serif ;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`
export const Cell = styled.div`
  display: flex;
  justify-content: space-around;
 
`


export const ModeComponent = () => {
    const dispatch = useAppDispatch()


    return (
        <ModeBox>
            <IconButton color={"inherit"} >
                <Cell><img src={editIcon} alt="Edit"/><TextMode>Edit</TextMode></Cell>
            </IconButton>
            <IconButton color={"inherit"} >
            <Cell><img src={deleteIcon} alt="Delete"/><TextMode>Delete</TextMode></Cell>
            </IconButton>
                <IconButton color={"inherit"} >
            <Cell><img src={learnIcon} alt="Learn"/><TextMode>Learn</TextMode></Cell>
                </IconButton>
        </ModeBox>
    )
}