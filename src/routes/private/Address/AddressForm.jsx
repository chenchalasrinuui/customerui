import React, { useEffect, useState } from 'react'
import config from './config.json'
import { Input } from '../../../components/shared/Input'
import { TextArea } from '../../../components/shared/TextArea'
import { handleFieldLevelValidation, handleFormLevelValidation, setFormData, clearFormData } from '../../../services/validations'
import Ajax from '../../../services/ajax'
import { useDispatch } from 'react-redux'
import { AppCookies } from '../../../services/cookies'
export const AddressForm = ({ setShowForm, fnGetAddress, row, isEdit }) => {
    const [inputControls, setInputControls] = useState(config)
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit) {
            setFormData(inputControls, setInputControls, row, isEdit, "uid")
        }
    }, [row])
    const handleChange = async (eve) => {
        await handleFieldLevelValidation(eve, inputControls, setInputControls)
    }
    const fnSubmit = async () => {
        try {
            const [isInValid, data] = await handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            dispatch({ type: 'LOADER', payload: true })

            const res = await Ajax.post('address/save', { data: { ...data, uid: AppCookies.getCookie("uid") } })
            const { acknowledged, insertedId } = res?.data
            if (acknowledged && insertedId) {
                setShowForm(false)
                fnGetAddress();
                clearFormData(inputControls, setInputControls)
                dispatch({
                    type: 'TOASTER', payload: {
                        isShowToaster: true,
                        toasterMsg: 'Registered !!!',
                        color: 'green'
                    }
                })
            }
        } catch (ex) {
            console.error("Address form", ex)
            dispatch({
                type: 'TOASTER', payload: {
                    isShowToaster: true,
                    toasterMsg: 'Not Registeted !!!',
                    color: 'red'
                }
            })
        } finally {
            dispatch({ type: 'LOADER', payload: false })

        }
    }

    const fnUpdate = async () => {
        try {
            const [isInValid, data] = await handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            dispatch({ type: 'LOADER', payload: true })
            const res = await Ajax.put(`address/update/${row._id}`, { data })
            const { acknowledged, modifiedCount } = res?.data
            if (acknowledged && modifiedCount) {
                setShowForm(false)
                fnGetAddress();
                clearFormData(inputControls, setInputControls)
                dispatch({
                    type: 'TOASTER', payload: {
                        isShowToaster: true,
                        toasterMsg: 'Updated !!!',
                        color: 'green'
                    }
                })
            }
        } catch (ex) {
            console.error("VendorForm", ex)
            dispatch({
                type: 'TOASTER', payload: {
                    isShowToaster: true,
                    toasterMsg: 'Not Updated !!!',
                    color: 'red'
                }
            })
        } finally {
            dispatch({ type: 'LOADER', payload: false })

        }
    }

    return (
        <div className='container-fluid mt-5'>
            {
                inputControls.map((obj) => {
                    switch (obj.tag) {
                        case 'input':
                            return <Input {...obj} handleChange={handleChange} />
                        case 'textarea':
                            return <TextArea {...obj} handleChange={handleChange} />
                        default:
                            return <></>
                    }

                })
            }
            <div>
                {isEdit ? <button onClick={fnUpdate} className='btn btn-dark form-control'>Update</button> : <button onClick={fnSubmit} className='btn btn-dark form-control'>Submit</button>
                }
            </div>
        </div>
    )
}
