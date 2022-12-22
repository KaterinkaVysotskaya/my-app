import {Button, TextField} from '@material-ui/core';
import React, { useState} from 'react';
import { Navigate } from 'react-router-dom';
import {useAppSelector} from "../../common/hooks/react-redux-hooks";
import {logoutTC} from "../auth/authReducer";
import userIcon from '../../assets/images/ProfileImg/9311412861606062171-128.png'
import editIcon from '../../assets/images/EditIcon/122705455016276482623764-128.png'
import s from './Profile.module.css'
import {_updateProfile} from "./ProfileReducer";
import {useAppDispatch} from "../../app/store";
import {useFormik} from "formik";

import FileBase64 from 'react-file-base64';

export type FormikErrorType = {
    userName?: string
    photo?: string | File
}
function Profile() {
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    const user = useAppSelector(state=> state.profile.userProfile)
   const [photo, setPhoto] = useState<string | File>('')
    const formik = useFormik({
        initialValues: {
            userName: '',
            photo:  ''
        },
            validate: (values) =>{

            },
        onSubmit: values => {
            debugger
            let reader = new FileReader();
            if ( typeof values.photo  !== 'string') {

                reader.readAsDataURL(values.photo);

            }
            // @ts-ignore
            dispatch(_updateProfile({name: values.userName, avatar:  reader.result}))
            formik.resetForm()
        }})

    const [editMode, setEditMode] = useState(false)

    const dispatch = useAppDispatch()

    const logOutHandler = () =>{
        dispatch(logoutTC())
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit} className={s.profileBlock}>
                <b><br/>Personal information</b>
                <div className={s.info}>
                    {
                        editMode
                        ? <div>
                                <TextField
                                    type='textarea'
                                    margin="normal"
                                    autoFocus={true}

                                       {...formik.getFieldProps('userName')}

                                />
                                {formik.errors.userName && <div style={{color: 'red'}}>{formik.errors.userName}</div>}
                                <Button
                                        type={'submit'}
                                        variant={'contained'}
                                        color={'primary'}
                                >
                                    save
                                </Button>
                            </div>
                        : <div>
                            <br/> {user && user.name}
                            <img onClick={() => setEditMode(true)} src={editIcon} alt="edit"/>
                        </div>
                    }
                        <br/>{user && user.email}
                </div>
                <div>
                    <img src={ userIcon} alt="profilePhoto"/>
                    <TextField  type="file"

                            {...formik.getFieldProps('photo')}
                    />
                    {formik.errors.photo && <div style={{color: 'red'}}>{formik.errors.photo}</div>}
                </div>
            </form>
            {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Log out</Button>}
        </div>
    );
}

export default Profile;
