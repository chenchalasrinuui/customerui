import React, { useEffect, useState } from 'react'
import { AppTable } from '../../../components/shared/AppTable'
import Ajax from '../../../services/ajax'
import { AppForm } from '../../../components/shared/AppForm'
import { AddressForm } from './AddressForm'
import { useDispatch } from 'react-redux'
export const Address = () => {
    const [showForm, setShowForm] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [data, setData] = useState([])
    const [row, setRow] = useState({})
    const dispatch = useDispatch();

    /**
     * get vendros list
     */

    const fnGetAddress = async () => {
        try {
            dispatch({ type: 'LOADER', payload: true })
            const res = await Ajax.get('address/get-add')
            setData(res?.data)
        } catch (ex) {
            setData([])
            console.error("Address", ex)
        } finally {
            dispatch({ type: 'LOADER', payload: false })

        }

    }
    useEffect(() => {
        fnGetAddress()
    }, [])

    const fnAddAddress = () => {
        setRow({});
        setIsEdit(false)
        setShowForm(true);
    }
    const fnEdit = (row) => {
        setRow(row);
        setIsEdit(true)
        setShowForm(true)
    }
    const fnHandleDelete = async (id) => {
        try {
            dispatch({ type: 'LOADER', payload: true })

            const res = await Ajax.delete(`address/delete/${id}`)
            const { acknowledged, deletedCount } = res?.data
            if (acknowledged && deletedCount) {

                fnGetAddress();
                dispatch({
                    type: 'TOASTER', payload: {
                        isShowToaster: true,
                        toasterMsg: 'Deleted !!!',
                        color: 'green'
                    }
                })
            }
        } catch (ex) {
            console.error("Vendor", ex)
            dispatch({
                type: 'TOASTER', payload: {
                    isShowToaster: true,
                    toasterMsg: 'Not Deleted !!!',
                    color: 'red'
                }
            })
        } finally {
            dispatch({ type: 'LOADER', payload: false })

        }
    }
    const fnDelete = (row) => {

        dispatch({
            type: "MODAL",
            payload: {
                isShowModal: true,
                modalAction: () => fnHandleDelete(row._id)
            }
        })

    }
    return (
        <div>
            <div className='text-end my-2'>
                <button onClick={fnAddAddress} className='btn btn-primary'>Add Address</button>
            </div>
            <AppTable
                ths={["ID", "UID", "Password", "Phone", "Address"]}
                data={data}
                tds={['_id', 'uid', 'pwd', 'phone', 'address']}
                handleEdit={fnEdit}
                handleDelete={fnDelete}
            />
            {showForm && <AppForm setShowForm={setShowForm}>
                <AddressForm setShowForm={setShowForm} fnGetAddress={fnGetAddress} row={row} isEdit={isEdit} />
            </AppForm>}
        </div>
    )
}
