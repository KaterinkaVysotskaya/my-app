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
import {TablePagination} from '@material-ui/core';
import learnIcon from '../../../assets/images/icons/teacher.svg'
import deleteIcon from '../../../assets/images/icons/Delete.svg'
import editIcon from '../../../assets/images/icons/Edit.svg'
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {deletePacksTC, setPage, setPageCount, updatePacksTC} from "../packsReducer";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#EFEFEF',
        color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export function BasicTable() {
    const profileId = useAppSelector(state => state.profile.userProfile?._id)
    const packsData = useAppSelector(state => state.packs)


    const dispatch = useDispatch()

    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
       dispatch(setPage({page: newPage})) ;
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
       dispatch(setPageCount({pageCount: +event.target.value})) ;
        dispatch(setPage({page: 1}));
    };

    const packs = useAppSelector(state => state.packs.cardPacks)
    const myPacks = packs && packs.filter(p=>p.user_id === p._id)
    const showPacks = !packsData.isMyPacks ? packs : myPacks

    const deletePackHandler = () => {
        debugger
        // @ts-ignore
        dispatch(deletePacksTC(packs._id))
    }
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
                        { packs  &&  packs
                            .slice(packsData.page * packsData.pageCount, packsData.page * packsData.pageCount + packsData.pageCount)
                            .map((packs) => (
                                <StyledTableRow key={packs._id}>
                                    <StyledTableCell align="left">
                                        {packs.name}
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
                                                <div onClick={()=>{
                                                    const ChangedPack = {
                                                        _id: packs._id,
                                                        name: 'My updated pack'
                                                    }
                                                    // @ts-ignore
                                                    dispatch(updatePacksTC(ChangedPack))
                                                }}><img src={editIcon} alt="changeIcon"/></div>}
                                            {packs.user_id === profileId &&
                                                <div onClick={() => {
                                                    // @ts-ignore
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