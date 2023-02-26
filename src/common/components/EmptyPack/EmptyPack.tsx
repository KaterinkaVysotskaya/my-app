import {Button} from "../reusableComponents/button/Button";
import React from "react";
import {PATH} from "../../Routing/Routes";
import {Link} from "@mui/material";
import styled from "styled-components";


const EmptyPackBox = styled.div`
display: flex;
  justify-content: space-around;
  align-items: center;
  height: 175px;
  padding-top: 50px;
  font-family: 'Montserrat',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  flex-direction: column;
`

export const EmptyPack = () => {
    return (
        <EmptyPackBox>
            <div>This pack is empty. Click add new card to fill this pack</div>
            <Link href={PATH.PACKSLIST}><Button width={'175px'} buttonname={'Go to packlist'} /></Link>
        </EmptyPackBox>
    )
}