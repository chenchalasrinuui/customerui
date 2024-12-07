import React, { useEffect, useState } from 'react'
import Ajax from '../../../services/ajax'
import { AppCookies } from '../../../services/cookies'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSelectAll, setIsSelectAll] = useState(true)
    const getCartItems = async () => {

        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie('uid')}`)
            setCartItems(res?.data?.[0]?.products?.map((obj) => {
                obj.isChecked = true;
                return obj;
            }) || []);
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

    const fnHandleCheck = (eve, id) => {
        const { checked } = eve.target;
        const _cartItems = [...cartItems]
        const currProduct = _cartItems.find((obj) => obj._id === id)
        currProduct.isChecked = checked;
        setCartItems(_cartItems)
        setIsSelectAll(_cartItems.every((obj) => obj.isChecked))
    }

    const fnDelete = async (id) => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.post('users/delete-from-cart', { uid: AppCookies.getCookie('uid'), productId: id })
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
    const fnSelectDeSelect = () => {
        let _cartItems = [...cartItems]
        _cartItems = _cartItems.map((obj) => {
            obj.isChecked = !isSelectAll
            return obj
        })
        setCartItems(_cartItems)
        setIsSelectAll(!isSelectAll)
    }
    const fnBuyNow = () => {
        const checkoutProducts = cartItems.filter((obj) => obj.isChecked)
        AppCookies.setCookie("checkoutProducts", JSON.stringify(checkoutProducts))
        navigate('/buy-now')
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center'>Cart</h3>

            {
                cartItems?.length ?
                    <>
                        <div className='text-end my-3'>
                            <button onClick={fnBuyNow} className='btn btn-dark'>Buy Now</button>
                            <button onClick={fnSelectDeSelect} className='btn btn-dark float-start'>{isSelectAll ? 'Deselect all' : 'Select all'}</button>
                        </div>
                        {
                            cartItems?.map(({ _id, file, name, cost, category, description, isChecked }) => {
                                return <div className='row border mb-3'>
                                    <div className='col-sm-1'>
                                        <input checked={isChecked} onChange={(eve) => fnHandleCheck(eve, _id)} type="checkbox" ></input>
                                    </div>
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
                                    <div className='col-sm-1'>
                                        <div className='mb-3'>
                                            <button onClick={() => fnDelete(_id)} className='btn btn-dark'>Delete</button>
                                        </div>

                                    </div>
                                </div>
                            })
                        }
                    </>

                    :
                    <h5 className='text-center'>No items found</h5>
            }
        </div>
    )
}
