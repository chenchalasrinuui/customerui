import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Ajax from '../../../services/ajax'
import { useParams, useNavigate } from 'react-router-dom'
import { AppCookies } from '../../../services/cookies'
export const ProductInfo = () => {

    const [prdouctDetails, setProductDetails] = useState()
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

    useEffect(() => {
        fnGetProductDetils();
    }, [])

    const checkAuth = () => {
        const isLoggedIn = AppCookies.isUserLoggedIn();
        if (isLoggedIn) {

        } else {
            navigate('/login')
        }
    }
    const fnAddToCart = () => {
        checkAuth()
    }

    const fnBuyNow = () => {
        checkAuth()

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
