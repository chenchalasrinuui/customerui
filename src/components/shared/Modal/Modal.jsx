import React, { useContext } from 'react'
import styles from './Modal.module.css'
import { useDispatch, useSelector } from 'react-redux'


export const Modal = () => {
    const dispatch = useDispatch();
    const modalAction = useSelector((state) => state?.appReducer?.modal?.modalAction || (() => { }))
    const message = useSelector((state) => state?.appReducer?.modal?.message || '')
    const fnOK = () => {
        modalAction();
        fnCancel();
    }
    const fnCancel = () => {
        dispatch({
            type: "MODAL",
            payload: {
                isShowModal: false,
                modalAction: () => { }
            }
        })
    }
    return (
        <div>
            <div className={styles.modalMask}></div>
            <div className={`px-3 py-3 ${styles.modalContent}`}>
                <h5 className="mb-5">{message || 'R u sure...'}</h5>
                <div className="text-end">
                    <button className="btn btn-dark me-3" onClick={fnOK} >
                        OK
                    </button>
                    <button className="btn btn-dark" onClick={fnCancel} >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    )
}
