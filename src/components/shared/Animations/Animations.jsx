import React, { useEffect, useRef, useState } from 'react'

export const Animations = ({ children, animClass }) => {

    const [isInTheViewPort, setIsInTheViewPort] = useState(false)
    const targetEleRef = useRef();
    useEffect(() => {
        const objserverObj = new IntersectionObserver((entries) => {
            const { isIntersecting } = entries[0]
            setIsInTheViewPort(isIntersecting)
        }, {
            threshold: 0.5
        })
        objserverObj.observe(targetEleRef.current)
    }, [])

    return (
        <div className={isInTheViewPort && animClass} ref={targetEleRef}>
            {children}
        </div>
    )
}
