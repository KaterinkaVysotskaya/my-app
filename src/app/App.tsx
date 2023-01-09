import React, {useEffect} from 'react'
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {useAppSelector} from "../common/hooks/react-redux-hooks";
import {initializeAppTC} from "./appReducer";
import {CircularProgress, LinearProgress} from '@material-ui/core';
import CustomizedSnackbars from '../common/components/ErrorSnackBar/ErrorSnackBar';
import Header from "../common/components/Header/Header";
import Menu from "../common/components/Menu/Menu";

import {createGlobalStyle} from 'styled-components'
import {Main} from "../common/components/Main/Main";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }
`

function App() {
    const dispatch = useDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (<>
            {status === 'loading' && <LinearProgress  color="secondary"/>}

            <div>
                <Header/>
                <GlobalStyle/>
                <Main/>
                <Menu/>
                <CustomizedSnackbars/>
            </div>
        </>
    );
}

export default App;

