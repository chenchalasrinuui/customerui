import React from 'react'
import styles from './TextArea.module.css'

export const TextArea = ({ handleChange, lbl, isRequired, value, name, errorMsg, lblCols, inputCols, errMsgCols }) => {
    return <div className='row mb-3'>
        <div className={`col-sm-${lblCols} text-end`}>
            <b>{lbl}{isRequired && <span className='text-danger'>*</span>}:</b>
        </div>
        <div className={`col-sm-${inputCols}`}>
            <textarea value={value} onChange={handleChange} name={name} className='form-control' />
        </div>
        <div className={`col-sm-${errMsgCols}`}>
            {errorMsg && <b className='text-danger'>{errorMsg}</b>}
        </div>
    </div>

}
