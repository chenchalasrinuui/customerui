import React, { useState, useRef } from 'react'
import config from './config.json'
import otpConfig from './configOTP.json'
import { Input } from '../../../components/shared/Input'
import { handleFieldLevelValidation, handleFormLevelValidation } from '../../../services/validations'
import Ajax from '../../../services/ajax'
import { useDispatch } from 'react-redux'
import { AppCookies } from '../../../services/cookies'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
    const [inputControls, setInputControls] = useState(config)
    const [inputControlsOTP, setInputControlsOTP] = useState(otpConfig)
    const navgiate = useNavigate();
    const [otp, setOTP] = useState('')
    const dispatch = useDispatch()
    const userInfo = useRef();
    const generateOTP = () => {
        let otp = "";

        const randomchar =
            "0123456789";
        // Generate captcha for length of
        // 5 with random character
        for (let i = 1; i <= 4; i++) {
            otp += randomchar.charAt(
                Math.random() * randomchar.length)
        }
        setOTP(otp)
    }
    const fnLogin = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const [isInValid, dataObj] = await handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            const res = await Ajax.post('users/login', dataObj)
            if (res?.data?.length) {
                generateOTP()
                userInfo.current = res?.data?.[0]
            } else {
                dispatch({
                    type: 'TOASTER', payload: {
                        isShowToaster: true,
                        toasterMsg: 'Wrong user id',
                        color: 'red'
                    }
                })
            }
            console.log(11, res);
        } catch (ex) {
            dispatch({
                type: 'TOASTER', payload: {
                    isShowToaster: true,
                    toasterMsg: ex.message,
                    color: 'red'
                }
            })
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    const handleChange = async (eve) => {
        await handleFieldLevelValidation(eve, inputControls, setInputControls)
    }
    const handleChangeOTP = async (eve) => {
        await handleFieldLevelValidation(eve, inputControlsOTP, setInputControlsOTP)
    }
    const fnValidateOTP = async () => {
        const [isInValid, dataObj] = await handleFormLevelValidation(inputControlsOTP, setInputControlsOTP)
        if (isInValid) return;
        if (otp === dataObj?.otp) {
            const res = await Ajax.post('users/get-token', { data: userInfo.current })
            const { email, phone, token } = res.data
            if (token) {
                AppCookies.setCookie('uid', email, 7);
                AppCookies.setCookie('phone', phone, 7)
                AppCookies.setCookie('token', token, 7)
                dispatch({ type: 'LOGIN', payload: true })
                navgiate(-1)
            }
        } else {
            dispatch({
                type: 'TOASTER', payload: {
                    isShowToaster: true,
                    toasterMsg: 'Invalid OTP',
                    color: 'red'
                }
            })
        }
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login {otp}</h3>
            {!otp && <>
                {

                    inputControls.map((obj, index) => {
                        return <Input key={index} {...obj} handleChange={handleChange} />
                    })
                }

                < div className='row'>
                    <div className='offset-sm-5 col-sm-7'>
                        <button onClick={fnLogin} className='btn btn-dark'>Login</button>
                    </div>
                </div>
            </>
            }
            {otp && <>
                {

                    inputControlsOTP.map((obj, index) => {
                        return <Input key={index} {...obj} handleChange={handleChangeOTP} />
                    })
                }

                < div className='row'>
                    <div className='offset-sm-5 col-sm-7'>
                        <button onClick={fnValidateOTP} className='btn btn-dark'>Validate</button>
                    </div>
                </div>
            </>
            }
        </div>
    )
}
