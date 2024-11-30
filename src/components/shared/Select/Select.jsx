import React from 'react'
import styles from './Select.module.css'

export const Select = ({ handleChange, lbl, isRequired, value, name, errorMsg, lblCols, inputCols, errMsgCols, options, values }) => {
    return <div className='row mb-3'>
        <div className={`col-sm-${lblCols} text-end`}>
            <b>{lbl}{isRequired && <span className='text-danger'>*</span>}:</b>
        </div>
        <div className={`col-sm-${inputCols}`}>
            <select onChange={handleChange} className='form-control' name={name} value={value}>
                <option>---please select---</option>
                {
                    options?.map((val, ind) => {
                        return <option value={values[ind]}>{val}</option>
                    })
                }
            </select>
        </div>
        <div className={`col-sm-${errMsgCols}`}>
            {errorMsg && <b className='text-danger'>{errorMsg}</b>}
        </div>
    </div>

}
