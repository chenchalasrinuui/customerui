import React, { useEffect, useState } from 'react';
import Ajax from '../../../services/ajax';
import { useDispatch } from 'react-redux';
import { AppCookies } from '../../../services/cookies';
import { useNavigate } from 'react-router-dom';
const PaymentButton = ({ amount, email, phone, productDetails, address }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script)
        }
    }, []);
    const payNow = () => {
        dispatch({
            type: "MODAL",
            payload: {
                message: `After a successful payment, please do not refresh the page if you're on a web browser, and do not close the app if you're on a mobile device. Wait until you are automatically redirected to the VTSSCHOOL website.`,
                isShowModal: true,
                modalAction: modalActions
            }
        })
    }
    const handlePayment = async () => {

        dispatch({ type: "LOADER", payload: true })
        try {
            const options = {
                key: 'rzp_test_x3tQeMYdYJLqWe', // Replace with your Razorpay Key ID
                amount: amount * 100, // Amount is in the smallest currency unit
                currency: 'INR',
                name: 'Naresh IT',
                description: `My order  price is ${amount}`,
                handler: async function (response) {
                    console.log(1111, response);
                    dispatch({
                        type: 'TOASTER', payload: {
                            isShowToaster: true,
                            toasterMsg: 'Payment Successful , please wait',
                            color: 'green'
                        }
                    })

                    dispatch({ type: "LOADER", payload: true })
                    try {
                        const currDate = new Date();
                        const data = {
                            uid: AppCookies.getCookie("uid"),
                            transactionId: 'pay_PU96XsMaICJOVk', // response?.razorpay_payment_id,
                            orderPrice: amount,
                            productDetails: productDetails,
                            phone: phone,
                            address: address,
                            orderDate: `${currDate.getDate()}-${currDate.getMonth() + 1}-${currDate.getFullYear()}`
                        };
                        const res = await Ajax.post("orders/save", { data })
                        const { acknowledged, insertedId } = res?.data
                        dispatch({
                            type: 'TOASTER', payload: {
                                isShowToaster: true,
                                toasterMsg: (acknowledged && insertedId) ? 'Order placed !!!' : ` Order not placed, your payment id is  !!!`,
                                color: 'green'
                            }
                        })
                        navigate('/orders')

                    } catch (ex) {
                        dispatch({
                            type: 'TOASTER', payload: {
                                isShowToaster: true,
                                toasterMsg: 'Data not saved !!!',
                                color: 'red'
                            }
                        })


                    } finally {
                        dispatch({ type: "LOADER", payload: false })
                    }

                },
                prefill: {
                    email: email,
                    contact: phone
                },
                theme: {
                    color: '#3399cc'
                },
                modal: {
                    ondismiss: () => {
                        // Handle user dismissing the payment window
                        dispatch({
                            type: 'TOASTER', payload: {
                                isShowToaster: true,
                                toasterMsg: 'Payment was cancelled by the user.',
                                color: 'red'
                            }
                        })
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (ex) {
            dispatch({
                type: 'TOASTER', payload: {
                    isShowToaster: true,
                    toasterMsg: 'Payment failed, please try again.',
                    color: 'red'
                }
            })
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }

    };

    const modalActions = () => {
        dispatch({
            type: "MODAL",
            payload: {
                isShowModal: false,
                modalAction: () => { }
            }
        })
        handlePayment();
    }
    return <div>
        <button disabled={!(Number(amount) > 0)} className='btn btn-dark' onClick={payNow}>
            Pay Now
        </button>
    </div>
};

export default PaymentButton;