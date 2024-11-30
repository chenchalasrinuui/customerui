import React, { useRef } from "react";
export const Pagination = ({ currPage, setCurrPage, totalPages }) => {
    const inputRef = useRef()
    const fnGo = () => {
        const pageNo = inputRef.current.value;
        if (pageNo < 1 || pageNo > totalPages) {
            alert("Invalid Entry");
            return;
        }
        setCurrPage(Number(pageNo))
    }
    const fnNext = () => {
        setCurrPage(currPage + 1)
    }

    const fnPrev = () => {
        setCurrPage(currPage - 1)
    }
    return <div>
        <span>Go To :<input ref={inputRef} type="number" /><button onClick={fnGo}>Go</button></span><button onClick={fnPrev} disabled={currPage == 1}>Prev</button>{currPage}<button onClick={fnNext} disabled={currPage == totalPages}>Next</button><span>Total Pages:{totalPages}</span>
    </div>
}