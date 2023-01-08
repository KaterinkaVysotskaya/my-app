import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "../../../features/auth/SingIn/SignIn";
import SignUp from "../../../features/auth/SingUp/SignUp";
import Error404 from "../PageNotFound/Error404";
import EnterNewPassword from "../../../features/auth/CreateNewPassword/EnterNewPassword";
import ForgotPassword from "../../../features/auth/ForgotPassword/ForgotPassword";
import Profile from "../../../features/profile/Profile";
import CheckEmail from "../../../features/auth/CheckEmail/CheckEmail";
import PrivateRoute from "../../utils/ProtectedRoute";
import Packslist from "../../../features/packs/Packslist";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot-password',
    SET_NEW_PASSWORD: '/set-new-password',
    CHECK_EMAIL: '/check-email',
    PACKSLIST: '/packslist'

}

function Rout() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Profile />} />
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />}/>
                <Route path={PATH.SET_NEW_PASSWORD+'/*'} element={<EnterNewPassword />}/>
                <Route path={PATH.SET_NEW_PASSWORD+'/:token'} element={<EnterNewPassword />}/>
                <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />}/>
                <Route path={PATH.LOGIN}element={ <Login/>}/>
                <Route path={PATH.REGISTER}element={ <SignUp/>}/>
                <Route path={PATH.PROFILE}
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route path={PATH.PACKSLIST}
                       element={
                           <PrivateRoute>
                               <Packslist />
                           </PrivateRoute>
                       }
                />
                <Route path={'*'}element={ <Error404/>}/>
            </Routes>
        </div>
    )
}

export default Rout
