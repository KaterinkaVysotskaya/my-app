import {Button, Input} from '@material-ui/core';
import React, {ChangeEvent,  useState} from 'react';
import {useDispatch} from "react-redux";
import { Navigate } from 'react-router-dom';
import {useAppSelector} from "../../common/hooks/react-redux-hooks";
import {logoutTC} from "../auth/authReducer";
import userIcon from '../../assets/ProfileImg/9311412861606062171-128.png'
import editIcon from '../../assets/EditIcon/122705455016276482623764-128.png'
import s from './Profile.module.css'
import {_updateProfile} from "./ProfileReducer";
import {useAppDispatch} from "../../app/store";

function Profile() {

    const [editMode, setEditMode] = useState(false)

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const user = useAppSelector(state=> state.profile.userProfile)

    const [userName, setUserName] = useState<string>('')
    const [photo, setPhoto] = useState<null | File>(null)

    const logOutHandler = () =>{
        dispatch(logoutTC())
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const userPhoto = e.target.files[0]
            setPhoto(userPhoto)
            //dispatch(_updateProfile({avatar: userPhoto}))
        }
    }

    const onProfileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
       setUserName(e.currentTarget.value)
    }

    return (
        <div className="container">
            <div className={s.profileBlock}>
                <b><br/>Personal information</b>
                <div className={s.info}>

                    {
                        editMode
                        ? <Input autoFocus={true}
                                       onBlur={() => setEditMode(false)}
                                       value={userName}
                                       onChange={onProfileNameChange}/>
                        : <div>
                            <br/> {user && user.name}
                            <img onClick={() => setEditMode(true)} src={editIcon} alt="edit"/>
                        </div>
                    }
                        <br/>{user && user.email}
                </div>
                <div>
                    <img src={ user && user.avatar || userIcon} alt="profilePhoto"/>
                    <Input  type="file" name='file' onChange={onMainPhotoSelected}/>
                </div>
            </div>
            {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Log out</Button>}
        </div>
    );
}

export default Profile;
