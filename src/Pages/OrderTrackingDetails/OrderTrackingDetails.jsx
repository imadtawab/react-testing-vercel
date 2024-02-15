import './OrderTrackingDetails.scss'
import OrderDetails, { OrderDetailsHandle } from '../OrderDetails/OrderDetails'
import Btn from '../../Components/Btn/Btn'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderTrackingDetails } from '../../store/orderSlice'
import { NavLink } from 'react-router-dom'
import ShadowLoading from '../../Components/ShadowLoading/ShadowLoading'
import Alert from '../../Components/Alert/Alert'
import Loading from '../../Components/Loading/Loading'
import EmptyErrorSection from "../../Components/EmptyErrorSection/EmptyErrorSection"
import FlexSections from "../../Components/FlexSections/FlexSections"

export default function OrderTrackingDetails() {
  const [nextItem , setNextItem] = useState(null)
  const [currentItem , setCurrentItem] = useState(null)
  const [previousItem , setPreviousItem] = useState(null)
  const [currentIndex , setCurrentIndex] = useState(null)
  const [numberOfItems , setNumberOfItems] = useState(null)

  const dispatch = useDispatch()
  const {getOrderTrackingDetails_Status} = useSelector(s => s.orders)
  const nextHandle = () => {
    dispatch(getOrderTrackingDetails(nextItem))
  }
  const previousHandle = () => {
    dispatch(getOrderTrackingDetails(previousItem))
  }
  useEffect(() => {
    dispatch(getOrderTrackingDetails(currentItem))
  } , [])
  useEffect(() => {
    setNextItem(getOrderTrackingDetails_Status.success?.nextItem || null)
    setCurrentItem(getOrderTrackingDetails_Status.success?.currentItem || null)
    setPreviousItem(getOrderTrackingDetails_Status.success?.previousItem || null)
    setCurrentIndex(getOrderTrackingDetails_Status.success?.currentIndex || null)
    setNumberOfItems(getOrderTrackingDetails_Status.success?.numberOfItems || null)
  } , [getOrderTrackingDetails_Status])
  // useEffect(() => {
  //   dispatch({type: "orders/states" , payload: ["getOrderTrackingDetails_Status"]}) 
  // }, [])
  return (
    <div className='OrderTrackingDetails'>
      {getOrderTrackingDetails_Status.error && <Alert type="danger">{getOrderTrackingDetails_Status.error}</Alert>}
      {getOrderTrackingDetails_Status.success && <Alert type="success">yuuuuuuuuuuuuuuup</Alert>}
        <div className="order-details-section">
        <Loading status={getOrderTrackingDetails_Status}>
            {getOrderTrackingDetails_Status.success && (getOrderTrackingDetails_Status.success?.currentItem ? <OrderDetailsHandle order={getOrderTrackingDetails_Status.success?.currentItem}/> : <div className='empty-order'><EmptyErrorSection/></div>)}
        </Loading>
            {/* {getOrderTrackingDetails_Status.isLoading ? <ShadowLoading/> : (
              <OrderDetailsHandle order={currentItem}/>
              // <div>{previousItem} || {currentItem} || {nextItem}</div>
            )} */}
            {/* <OrderDetails itemId={currentItem}/> */}
        </div>
        <div className="tracking-controllers">
            <Btn disabled={getOrderTrackingDetails_Status.isLoading || !previousItem} onClick={previousHandle} element="button" btnStyle="bg" color="success"><BiChevronLeft/>Previous</Btn>
            <FlexSections>
              <NavLink to="/admin/orders-tracking"><Btn element="button" btnStyle="bg" color="danger">Close</Btn></NavLink>
              {numberOfItems && <div>Results: {currentIndex} / {numberOfItems}</div>}
            </FlexSections>
            <Btn disabled={getOrderTrackingDetails_Status.isLoading || !nextItem} onClick={nextHandle} element="button" btnStyle="bg" color="success">next<BiChevronRight/></Btn>
        </div>
    </div>
  )
}
