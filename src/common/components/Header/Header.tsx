import React from 'react';
import s from './Header.module.css'
import logoSVG from '../../../assets/images/icons/it-incubator.svg'
import {useAppSelector} from "../../hooks/react-redux-hooks";
import {Button} from "../reusableComponents/button/Button";
import userIcon from '../../../assets/images/ProfileImg/9311412861606062171-128.png'
import Link from '@material-ui/core/Link';
import {HeaderContainer, ProfileAvatar, ProfileData, ProfileName } from './Header.styles';
import {PATH} from "../Routing/Routes";



function Header() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user = useAppSelector(state => state.profile.userProfile)

    return (
        <HeaderContainer>
            <img src={logoSVG} alt="logo"/>
            {
                isLoggedIn
                    ? <ProfileData>
                        <ProfileName>{user && user.name}</ProfileName>
                        <ProfileAvatar src={userIcon} alt="user avatar"/>
                      </ProfileData>
                    : <Link href={PATH.LOGIN}><Button width={'113px'} buttonname={'Sign in'}/></Link>
            }

        </HeaderContainer>
    );
}

export default Header;
