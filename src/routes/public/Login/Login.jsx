import React, { useState } from 'react'
import config from './config.json'
import { Input } from '../../../components/shared/Input'
import { handleFieldLevelValidation, handleFormLevelValidation } from '../../../services/validations'
import Ajax from '../../../services/ajax'

export const Login = () => {
    const [inputControls, setInputControls] = useState(config)
    const fnLogin = async () => {
        try {
            const [isInValid, dataObj] = await handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            const res = await Ajax.post('users/login', dataObj)
        } catch (ex) {

        } finally {

        }
    }
    const handleChange = async (eve) => {
        await handleFieldLevelValidation(eve, inputControls, setInputControls)
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            {
                inputControls.map((obj, index) => {
                    return <Input key={index} {...obj} handleChange={handleChange} />
                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button onClick={fnLogin} className='btn btn-dark'>Login</button>
                </div>
            </div>
        </div>
    )
}
