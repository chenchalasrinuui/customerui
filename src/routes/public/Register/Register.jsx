import React, { useState, useEffect } from 'react'
import config from './config.json'
import { Input } from '../../../components/shared/Input'
import { handleFieldLevelValidation, handleFormLevelValidation, clearFormData } from '../../../services/validations'
import { useDispatch } from 'react-redux'
import Ajax from '../../../services/ajax'
import { FAILURE_MSG, SUCCESS_MSG, FAILURE_CLR, SUCCESS_CLR } from '../../../services/utils'
export const Register = () => {
    const [inputControls, setInputControls] = useState(config)
    const dispatch = useDispatch();

    useEffect(() => {
        clearFormData(inputControls, setInputControls)
    }, [])
    const handleToaster = (msg, clr) => {
        dispatch({
            type: 'TOASTER',
            payload: {
                isShowToaster: true,
                toasterMsg: msg,
                color: clr
            }
        })
    }
    const fnRegister = async () => {
        try {
            const [isInValid, dataObj] = await handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            dispatch({ type: 'LOADER', payload: true })
            const res = await Ajax.post('users/register', { data: dataObj })
            const { acknowledged, insertedId } = res.data
            let isSuccess = false;
            if (acknowledged && insertedId) {
                isSuccess = true;
                clearFormData(inputControls, setInputControls)
            }
            handleToaster(isSuccess ? SUCCESS_MSG : FAILURE_MSG, isSuccess ? SUCCESS_CLR : FAILURE_CLR)

        } catch (ex) {
            handleToaster(ex?.response?.data?.message, FAILURE_CLR)

        } finally {
            dispatch({ type: 'LOADER', payload: false })
        }


    }
    const handleChange = async (eve) => {
        await handleFieldLevelValidation(eve, inputControls, setInputControls)
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Register</h3>
            {
                inputControls.map((obj, index) => {
                    return <Input key={index} {...obj} handleChange={handleChange} />
                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button onClick={fnRegister} className='btn btn-dark'>Register</button>
                </div>
            </div>
        </div>
    )
}
