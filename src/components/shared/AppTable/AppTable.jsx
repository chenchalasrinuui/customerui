import React, { useState } from 'react'
import styles from './AppTable.module.css'
import { Pagination } from './Pagination'
import Image from 'next/image'

export const AppTable = ({ ths, imgThs, imgTds, data, tds, handleEdit, handleDelete }) => {
    const perPage = 5;
    const [currPage, setCurrPage] = React.useState(1)
    const [currData, setCurrData] = useState([])
    React.useEffect(() => {
        const end = currPage * perPage;
        const start = end - perPage;
        setCurrData(data?.slice?.(start, end))
    }, [currPage, data])

    return (
        <div>
            {data && data?.length > 0 ? <>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                {
                                    imgThs?.map((val, ind) => {
                                        return <th id={`th_ ${ind}`}>{val}</th>
                                    })
                                }
                                {
                                    ths?.map((val, ind) => {
                                        return <th id={`th_ ${ind}`}>{val}</th>
                                    })
                                }
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currData?.map((obj, index) => {
                                    return <tr id={`tr_${index}`}>
                                        {
                                            imgTds?.map((val, ind) => {
                                                return <td id={`th_ ${ind}`}><Image src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${obj[val]}?date=${Date.now()}`} width={100} height={100} /></td>
                                            })
                                        }
                                        {
                                            tds?.map((val, ind) => {
                                                return <td id={`th_ ${ind}`}>{obj[val]}</td>
                                            })
                                        }
                                        <th>
                                            <button onClick={() => handleEdit(obj)}>Edit</button>
                                        </th>
                                        <th>
                                            <button onClick={() => handleDelete(obj)}>Delete</button>
                                        </th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(data?.length || 0 / perPage)} />
            </> : <div className='text-center mt-5'>No data found </div>
            }
        </div>
    )
}
