import React from 'react'
import styles from './Header.module.css'
import { useSelector } from 'react-redux'
import AppMenu from '../../routes/private/AppMenu'
import { Link } from 'react-router-dom'
export const Header = () => {
    const isLoggedIn = useSelector((state) => state?.appReducer?.isLoggedIn)

    return (
        <div data-testid="header" className={styles.header}>
            <Link to="/">
                <img src="logo.png" />
            </Link>

            {isLoggedIn ? <AppMenu /> : <div className={styles.auth}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            }
        </div>
    )
}
