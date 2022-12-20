import React, {useState} from 'react';
import s from './Header.module.css'
import {Link} from "react-router-dom";

function Header() {
    const [toggle, setToggle] = useState(false)
    return (
        <div>
            <div className={toggle ? s.show : s.header}
                 onFocus={() => setToggle(!toggle)}
                 onBlur={() => setToggle(toggle)}>
                <Link to={'Login'} className={s.link} >Login</Link>
                <Link to={'Register'} className={s.link }>Register</Link>
                <Link to={'Profile'} className={s.link}>Profile</Link>
                <Link to={'404'} className={s.link }>404</Link>
                <Link to={'CheckEmail'} className={s.link }>Check Email</Link>
                <Link to={'set-new-password'} className={s.link }>Enter new password</Link>
                <Link to={'Test'} className={s.link }>Test</Link>
            </div>
            <div className={s.block} />
        </div>
    );
}

export default Header;
