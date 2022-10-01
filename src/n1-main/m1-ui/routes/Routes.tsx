import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Register from "../../../n2-features/f1-auth/a2-register/Register";
import Error404 from "../common/Error404/Error404";
import Test from "../../../n2-features/f0-test/Test";
import EnterNewPassword from "../common/EnterNewPassword/EnterNewPassword";
import RecoveryPassword from "../common/RecoveryPassword/RecoveryPassword";
import Profile from "../Profile/Profile";

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

                <Route path={'RecoveryPassword'} element={<RecoveryPassword />}/>

                <Route path={"Login"}element={ <Login/>}/>
                <Route path={"Register"}element={ <Register/>}/>
                <Route path={"Profile"}element={ <Profile/>}/>

                <Route path={'*'}element={ <Error404/>}/>


                {/*
             <Route path={PATH.PRE_JUNIOR} render={() => <PreJunior/>}/> */}
                // add routes

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}

            </Routes>
        </div>
    )
}

export default Rout
