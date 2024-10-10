import './OrderTrackingDetails.scss'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { OrderDetailsHandle } from '../OrderDetails/OrderDetails'
import Btnx from '../../../Components/Btnx/Btnx'
import FlexSections from '../../../Components/FlexSections/FlexSections'
import { getOrderTrackingDetails } from '../../../../Store/Admin/orderSlice'
import { statusArray } from '../../../Utils/orderUtils'
import { Modal } from '../../../Utils/modalUtils'

export default function OrderTrackingDetails() {
  const [data, setData] = useState(null)
  const [nextItem , setNextItem] = useState(null)
  const [currentItem , setCurrentItem] = useState(null)
  const [previousItem , setPreviousItem] = useState(null)
  const [currentIndex , setCurrentIndex] = useState(null)
  const [numberOfItems , setNumberOfItems] = useState(null)
  
  const [disabledBtn , setDisabledBtn] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [fullScreen , setFullScreen] = useState(false)
  const [fullScreenForAfterPrint , setFullScreenForAfterPrint] = useState(false)


  const goToAnotherStatus = (action) => {
    let array = ["all", "today", ...statusArray]
    let status = array[array.indexOf(data.status) + (action === "next" ? +1 : -1)]
    let query = status
    if(status === "today") query = "time="+status
    if(status === "all") query = ""
    if(status !== "all" && status !== "today") query = "status="+status
    if(!status) return setDisabledBtn(true)
    Modal(true, () => {
      navigate(`/admin/orders-tracking/details?${query}`)
      dispatch(getOrderTrackingDetails()).unwrap()
      .then(docs => setData(docs.data))
      .catch(err => toast.error(err.message))
      Modal(false)
    }, {
      title: `${status} Orders`,
      message: `You want to go to ${action} status ?`,
      type: "info",
    })
  }
  const nextHandle = () => {
    if(!nextItem) return goToAnotherStatus("next")
    dispatch(getOrderTrackingDetails(nextItem)).unwrap()
    .then(docs => setData(docs.data))
    .catch(err => toast.error(err.message))
  }
  const previousHandle = () => {
    if(!previousItem) return goToAnotherStatus("previous")
    dispatch(getOrderTrackingDetails(previousItem)).unwrap()
    .then(docs => setData(docs.data))
    .catch(err => toast.error(err.message))
  }
  useEffect(() => {
    dispatch(getOrderTrackingDetails(currentItem)).unwrap()
    .then(docs => setData(docs.data))
    .catch(err => toast.error(err.message))
    
    document.getElementById("OrderTrackingDetails").onfullscreenchange = () => {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        console.log("Fullscreen mode is active.");
        setFullScreen(true)
    } else {
        console.log("Fullscreen mode is not active.");
        setFullScreen(false)
    }
    }
} , [])
useEffect(() => {
    if (fullScreenForAfterPrint) {
      fullScreenHandle(true)
      setFullScreenForAfterPrint(false)
    }
  }, [fullScreenForAfterPrint])
  useEffect(() => {
    setNextItem(data?.nextItem || null)
    setCurrentItem(data?.currentItem || null)
    setPreviousItem(data?.previousItem || null)
    setCurrentIndex(data?.currentIndex || null)
    setNumberOfItems(data?.numberOfItems || null)
  } , [data])

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
  toast.info("Le mode plein écran n'est pas pris en charge par le navigateur.");
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
        <div className="order-details-section">
          {/* {currentItem &&  */}
            <OrderDetailsHandle key="tracking-order" setFullScreenForAfterPrint={setFullScreenForAfterPrint} order={currentItem} setOrder={setCurrentItem}/>
          {/* } */}
        </div>
        <div className="tracking-controllers">
            <Btnx onClick={previousHandle} element="button" btnStyle="bg" color="success"><BiChevronLeft/>Previous</Btnx>
            <FlexSections>
              <div className="full-screen-btn">
                {!fullScreen ? <BsArrowsFullscreen onClick={() => fullScreenHandle(true)} /> : <BsFullscreenExit onClick={() => fullScreenHandle(false)}/>}
              </div>
              <NavLink to="/admin/orders-tracking"><Btnx element="button" btnStyle="bg" color="danger">Close</Btnx></NavLink>
              {numberOfItems && <div>Results: {currentIndex} / {numberOfItems}</div>}
            </FlexSections>
            <Btnx onClick={nextHandle} element="button" btnStyle="bg" color="success">next<BiChevronRight/></Btnx>
        </div>
    </div>
  )
}
