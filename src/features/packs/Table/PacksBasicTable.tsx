import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../../common/hooks/react-redux-hooks';
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import Link from '@material-ui/core/Link';
import {deletePacksTC, setPage, setPageCount, updatePacksTC} from "../packsReducer";
import {PATH} from "../../../common/components/Routing/Routes";
import {useAppDispatch} from "../../../app/store";
import {TablePagination} from "@mui/material";
import learnIcon from '../../../assets/images/icons/teacher.svg'
import editIcon from '../../../assets/images/icons/Edit.svg'
import deleteIcon from '../../../assets/images/icons/Delete.svg'
import { StyledTableCell, StyledTableRow } from '../../../common/styles/tables.styles';


export const BasicTable = () => {
    const profileId = useAppSelector(state => state.profile.userProfile?._id)
    const packsData = useAppSelector(state => state.packs)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const myPacks = packs && packs.filter(p => p.user_id === profileId)
    const showPacks = packsData.isMyPacks ? myPacks : packs

    const dispatch = useAppDispatch()

    // const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPage({page: newPage}));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        dispatch(setPageCount({pageCount: +event.target.value}));
        dispatch(setPage({page: 0}));
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table width={650} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="left">Cards</StyledTableCell>
                            <StyledTableCell align="left">Last Updated</StyledTableCell>
                            <StyledTableCell align="left">Created by</StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myPacks && showPacks
                            .slice(packsData.page * rowsPerPage, packsData.page * rowsPerPage + rowsPerPage)
                            .map((packs) => (
                                <StyledTableRow key={packs._id}>
                                    <StyledTableCell align="left">
                                       <Link href={PATH.CARDSLIST}>
                                        {packs.name}
                                       </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {packs.cardsCount}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{packs.updated}</StyledTableCell>
                                    <StyledTableCell align="left">{packs.user_name}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <div style={{display: 'flex', width: '95px', justifyContent: 'space-between'}}>
                                            <div><img src={learnIcon} alt="learnIcon"/></div>

                                            {packs.user_id === profileId &&
                                                <div onClick={() => {
                                                    const ChangedPack = {
                                                        _id: packs._id,
                                                        name: 'My updated pack'
                                                    }
                                                    dispatch(updatePacksTC(ChangedPack))
                                                }}><img src={editIcon} alt="changeIcon"/></div>}
                                            {packs.user_id === profileId &&
                                                <div onClick={() => {
                                                    dispatch(deletePacksTC(packs._id))
                                                }}><img src={deleteIcon} alt="deleteIcon"/></div>
                                            }
                                        </div>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination

                rowsPerPageOptions={[1, 5, 10, 20, 100]}
                component="div"
                count={packsData.cardPacksTotalCount}
                rowsPerPage={packsData.pageCount}
                page={packsData.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // showFirstButton={true}

            />
        </>
    );
}

