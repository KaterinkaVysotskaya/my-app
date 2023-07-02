import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {StyledTableCell, StyledTableRow} from "../../common/styles/tables.styles";
import TableBody from "@mui/material/TableBody";
import Link from "@material-ui/core/Link";
import {PATH} from "../../common/Routing/Routes";
import editIcon from "../../assets/images/icons/Edit.svg";
import deleteIcon from "../../assets/images/icons/Delete.svg";
import * as React from "react";
import {useEffect} from "react";
import {deleteCardTC, getCardsTC, setPack_ID, updateCardTC} from "./cardsReducer";
import {useAppSelector} from "../../common/hooks/react-redux-hooks";
import {useAppDispatch} from "../../app/store";
import {Rating, TablePagination} from "@mui/material";
import {getPacksTC} from "../packs/packsReducer";

export const CardsTable = () => {
    const search = useAppSelector(state => state.cards.search)
    const cards = useAppSelector(state => state.cards.cards)
    const cardsData = useAppSelector(state => state.cards)
    const packUserId = useAppSelector(state=>state.cards.packUserId)
    const profileId = useAppSelector(state => state.profile.userProfile?._id)
    const dispatch = useAppDispatch()
    const pack_ID = useAppSelector(state=>state.cards.statePack_id)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, page: number) => {

        // dispatch(getCardsTC({page: page, pageCount: rowsPerPage}));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        console.log('setRowsPerPage: ',+event.target.value )
        setRowsPerPage(+event.target.value)
        // dispatch(getCardsTC({page, pageCount: +event.target.value}));
    };
    useEffect(() => {
        setRowsPerPage(cardsData.pageCount)
    }, [cardsData.pageCount])

    return (
        <>
            <TableContainer component={Paper}>
                <Table width={650} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Question</StyledTableCell>
                            <StyledTableCell align="left">Answer</StyledTableCell>
                            <StyledTableCell align="left">Last Updated</StyledTableCell>
                            <StyledTableCell align="left">Grade</StyledTableCell>
                            <StyledTableCell align="left"> </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards && cards
                            .map((cards) => (
                                <StyledTableRow key={cards._id}>
                                    <StyledTableCell align="left">
                                        <Link href={PATH.CARDSLIST}>
                                            {cards.question}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {cards.answer}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {cards.updated}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Rating name="read-only" value={cards.grade} readOnly/>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {packUserId === profileId &&
                                            <div style={{display: 'flex', width: '95px', justifyContent: 'space-between'}}>

                                                <div onClick={() => {
                                                    const ChangedPack = {
                                                        _id: cards._id,
                                                        name: 'My updated pack'
                                                    }
                                                    dispatch(updateCardTC(ChangedPack))
                                                }}><img src={editIcon} alt="changeIcon"/></div>

                                                <div onClick={() => {
                                                    dispatch(deleteCardTC(cards._id))
                                                }}><img src={deleteIcon} alt="deleteIcon"/></div>

                                            </div>}
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[1, 5, 10, 20, 100]}
                count={cardsData.cardsTotalCount}
                page={cardsData.page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // showFirstButton={true}

            />
        </>


    )
}