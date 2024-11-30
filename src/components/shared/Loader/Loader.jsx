import React from 'react'
import styles from './Loader.module.css'
export const Loader = () => {
    return (<>
        <div className={styles?.loader}>Loader</div>
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            </div>
        </div>
    </>)
}
