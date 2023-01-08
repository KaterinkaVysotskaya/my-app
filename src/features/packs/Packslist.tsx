import { Grid } from '@material-ui/core';
import React from 'react';
import { StyledTitle } from '../../common/styles/FormStyles/Form.styles';
import {Button} from "../../common/components/reusableComponents/button/Button";
import {getPacksTC} from "./packsReducer";
import {useDispatch} from "react-redux/es/hooks/useDispatch";


function Packslist() {
    const dispatch = useDispatch()

   const onClickHandler = () =>{
    // @ts-ignore
       dispatch(getPacksTC())
   }
    return (
        <Grid container justifyContent={'center'}>
            <div style={{flexDirection: 'column'}}>
                <StyledTitle>Packs list</StyledTitle>
                <Button buttonname={'Add new pack'} onClick={onClickHandler}/>
            </div>
        </Grid>
    );
}

export default Packslist;
