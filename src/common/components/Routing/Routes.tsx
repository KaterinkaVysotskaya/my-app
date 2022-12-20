import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Login from "../../../features/auth/SingIn/SignIn";
import Register from "../../../features/auth/SingUp/Register";
import Error404 from "../PageNotFound/Error404";
import Test from "../Menu/Test";
import EnterNewPassword from "../EnterNewPassword/EnterNewPassword";
import ForgotPassword from "../RecoveryPassword/ForgotPassword";
import Profile from "../../../features/profile/Profile";
import CheckEmail from "../CheckEmail/CheckEmail";

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
