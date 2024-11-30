import React, { useState, useEffect, forwardRef } from 'react'
import styles from './Captcha.module.css'

export const Captcha = forwardRef(({ validateCaptcha, isValidCaptcha, isFirstTimeLoad }, ref) => {
    const [captchaText, setCapatchText] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        fnGenerateCaptcha()
    }, [])

    const fnGenerateCaptcha = () => {
        let chars = "";

        const randomchar =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 1; i <= 5; i++) {
            chars += randomchar.charAt(
                Math.random() * randomchar.length)
        }
        setCapatchText(chars)
        validateCaptcha(false);
        setValue("")
    }

    const handleChange = (eve) => {
        const value = eve.target.value
        setValue(value);
        validateCaptcha(value === captchaText)

    }
    return (
        <div className='row'>
            <div className='col-sm-5 text-end'>
                <b>Enter Captcha</b>
            </div>
            <div className='col-sm-3'>
                <p>
                    <input value={value} className='form-control' onChange={handleChange} />
                </p>
                <p>
                    <span className={styles.captcha}>{captchaText}</span><button ref={ref} onClick={fnGenerateCaptcha} className="btn btn-dark">refresh</button>
                </p>
            </div>
            <div className='col-sm-4 text-danger'>
                {!isFirstTimeLoad && !isValidCaptcha && <b>Invalid Captch</b>}
            </div>


        </div>
    )
})
