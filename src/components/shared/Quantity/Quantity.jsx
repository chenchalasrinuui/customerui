import React from 'react'
import style from './Quantity.module.css'

export const Quantity = ({ quan, handleQuantity, name }) => {
    return (
        <>
            <button disabled={quan == 1} onClick={() => handleQuantity(name, 'D')}>-</button><span className='ms-2 me-2'>{quan}</span><button onClick={() => handleQuantity(name, 'I')}>+</button>
        </>
    )
}
