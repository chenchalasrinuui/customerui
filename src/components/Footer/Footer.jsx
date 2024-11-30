import React from 'react'
import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <div data-testid="footer" className={`${styles.footer} position-fixed bottom-0 w-100 text-center`}>&copy; rights belongs to me.</div>
    )
}
