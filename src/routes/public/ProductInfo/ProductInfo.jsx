import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Ajax from '../../../services/ajax'
import { useParams, useNavigate } from 'react-router-dom'
import { AppCookies } from '../../../services/cookies'
export const ProductInfo = () => {

    const [prdouctDetails, setProductDetails] = useState()
    const [cartitems, setCartItems] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const fnGetProductDetils = async () => {
        try {
            dispatch({
                type: 'LOADER',
                payload: true
            })
            const res = await Ajax.get(`products/get-product-by-id?id=${id}`)
            setProductDetails(res?.data || {})
        } catch (ex) {
            setProductDetails({})
        } finally {
            dispatch({
                type: 'LOADER',
                payload: false
            })
        }
    }

    const getCartItems = async () => {
        try {
            dispatch({
                type: 'LOADER',
                payload: true
            })
            const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie('uid')}`)
            setCartItems(res?.data?.[0]?.products || [])
            dispatch({
                type: 'CART',
                payload: res?.data?.[0]?.products?.length || 0
            })
        } catch (ex) {
            setProductDetails({})
        } finally {
            dispatch({
                type: 'LOADER',
                payload: false
            })
        }
    }

    useEffect(() => {
        fnGetProductDetils();
        getCartItems()
    }, [])

    const checkAuth = () => {
        return AppCookies.isUserLoggedIn();
    }
    const fnCheckItemInTheCart = () => {
        return cartitems.some(obj => obj._id === prdouctDetails._id)
    }
    const fnAddToCart = async () => {
        try {
            if (!checkAuth()) {
                navigate('/login')
                return;
            }
            if (fnCheckItemInTheCart()) {
                dispatch({
                    type: 'TOASTER', payload: {
                        isShowToaster: true,
                        toasterMsg: 'Item already added to the cart',
                        color: 'red'
                    }
                })
                return;
            }
            dispatch({ type: 'LOADER', payload: true })
            const res = await Ajax.post('users/add-to-cart', { uid: AppCookies.getCookie('uid'), product: prdouctDetails })
            console.log(res);
            const { acknowledged, upsertedId, modifiedCount } = res?.data
            let isSuccess = false;
            if (acknowledged && (upsertedId || modifiedCount)) {
                navigate('/cart')
                dispatch({
                    type: 'CART',
                    payload: cartitems?.length + 1
                })
                isSuccess = true;
            }
            dispatch({
                type: 'TOASTER', payload: {
                    isShowToaster: true,
                    toasterMsg: isSuccess ? 'Added to the cart' : 'Not added',
                    color: isSuccess ? true : false
                }
            })
        } catch (ex) {
            console.error(ex);
        } finally {
            dispatch({ type: 'LOADER', payload: false })
        }
    }

    const fnBuyNow = () => {
        if (!checkAuth()) {
            navigate('/login');
            return;
        }
        navigate(`/buy-now?id=${prdouctDetails._id}`)
    }
    return (
        <div className='container-fluid mb-5'>
            {prdouctDetails && <>
                <h3 className='text-center my-3'>{prdouctDetails?.name}</h3>
                <div className='row'>
                    <div className='col-sm-6'>
                        <img src={`${process.env.REACT_APP_VENDOR_SEVER}${prdouctDetails?.file}?time=${Date.now()}`} width='100%' height='100%' loading='lazy' />
                    </div>
                    <div className='col-sm-6'>
                        <h5>{prdouctDetails?.category}</h5>
                        <h5>{prdouctDetails?.cost}</h5>
                        <h5>{prdouctDetails?.description}</h5>
                        <div className='col-12 text-center'>
                            <button onClick={fnAddToCart} className='btn btn-primary me-3'>Add to Cart</button>
                            <button onClick={fnBuyNow} className='btn btn-primary'>Buy Now</button>
                        </div>
                    </div>
                </div>
            </>
            }

        </div>
    )
}
