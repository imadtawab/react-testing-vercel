import React, { useEffect, useState } from 'react'
import "./PaginationTable.scss"
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

export default function PaginationTable({itemsLength , pagination , dispatchFunc}) {
    const dispatch = useDispatch()
    const [paginationItems , setPaginationItems] = useState([])
    const [currentPagination , setCurrentPagination] = useState("")
    const [selectStep , setSelectStep] = useState(5)


let paginationItemHandle = (item) => {
    if (currentPagination === item) {
        return
    }
    console.log(selectStep);
    dispatch(dispatchFunc({count: item, step: selectStep}))
    setCurrentPagination(item)
  }
  let paginationPrevious = () => {
    if(currentPagination > 1){
        paginationItemHandle(+currentPagination - 1)
    }
  }
  let paginationNext = () => {
    if(currentPagination < pagination?.numberOfItems){
        paginationItemHandle(+currentPagination + 1)
    }
  }
//   console.log(pagination, paginationStep);
    const selectStepHandle = (e) => {
        if(e.target.value === "all") {
            dispatch(dispatchFunc({}))
        }else{
            setSelectStep(+e.target.value)
            dispatch(dispatchFunc({count: 1, step: +e.target.value}))
        }
    }
useEffect(() => {
    let paginationItems = []
    let current = +pagination?.currentPagination
    for (let i = 1; i <= (pagination?.numberOfItems || 0); i++) {
        paginationItems.push(i)
    }
    let paginationFiltering = paginationItems.filter(p => {
        if(current === 1) {
            return p <= (current+4)
        }else if(current === 2) {
            return p >= (current-2) && p <= (current+3)
        }else if(current === paginationItems.length) {
            return p >= (current-4)
        }else if(+pagination?.currentPagination === paginationItems.length-1) {
            return p >= (current-3) && p <= (current+2)
        }else{
            return p >= (current-2) && p <= (current+2)
        }
    }) 
    setPaginationItems(paginationFiltering)
    setCurrentPagination(+pagination?.currentPagination)
    setSelectStep(pagination?.step)
    // if((itemsLength === 0)){
    //     paginationPrevious()
    // }
    // console.log(itemsLength ,999999999);
}, [pagination])


  return (
    <div className="PaginationTable">
    <div className="result">
        {/* {selectStep} */}
        <select name='selectStep' value={`${selectStep}`} onChange={(e) => selectStepHandle(e)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="all">All</option>
        </select>
        Résultats {currentPagination} sur {pagination?.numberOfItems}</div>
       {paginationItems.length > 1 && (
    <div className="pagination">
        <div onClick={paginationPrevious} className={`pager previous${+currentPagination === 1 ? " disabled" : ""}`}><BiChevronLeft/></div>
        {paginationItems.map((pager) => (
            <div onClick={() => paginationItemHandle(pager)} className={`pager ${+currentPagination === +pager ? "active" : ""}`}>{pager}</div>
        ))}
        <div onClick={paginationNext} className={`pager next${+currentPagination === pagination?.numberOfItems ? " disabled" : ""}`}><BiChevronRight/></div>
    </div>
       )} 
</div>
  )
}
