import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {useAppSelector} from "../common/hooks/react-redux-hooks";
import {initializeAppTC} from "./appReducer";
import {CircularProgress, LinearProgress} from '@material-ui/core';
import CustomizedSnackbars from '../common/components/ErrorSnackBar/ErrorSnackBar';
import s from '../common/styles/AppContainer.module.css'
import Header from "../common/components/Header/Header";
import Menu from "../common/components/Menu/Menu";
import Routes from "../common/components/Routing/Routes";

function App() {
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const isInitialized = useAppSelector(state=>state.app.isInitialized)
    const status = useAppSelector(state=>state.app.status)
    useEffect(()=>{
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
  return (
    <div className={s.container}>
        {status==='loading' && <LinearProgress className={s.linearProgress} color="secondary" />}
        <Header/>

        <Routes/>
        <Menu/>
        <CustomizedSnackbars/>
    </div>
  );
}

export default App;
