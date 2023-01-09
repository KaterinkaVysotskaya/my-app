import React from "react";
import arrow from '../../../../assets/images/icons/arrow.svg'
import back from '../../../../assets/images/icons/Back to Packs List.svg'
import styled from "styled-components";
import {PATH} from "../../Routing/Routes";
import { Link } from "@material-ui/core";

export const BackButtonBlock = styled.div`
height: 60px;
  display: flex;
  padding-left: 168px;
  padding-top: 24px;
`
function BackToPackListsButton() {

    return (
        <BackButtonBlock>
            <Link href={PATH.PACKSLIST}> <div style={{display: 'flex' ,height: '14px', width: '162px', left: '168px' ,top: '84px' ,justifyContent: "space-between" ,alignItems: 'center'}} >
                <img src={arrow} alt="arrow"/>
                <img src={back} alt="back"/>
            </div>
            </Link>

        </BackButtonBlock>
    );
}

export default BackToPackListsButton;