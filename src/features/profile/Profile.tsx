import {FormLabel, Grid, TextField} from '@material-ui/core';
import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from "../../common/hooks/react-redux-hooks";
import {logoutTC} from "../auth/authReducer";
import userIcon from '../../assets/images/ProfileImg/9311412861606062171-128.png'
import {_updateProfile} from "./ProfileReducer";
import {useAppDispatch} from "../../app/store";
import {useFormik} from "formik";
import styled from "styled-components";
import {Footer, GridContainer, StyledTitle} from "../../common/styles/FormStyles/Form.styles";
import {Button} from "../../common/components/reusableComponents/button/Button";
import editIcon from '../../assets/images/icons/Edit.svg'
import BackToPackListsButton
    from "../../common/components/reusableComponents/BackToPacksListButton/BackToPackListsButton";

export type FormikErrorType = {
    userName?: string
    photo?: string | File
}


export const SmallContainer = styled(GridContainer)`
  width: 413px;
  height: 360px;
`

export const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ProfilePhoto = styled.img`
  width: 96px;
  height: 96px;
  left: 593px;
  top: 204px;
`
export const EditIcon = styled.img`
  width: 16px;
  height: 16px;
  padding-left: 4px;
`
export const ProfileContainer = styled(SmallContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
export const UserEmail = styled.div`
  margin-bottom: 29px;
  padding-top: 23px;
`

export const EditMode = styled.div`
  display: flex;
  align-items: center;
`

function Profile() {
    const user = useAppSelector(state => state.profile.userProfile)
    const [photo, setPhoto] = useState<string | File>('')
    const formik = useFormik({
        initialValues: {
            userName: '',
            photo: ''
        },
        validate: (values) => {

        },
        onSubmit: values => {
            debugger
            let reader = new FileReader();
            if (typeof values.photo !== 'string') {

                reader.readAsDataURL(values.photo);

            }
            // @ts-ignore
            dispatch(_updateProfile({name: values.userName, avatar: reader.result}))
            formik.resetForm()
        }
    })

    const [editMode, setEditMode] = useState(false)

    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <>
            <BackToPackListsButton/>
            <Grid container justifyContent={'center'}>

                <ProfileContainer item style={{justifyContent: "center"}}>

                    <form onSubmit={formik.handleSubmit}>
                        <FormLabel>
                            <StyledTitle>Personal Information</StyledTitle>
                        </FormLabel>
                        <ProfileData>
                            <div>
                                <ProfilePhoto src={userIcon} alt="profilePhoto"/>
                                {/*<TextField  type="file"*/}

                                {/*            {...formik.getFieldProps('photo')}*/}
                                {/*/>*/}

                                {/*{formik.errors.photo && <div style={{color: 'red'}}>{formik.errors.photo}</div>}*/}
                            </div>
                            {
                                editMode
                                    ? <EditMode>
                                        <TextField
                                            type='textarea'
                                            margin="normal"
                                            autoFocus={true}

                                            {...formik.getFieldProps('userName')}

                                        />
                                        {formik.errors.userName && <div style={{color: 'red'}}>{formik.errors.userName}</div>}
                                        <Button buttonname={'Save'}
                                                type={'submit'}
                                        >
                                        </Button>
                                    </EditMode>
                                    : <div>
                                        {user && user.name}
                                        <EditIcon onClick={() => setEditMode(true)} src={editIcon} alt="edit"/>

                                    </div>
                            }

                        </ProfileData>
                    </form>
                    <Footer>
                        <UserEmail>
                            {user && user.email}
                        </UserEmail>
                        <Button buttonname={'Log out'} onClick={logOutHandler}></Button>
                    </Footer>
                </ProfileContainer>
            </Grid>
        </>

    );
}

export default Profile;
