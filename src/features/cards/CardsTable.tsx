import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {StyledTableCell, StyledTableRow} from "../../common/styles/tables.styles";
import TableBody from "@mui/material/TableBody";
import Link from "@material-ui/core/Link";
import {PATH} from "../../common/components/Routing/Routes";
import learnIcon from "../../assets/images/icons/teacher.svg";
import {deletePacksTC, updatePacksTC} from "../packs/packsReducer";
import editIcon from "../../assets/images/icons/Edit.svg";
import deleteIcon from "../../assets/images/icons/Delete.svg";
import * as React from "react";

export const CardsTable = () => {
    return(
        <TableContainer component={Paper}>
            <Table width={650} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Question</StyledTableCell>
                        <StyledTableCell align="left">Answer</StyledTableCell>
                        <StyledTableCell align="left">Last Updated</StyledTableCell>
                        <StyledTableCell align="left">Grade</StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                </TableHead>
                {/*<TableBody>*/}
                {/*    {myPacks && showPacks*/}
                {/*        .slice(packsData.page * rowsPerPage, packsData.page * rowsPerPage + rowsPerPage)*/}
                {/*        .map((packs) => (*/}
                {/*            <StyledTableRow key={packs._id}>*/}
                {/*                <StyledTableCell align="left">*/}
                {/*                    <Link href={PATH.CARDSLIST}>*/}
                {/*                        {packs.name}*/}
                {/*                    </Link>*/}
                {/*                </StyledTableCell>*/}
                {/*                <StyledTableCell align="left">*/}
                {/*                    {packs.cardsCount}*/}
                {/*                </StyledTableCell>*/}
                {/*                <StyledTableCell align="left">{packs.updated}</StyledTableCell>*/}
                {/*                <StyledTableCell align="left">{packs.user_name}</StyledTableCell>*/}
                {/*                <StyledTableCell align="left">*/}
                {/*                    <div style={{display: 'flex', width: '95px', justifyContent: 'space-between'}}>*/}
                {/*                        <div><img src={learnIcon} alt="learnIcon"/></div>*/}

                {/*                        {packs.user_id === profileId &&*/}
                {/*                            <div onClick={() => {*/}
                {/*                                const ChangedPack = {*/}
                {/*                                    _id: packs._id,*/}
                {/*                                    name: 'My updated pack'*/}
                {/*                                }*/}
                {/*                                dispatch(updatePacksTC(ChangedPack))*/}
                {/*                            }}><img src={editIcon} alt="changeIcon"/></div>}*/}
                {/*                        {packs.user_id === profileId &&*/}
                {/*                            <div onClick={() => {*/}
                {/*                                dispatch(deletePacksTC(packs._id))*/}
                {/*                            }}><img src={deleteIcon} alt="deleteIcon"/></div>*/}
                {/*                        }*/}
                {/*                    </div>*/}
                {/*                </StyledTableCell>*/}

                {/*            </StyledTableRow>*/}
                {/*        ))}*/}
                {/*</TableBody>*/}
            </Table>
        </TableContainer>
    )
}