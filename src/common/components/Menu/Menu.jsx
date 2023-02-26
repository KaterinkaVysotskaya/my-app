import React, {useState} from 'react';
import s from './Menu.module.css'
import {Link} from "react-router-dom";
import {PATH} from "../../Routing/Routes";

function Menu() {
    const [toggle, setToggle] = useState(false)
    return (
        <div>
            <div className={toggle ? s.show : s.header}
                 onFocus={() => setToggle(!toggle)}
                 onBlur={() => setToggle(toggle)}>
                <Link to={PATH.LOGIN} className={s.link} >Login</Link>
                <Link to={PATH.REGISTER} className={s.link }>Register</Link>
                <Link to={PATH.PROFILE} className={s.link}>Profile</Link>
                <Link to={'404'} className={s.link }>404</Link>
                <Link to={PATH.CHECK_EMAIL} className={s.link }>Check Email</Link>
                <Link to={PATH.PACKSLIST} className={s.link }>Packslist</Link>
                <Link to={PATH.SET_NEW_PASSWORD} className={s.link }>Enter new password</Link><Link to={PATH.FORGOT_PASSWORD} className={s.link }>Forgot your password</Link>
            </div>
            <div className={s.block} />
        </div>
    );
}

export default Menu;
