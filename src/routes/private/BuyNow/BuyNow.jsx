import React, { useEffect, useState, useTransition } from 'react'
import Ajax from '../../../services/ajax'
import { useDispatch } from 'react-redux'
import { AppCookies } from '../../../services/cookies'
import { Quantity } from '../../../components/shared/Quantity'
import PaymentButton from '../../../components/shared/PaymentButton'

export const BuyNow = () => {

    const [addressList, setAddressList] = useState([])
    const [selAddress, setSelAddress] = useState({})
    const [products, setProducts] = useState([])
    const [chekoutProductIds, setCheckoutProductIds] = useState([])
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        fnGetAddress();
        let _products = JSON.parse(AppCookies.getCookie('checkoutProducts') || [])
        _products = _products.map((obj) => {
            obj.quan = 1;
            obj.checkOutItemCost = obj.cost
            return obj
        })
        setProducts(_products);
        setCheckoutProductIds(_products.map((obj) => obj._id))
    }, []);

    useEffect(() => {
        setTotal(products?.reduce?.((init, obj) => init + (obj.cost * obj.quan), 0))
    }, [products])

    const fnGetAddress = async () => {
        try {
            dispatch({ type: 'LOADER', payload: true })
            const res = await Ajax.get(`address/get?uid=${AppCookies.getCookie('uid')}`)
            setAddressList(res?.data);
            const { name, houseNo, landMark, pin } = res?.data?.[0]
            setSelAddress({ ind: 0, address: `${name}, ${houseNo}, ${landMark},${pin}` })
        } catch (ex) {
            setAddressList([])
            console.error("Address", ex)
        } finally {
            dispatch({ type: 'LOADER', payload: false })
        }
    }

    const handleQuantity = (name, opt) => {
        let _products = [...products]
        _products = _products.map((obj) => {
            if (obj.name === name) {
                let quantity = opt === 'I' ? obj.quan + 1 : obj.quan - 1
                obj.quan = quantity;
                obj.checkOutItemCost = obj.cost * quantity;
            }
            return obj;
        })
        setProducts(_products);
    }

    const handleAddressChange = (address, ind) => {
        setSelAddress({ address, ind })
    }

    return (
        <div className='container-fluid mb-5'>
            <h4 className='my-3 text-center'>Checkout</h4>
            <div className='row container'>
                <div className='col-sm-4'>
                    {
                        addressList?.map(({ name, houseNo, landMark, pin }, ind) => {
                            return <div className='mb-3 border px-2 py-2 rounded'>
                                <input checked={ind === selAddress.ind} onChange={() => handleAddressChange(`${name}, ${houseNo}, ${landMark},${pin}`, ind)} type="radio" name="add"></input>
                                <div>{name}, {houseNo}</div>
                                <div>{landMark}</div>
                                <div>{pin}</div>
                            </div>
                        })
                    }
                </div>
                <div className='col-sm-4'>
                    <table border="2px" className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map?.(({ name, checkOutItemCost, quan }) => {
                                    return <tr>
                                        <td>{name}</td>
                                        <td><Quantity quan={quan} handleQuantity={handleQuantity} name={name} /></td>
                                        <td>{checkOutItemCost}</td>
                                    </tr>
                                })
                            }
                            <tr>
                                <td colSpan={2}><div className='text-end'>
                                    Total
                                </div></td>
                                <td>{total}</td>
                            </tr>
                        </tbody>

                    </table>

                    <PaymentButton productDetails={chekoutProductIds} address={selAddress?.address} amount={total} email={AppCookies.getCookie("uid")} phone={AppCookies.getCookie("phone")} />

                </div>
            </div>

        </div>
    )
}
