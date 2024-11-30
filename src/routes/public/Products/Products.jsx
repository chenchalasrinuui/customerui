import React, { useEffect } from 'react'
import { GET_PRODUCTS } from '../../../graphql/queries/getProducts'
import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import styles from './Products.module.css'
import { Animations } from '../../../components/shared/Animations/Animations'
import { useNavigate } from 'react-router-dom'
export const Products = () => {

    const { loading, data, error, refetch } = useQuery(GET_PRODUCTS)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch({
            type: "LOADER",
            payload: loading
        })
    }, [loading])


    return (
        <div className={styles.products}>
            {
                data?.getProducts?.map(({ _id, name, cost, file }) => {
                    return <Animations animClass="pulse">
                        <div className={styles.product} onClick={() => navigate(`/product-info/${_id}`)}>
                            <div><img src={`${process.env.REACT_APP_VENDOR_SEVER}${file}?time=${Date.now()}`} width={100} height={100} lazy="loading" /></div>
                            <div>{name}</div>
                            <div>{cost}</div>
                        </div>
                    </Animations>
                })
            }
        </div>
    )
}
