import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Login from "../../../features/auth/SingIn/SignIn";
import Register from "../../../features/auth/SingUp/Register";
import Error404 from "../PageNotFound/Error404";
import Test from "../Menu/Test";
import EnterNewPassword from "../EnterNewPassword/EnterNewPassword";
import ForgotPassword from "../RecoveryPassword/ForgotPassword";
import Profile from "../../../features/profile/Profile";

export const PATH = {
    PRE_JUNIOR: '/pre-junior',
    // add paths
}

function Rout() {
    return (
        <div>
            <Routes>

                <Route path={'Test'} element={<Test />}/>
                <Route path={'EnterNewPassword'} element={<EnterNewPassword />}/>
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
