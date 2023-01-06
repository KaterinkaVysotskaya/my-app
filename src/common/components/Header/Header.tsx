import React, {useState} from 'react';
import s from './Header.module.css'
import logoSVG from '../../../assets/images/icons/it-incubator.svg'
import {useAppSelector} from "../../hooks/react-redux-hooks";
import {Button} from "../reusableComponents/button/Button";
import {AppStoreType} from "../../../app/store";
import {Link} from "react-router-dom";
import userIcon from '../../../assets/images/ProfileImg/9311412861606062171-128.png'
function Header() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user = useAppSelector(state=>state.profile.userProfile)
    const onClicKHandler = () => {
        <Link to={'/Login'} className={s.link}></Link>
    }
    return (
        <div className={s.headerContainer}>
            <img src={logoSVG} alt="logo"/>
            {
                isLoggedIn
                    ? <div className={s.profileData}>
                    <span className={s.name}>{user&&user.name}</span>
                        <img className={s.avatar} src={userIcon} alt="user avatar"/>
                    </div>
                    : <Button width={'113px'} buttonName={'Sign in'} onClick={onClicKHandler} />
            }

        </div>
    );
}

export default Header;
