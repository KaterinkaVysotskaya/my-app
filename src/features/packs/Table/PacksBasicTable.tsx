import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../../common/hooks/react-redux-hooks';
import {deletePacksTC, getPacksTC, updatePacksTC} from "../packsReducer";
import {PATH} from "../../../common/Routing/Routes";
import {useAppDispatch} from "../../../app/store";
import {TablePagination} from "@mui/material";
import learnIcon from '../../../assets/images/icons/teacher.svg'
import editIcon from '../../../assets/images/icons/Edit.svg'
import deleteIcon from '../../../assets/images/icons/Delete.svg'
import sortIcon from '../../../assets/images/icons/Polygon.svg'
import {StyledTableCell, StyledTableRow} from '../../../common/styles/tables.styles';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const ASC = '0'
const DESC = '1'

export const BasicTable = () => {
    const search = useAppSelector(state => state.packs.search)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const max = useAppSelector(state => state.packs.max)
    const min = useAppSelector(state => state.packs.min)
    const profileId = useAppSelector(state => state.profile.userProfile?._id)
    const packsData = useAppSelector(state => state.packs)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const myPacks = packs && packs.filter(p => p.user_id === profileId)
    const showPacks = packsData.isMyPacks ? myPacks : packs
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const pack_ID = useParams()
    const [searchParams, setSearchParams] = useSearchParams();

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    searchParams.get("pack_ID")
    // const [page, setPage] = React.useState(0);

    //
    // function setURLSearchParam(key: string, value: string) {
    //     const url = new URL(window.location.href);
    //     url.searchParams.set(key, value);
    //     window.history.pushState({path: url.href}, '', url.href);
    // }
    //
    // const goToCards = () => {
    //     navigate({
    //         pathname: PATH.CARDSLIST,
    //         search: '?pack_ID='
    //     })
    // }

    const handleChangePage = (event: unknown, page: number) => {
        //rowsPerPage this is pageCount
        console.log('handleChangePage: ', page)
        dispatch(getPacksTC({page: page, pageCount: rowsPerPage}));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        console.log('setRowsPerPage: ',+event.target.value )
        setRowsPerPage(+event.target.value)
        dispatch(getPacksTC({page, pageCount: +event.target.value}));
    };


    const onSortHandler = () => {
        // dispatch(setPackTC({sortPacks: sortBy === DESC ? '0updated' : '1updated'}))
        // dispatch(sortByDateAC({sortBy === DESC ? DESC : ASC}))
    }

    const deletePack = (packId: string) => {
        dispatch(deletePacksTC(packId))
    }

    const changedPack = (packId: string) => {
        const ChangedPack = {
            _id: packId,
            name: 'My updated pack'
        }
        dispatch(updatePacksTC(ChangedPack))
    }

    const navigateHandler = (packId: string) => {
        navigate({
            pathname: PATH.CARDSLIST,
            search: 'pack_ID=' + packId
        })
    }
    useEffect(() => {
        setRowsPerPage(packsData.pageCount)
    }, [packsData.pageCount])

    useEffect(() => {
        dispatch(getPacksTC({}))
    }, [])


    // useEffect(()=>{
    //     console.log(page)
    //     dispatch(getPacksTC())
    // },[search, page, pageCount, max, min])


    return (
        <>
            <TableContainer component={Paper}>
                <Table width={650} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="left">Cards</StyledTableCell>
                            <StyledTableCell align="left">
                                Last Updated
                                <img style={{padding: '2px', cursor: 'pointer'}}
                                     src={sortIcon}
                                     alt="sortIcon"
                                     onClick={onSortHandler}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="left">Created by</StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.map((pack) => (
                                <StyledTableRow key={pack._id}>
                                    <StyledTableCell align="left" onClick={() => navigateHandler(pack._id)}>
                                        {pack.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {pack.cardsCount}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {pack.updated}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{pack.user_name}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <div style={{display: 'flex', width: '95px', justifyContent: 'space-between'}}>
                                            <div>
                                                <img src={learnIcon} alt="learnIcon"/>
                                            </div>

                                            {
                                                pack.user_id === profileId &&
                                                <div onClick={() => changedPack(pack._id)}>
                                                    <img src={editIcon} alt="changeIcon"/>
                                                </div>
                                            }
                                            {
                                                pack.user_id === profileId &&
                                                <div onClick={() => deletePack(pack._id)}>
                                                    <img src={deleteIcon} alt="deleteIcon"/>
                                                </div>
                                            }
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[1, 5, 10, 20, 100]}
                count={packsData.cardPacksTotalCount}
                page={packsData.page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // showFirstButton={true}

            />
        </>
    );
}



