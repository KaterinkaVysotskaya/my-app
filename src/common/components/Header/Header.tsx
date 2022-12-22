import React, {useState} from 'react';
import s from './Header.module.css'
import logoSVG from '../../../assets/images/icons/it-incubator.svg'
import {useAppSelector} from "../../hooks/react-redux-hooks";
import {Button} from "../reusableComponents/button/Button";
import {AppStoreType} from "../../../app/store";

function Header() {
    //const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
     const [isLoggedIn, setIsLoggedIn] = useState(false)
    const onCLichandler = () => {
        setIsLoggedIn(!isLoggedIn)
    }
    return (
        <div className={s.headerContainer}>
            <img src={logoSVG} alt="logo"/>
            {
                isLoggedIn
                    ? <div onClick={onCLichandler}>avatar</div>
                    : <Button width={'113px'} buttonName={'Sign in'} onClick={onCLichandler}/>
            }

        </div>
    );
}

export default Header;
