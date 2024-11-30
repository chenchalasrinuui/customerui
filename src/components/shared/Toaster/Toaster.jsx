import React, { useContext, useEffect, useState } from 'react'
import styles from './Toaster.module.css'
import { useDispatch, useSelector } from 'react-redux'

export const Toaster = () => {
    const dispatch = useDispatch()
    const { toasterMsg, color } = useSelector((state) => state?.appReducer?.toaster || {})
    const [width, setWidth] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setWidth((prev) => {
                if (prev === 290) {
                    clearInterval(interval)
                    closeToaster();
                    return 0
                }
                return prev + 1
            })
        }, 50)
    }, [])
    const closeToaster = () => {
        dispatch({
            type: "TOASTER",
            payload: {
                isShowToaster: false,
                toasterMsg: '',
                color: ''
            }
        })
    }
    return (
        <div className={styles?.toaster} style={{ backgroundColor: color }} >
            <div>{toasterMsg}</div>
            <b onClick={closeToaster}>X</b>
            <div style={{ width }}></div>
        </div>
    )
}
