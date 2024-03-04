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
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs'

export default function OrderTrackingDetails() {
  const [nextItem , setNextItem] = useState(null)
  const [currentItem , setCurrentItem] = useState(null)
  const [previousItem , setPreviousItem] = useState(null)
  const [currentIndex , setCurrentIndex] = useState(null)
  const [numberOfItems , setNumberOfItems] = useState(null)

  const dispatch = useDispatch()
  const {getOrderTrackingDetails_Status} = useSelector(s => s.orders)

  const [fullScreen , setFullScreen] = useState(false)
  const [fullScreenForAfterPrint , setFullScreenForAfterPrint] = useState(false)

  const nextHandle = () => {
    dispatch(getOrderTrackingDetails(nextItem))
  }
  const previousHandle = () => {
    dispatch(getOrderTrackingDetails(previousItem))
  }
  useEffect(() => {
    dispatch(getOrderTrackingDetails(currentItem))
    
    document.getElementById("OrderTrackingDetails").onfullscreenchange = () => {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        console.log("Fullscreen mode is active.");
        setFullScreen(true)
    } else {
        console.log("Fullscreen mode is not active.");
        setFullScreen(false)
    }
    }
    // window.onbeforeprint = () => {
    //   console.log(fullScreen , "tttttttttt");
    //  }
  //  window.onafterprint = () => {
  //   // fullScreenHandle(true)
  // }
} , [])
useEffect(() => {
    if (fullScreenForAfterPrint) {
      fullScreenHandle(true)
      setFullScreenForAfterPrint(false)
    }
  }, [fullScreenForAfterPrint])
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

//   useEffect(() => {
//       if (fullScreen) {
//       // Vérifier la prise en charge du mode plein écran
// if (document.fullscreenEnabled) {
//   // Récupérer l'élément sur lequel vous souhaitez activer le mode plein écran
//   var element = document.getElementById('OrderTrackingDetails');

//   // Demander le mode plein écran
//   if (element.requestFullscreen) {
//       element.requestFullscreen();
//   } else if (element.mozRequestFullScreen) { // Pour Firefox
//       element.mozRequestFullScreen();
//   } else if (element.webkitRequestFullscreen) { // Pour Chrome, Safari et Opera
//       element.webkitRequestFullscreen();
//   } else if (element.msRequestFullscreen) { // Pour Internet Explorer
//       element.msRequestFullscreen();
//   }
// } else {
//   console.log("Le mode plein écran n'est pas pris en charge par le navigateur.");
// }
//       }else{
//           // Quitter le mode plein écran
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) { // Pour Chrome, Safari et Opera
//       document.webkitExitFullscreen();
//   } else if (document.mozCancelFullScreen) { // Pour Firefox
//       document.mozCancelFullScreen();
//   } else if (document.msExitFullscreen) { // Pour Internet Explorer
//       document.msExitFullscreen();
//   }
//       }

//   }, [fullScreen])
const fullScreenHandle = (active) => {
        if (active) {
      // Vérifier la prise en charge du mode plein écran
if (document.fullscreenEnabled) {
  // Récupérer l'élément sur lequel vous souhaitez activer le mode plein écran
  var element = document.getElementById('OrderTrackingDetails');

  // Demander le mode plein écran
  if (element.requestFullscreen) {
      element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Pour Firefox
      element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Pour Chrome, Safari et Opera
      element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // Pour Internet Explorer
      element.msRequestFullscreen();
  }
} else {
  console.log("Le mode plein écran n'est pas pris en charge par le navigateur.");
}
      }else{
          // Quitter le mode plein écran
    if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { // Pour Chrome, Safari et Opera
      document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) { // Pour Firefox
      document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) { // Pour Internet Explorer
      document.msExitFullscreen();
  }
      }

}
  return (
    <div id='OrderTrackingDetails' className={`OrderTrackingDetails${fullScreen ? " full-screen" : ""}`}>
      {getOrderTrackingDetails_Status.error && <Alert type="danger">{getOrderTrackingDetails_Status.error}</Alert>}
        <div className="order-details-section">
        <Loading status={getOrderTrackingDetails_Status}>
            {getOrderTrackingDetails_Status.success && (getOrderTrackingDetails_Status.success?.currentItem ? <OrderDetailsHandle setFullScreenForAfterPrint={setFullScreenForAfterPrint} order={getOrderTrackingDetails_Status.success?.currentItem}/> : <div className='empty-order'><EmptyErrorSection/></div>)}
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
              <div className="full-screen-btn">
                {!fullScreen ? <BsArrowsFullscreen onClick={() => fullScreenHandle(true)} /> : <BsFullscreenExit onClick={() => fullScreenHandle(false)}/>}
              </div>
              <NavLink to="/admin/orders-tracking"><Btn element="button" btnStyle="bg" color="danger">Close</Btn></NavLink>
              {numberOfItems && <div>Results: {currentIndex} / {numberOfItems}</div>}
            </FlexSections>
            <Btn disabled={getOrderTrackingDetails_Status.isLoading || !nextItem} onClick={nextHandle} element="button" btnStyle="bg" color="success">next<BiChevronRight/></Btn>
        </div>
    </div>
  )
}
