import React from 'react'

export const Input = ({ handleChange, lbl, src, isRequired, value, name, type, isDisabled, errorMsg, lblCols, inputCols, errMsgCols, placeholder }) => {
    const prepareInputControls = () => {
        switch (type) {
            case 'text':
            case 'number':
            case 'password':
                return <input placeholder={placeholder} disabled={isDisabled} value={value} onChange={handleChange} name={name} type={type} className='form-control' />
            default:
                return <><input placeholder={placeholder} disabled={isDisabled} onChange={handleChange} name={name} type={type} className='form-control' />
                    <img width={100} height={100} src={src || (value && `${process.env.NEXT_PUBLIC_UPLOAD_URL}${value}?date=${Date.now()}`)} />
                </>

        }
    }
    return <div className='row mb-3'>
        <div className={`col-sm-${lblCols} text-end`}>
            <b>{lbl}{isRequired && <span className='text-danger'>*</span>}:</b>
        </div>
        <div className={`col-sm-${inputCols}`}>
            {prepareInputControls()}
        </div>
        <div className={`col-sm-${errMsgCols}`}>
            {errorMsg && <b className='text-danger'>{errorMsg}</b>}
        </div>
    </div>

}
