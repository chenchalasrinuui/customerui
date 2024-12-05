import React, { useEffect, useState } from 'react'
import Ajax from '../../../services/ajax'
import { AppCookies } from '../../../services/cookies'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCartItems = async () => {

        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie('uid')}`)
            setCartItems(res?.data?.[0]?.products || []);
            dispatch({ type: "CART", payload: res?.data?.[0]?.products?.length })
        } catch (ex) {
            console.error(ex);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    useEffect(() => {
        getCartItems()
    }, [])

    const fnDelete = async (id) => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.post('users/delete-from-cart', { uid: AppCookies.getCookie('uid'), productId: id })
            console.log(11, res);
            const { modifiedCount, acknowledged } = res?.data || {}
            if (acknowledged && modifiedCount) {
                getCartItems();
            }
        } catch (ex) {
            console.error(ex.message);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    return (
        <div className='container-fluid'>
            <h3 className='my-3 text-center'>Cart</h3>
            {
                cartItems?.length ?
                    cartItems?.map(({ _id, file, name, cost, category, description }) => {
                        return <div className='row border mb-3'>
                            <div className='col-sm-2'><img src={`${process.env.REACT_APP_VENDOR_SEVER}${file}?time=${Date.now()}`} width={100} height={100} lazy="loading" /></div>
                            <div className='col-sm-2'>
                                {name}
                            </div>
                            <div className='col-sm-2'>
                                {cost}
                            </div>
                            <div className='col-sm-2'>
                                {category}
                            </div>
                            <div className='col-sm-2'>
                                {description}
                            </div>
                            <div className='col-sm-2'>
                                <div className='mb-3'>
                                    <button onClick={() => fnDelete(_id)} className='btn btn-primary'>Delete</button>
                                </div>
                                <div>
                                    <button onClick={() => navigate(`/buy-now?id=${_id}`)} className='btn btn-primary'>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    })
                    :
                    <h5 className='text-center'>No items found</h5>
            }
        </div>
    )
}
