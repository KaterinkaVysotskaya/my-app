import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Login from "../../../features/auth/SingIn/SignIn";
import Register from "../../../features/auth/SingUp/Register";
import Error404 from "../PageNotFound/Error404";
import Test from "../../../features/Main/Test";
import EnterNewPassword from "../../../features/EnterNewPassword/EnterNewPassword";
import ForgotPassword from "../../../features/RecoveryPassword/ForgotPassword";
import Profile from "../../../features/profile/Profile";
import CheckEmail from "../../../features/CheckEmail/CheckEmail";

export const PATH = {
    PRE_JUNIOR: '/pre-junior',
    // add paths
}

function Rout() {
    return (
        <div>
            <Routes>

                <Route path={'Test'} element={<Test />}/>
                <Route path={'CheckEmail'} element={<CheckEmail />}/>
                <Route path={'set-new-password/*'} element={<EnterNewPassword />}/>
                <Route path={'set-new-password/:token'} element={<EnterNewPassword />}/>
                <Route path={'ForgotPassword'} element={<ForgotPassword />}/>
                <Route path={"Login"}element={ <Login/>}/>
                <Route path={"Register"}element={ <Register/>}/>
                <Route path={"Profile"}element={ <Profile/>}/>
                <Route path={'*'}element={ <Error404/>}/>

            </Routes>
        </div>
    )
}

export default Rout
