import { BsBagCheckFill, BsBagXFill, BsCalendar2Day, BsClockHistory, BsFillBasket2Fill, BsFillPauseFill, BsHourglassSplit } from 'react-icons/bs'
import './OrdersTracking.scss'
import { MdFileDownloadDone, MdWifiProtectedSetup } from 'react-icons/md'
import { FaShippingFast } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import GridSections from '../../../Components/GridSections/GridSections'
import PageStructure from '../../../Components/PageStructure/PageStructure'
import BoxSection from '../../../Components/BoxSection/BoxSection'
import { toast } from 'react-toastify'
import { getOrdersTrackingStatus } from '../../../../Store/Admin/orderSlice'
import { statusArray } from '../../../Utils/orderUtils'

export default function OrdersTracking() {
  const dispatch = useDispatch()
  const {isLoadingPage} = useSelector(s => s.order)
  const [valuesForStatus , setValuesForStatus] = useState({
    all: "...",
    today: "...",
    pending: "...",
    confirmed: "...",
    shipped: "...",
    delivered: "...",
    cancelled: "...",
    on_hold: "...",
    delayed: "...",
    returned: "...",
  })
  useEffect(() => {
    dispatch(getOrdersTrackingStatus()).unwrap()
    .then(docs => setValuesForStatus(docs.data))
    .catch(err => toast.error(err.message))
  }, [])
  
  
  let statusIcons = [
    <BsHourglassSplit/>,
    <MdFileDownloadDone/>,
    <FaShippingFast/>,
    <BsBagCheckFill/>,
    <BsBagXFill/>,
    <BsFillPauseFill/>,
    <BsClockHistory/>,
    <MdWifiProtectedSetup/>,
  ]
  return (
    <PageStructure loading={isLoadingPage} title={"Orders Tracking"}>
        <div className='OrdersTracking'>
        <GridSections>
          <NavLink to={"/admin/orders-tracking/details"}><BoxSection icon={<BsFillBasket2Fill/>}     title="All Orders"    value={valuesForStatus["all"]} /></NavLink>
          <NavLink to={"/admin/orders-tracking/details?time=today"}><BoxSection icon={<BsCalendar2Day/>}        title="Today orders"  value={valuesForStatus["today"]} /></NavLink>
          {statusArray.map((status,i) => (
            <NavLink to={`/admin/orders-tracking/details?status=${status}`}><BoxSection icon={statusIcons[i]}      title={status}       value={valuesForStatus[status]}    status={status}/></NavLink>
          ))}
        </GridSections>
        </div>
    </PageStructure>
  )
}