import { NavLink } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { BiEdit ,BiPlusCircle, BiFilterAlt} from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageStructure from '../../../Components/PageStructure/PageStructure'
import Btnx from '../../../Components/Btnx/Btnx'
import SectionStructure from '../../../Components/SectionStructure/SectionStructure'
import CheckBox from '../../../Components/CheckBox/CheckBox'
import {toast} from 'react-toastify'
import { changeVisibility, deleteCoupon, deleteManyCoupons, getCoupons, updateManyCouponsVisibility } from '../../../../Store/Admin/couponSlice'
import {Modal} from '../../../Utils/modalUtils'
import PaginationTable from '../../../Components/PaginationTable/PaginationTable'
import moment from 'moment'
import { itemsSelectedHandler, selectAllActivingHandler, selectAllItemsHandler } from '../../../Utils/selectItemsUtils'
import { filterQuerysHandler } from '../../../../MainUtils/filtersUtils'
import FlexSections from '../../../Components/FlexSections/FlexSections'
import InputBox, { SelectBox } from '../../../../MainComponent/InputBox/InputBox'
import Switcher from '../../../Components/Switcher/Switcher'
import Status from '../../../Components/Status/Status'

export default function Coupons() {
  const couponTypes = ["percentage","fixed"]
  const {isLoadingPage} = useSelector(s => s.coupon)
  const [coupons, setCoupons] = useState([])
  const [pagination, setPagination] = useState(null)
  const [itemsSelected, setItemsSelected] = useState([])
  const dispatch = useDispatch()

  const dispatchFunc = () => {
    dispatch(getCoupons()).unwrap()
      .then(docs => {
        let {data, pagination, query} = docs
        setCoupons(data)
        setPagination(pagination)
        setActiveFilter(false)
        let {search, type, publish, from, to} = query
        if(search) setSearchFilter(search)
        if(type) setTypeFilter(type)
        if(publish) setPublishFilter(publish)
        if(from || to) setDateFilter({from, to})
          if(search || type || publish || from || to) {
            setNumberOfFilters(pagination.length)
          }else{
            setNumberOfFilters(null)
          }
    })
    .catch(err => toast.error(err.message))
  }
  const ChangeVisibilityHandle = (id, publish) => {
    let dispatchChangeVisibility = () => dispatch(changeVisibility({id, publish})).unwrap()
    .then(docs => {
      toast.success(docs.message)
      setCoupons(prev => prev.map(a => a._id === id ? {...a, publish: !a.publish} : a))
      Modal(false, null)
    })
    .catch(err => toast.error(err.message))
    Modal(true, dispatchChangeVisibility, {
      title: "Change Visibility",
      message: "You want to change visibility ?",
      type: "info"
    })
  }
  const deleteCouponHandle = (id) => {
    let dispatchDeleteCoupon = () => dispatch(deleteCoupon({id})).unwrap()
    .then(docs => {
      toast.success(docs.message)
      if(coupons.length <= 1 && pagination.page > 1) {
        window.history.replaceState(null, null, "?page="+(pagination.page - 1)+"&step="+pagination.step);
        dispatchFunc()
        Modal(false, null)
        return
      }
      setCoupons(prev => prev.filter(a => a._id !== id))
      Modal(false, null)
    })
    .catch(err => toast.error(err.message))

    Modal(true, dispatchDeleteCoupon, {
      title: "Delete Coupon",
      message: "You want to delete this coupon ?",
      type: "info"
    })
  }
  useEffect(() => {
    selectAllActivingHandler(itemsSelected, coupons)
  }, [itemsSelected])

  const deleteManyCouponsHandle = () => {
    if(!itemsSelected.length) return
    let dispatchDeleteManyCoupons = () => dispatch(deleteManyCoupons(itemsSelected)).unwrap()
    .then(docs => {
      toast.success(docs.message)
      if((coupons.length - itemsSelected.length) <= 1 && pagination.page > 1) {
        window.history.replaceState(null, null, "?page="+(pagination.page - 1)+"&step="+pagination.step);
        dispatchFunc()
        Modal(false, null)
        setItemsSelected([])
        return
      }
      setCoupons(prev => prev.filter(a => {
        return itemsSelected.indexOf(a._id) === -1
      }))
      Modal(false, null)
    })
    .catch(err => toast.error(err.message))
    Modal(true, dispatchDeleteManyCoupons, {
      title: "Delete Many Coupons",
      message: "You want to delete the coupons selected ?",
      type: "info"
    })
  }
  const updateManyCouponsVisibilityHandle = (e) => {
    if(!itemsSelected.length) return
    let dispatchUpdateManyCoupons = () => dispatch(updateManyCouponsVisibility({itemsSelected , publish: Boolean(+e.target.value)})).unwrap()
    .then(docs => {
      toast.success(docs.message)
      setCoupons(prev => prev.map(a => itemsSelected.indexOf(a._id) !== -1 ? {...a, publish: Boolean(+e.target.value)} : a))
      // selectOne Checkbox Handle
      let selectOneCheckboxs = document.querySelectorAll("[name=selectOne]")
      selectOneCheckboxs.forEach(i => i.checked = false);
      setItemsSelected([])
      Modal(false, null)
    })
    .catch(err => toast.error(err.message))
    Modal(true, dispatchUpdateManyCoupons, {
      title: "Update Many Coupons Visibility",
      message: "You want to update visibility for the coupons selected ?",
      type: "info"
    })
  }
  useEffect(() => {
    dispatchFunc()
  }, [])
    // ####################################################################################
      //  filtering

      const [numberOfFilters, setNumberOfFilters] = useState()
      const [activeFilter , setActiveFilter] = useState(false)
      const [dateFilter , setDateFilter] = useState({
        from: null,
        to: null
    })
    const [typeFilter , setTypeFilter] = useState(null)
    const [publishFilter , setPublishFilter] = useState(null)
    const [searchFilter , setSearchFilter] = useState(null)

    const filterHandler = (e) => {
      e.preventDefault(); 
      let filterObject = {}
        filterObject.search = searchFilter
        filterObject.type = typeFilter
        filterObject.publish = publishFilter
        filterObject.from = dateFilter.from
        filterObject.to = dateFilter.to   
      filterQuerysHandler(filterObject, dispatchFunc, pagination.step)

  }
  const resetForm = (e) => {
    setDateFilter({from: null,to: null})
    setTypeFilter(null)
    setPublishFilter (null)
    setSearchFilter(null)
    let filterObject = {}
    filterObject.search = null
    filterObject.type = null
    filterObject.publish = null
    filterObject.from = null
    filterObject.to = null 
    filterQuerysHandler(filterObject, dispatchFunc, pagination.step)
  }
  const dateExpirationHandler = (date) => {
    let d = new Date(date).setHours(23, 59, 59, 999)
    let now = new Date().setHours(23, 59, 59, 999)
    return d >= now
  }
  return (
    <PageStructure title={"Coupons"} 
    button={{href:"new",type:"a",name:"New Coupon", icon: <BiPlusCircle/> }}
    >
              <div className="actions-head">
        <Btnx disabled={!itemsSelected.length} style={{position:"relative"}} element="button" btnStyle="bg" color="primary">
        <div className="icon"><BiEdit /></div> Update Many
                <select onFocus={(e) => e.target.value = ""} onChange={updateManyCouponsVisibilityHandle} disabled={!itemsSelected.length} name="selectManyBtn" id="selectManyBtn">
                    <option selected disabled value="">Status :</option>
                    <option value="1">Publish</option>
                    <option value="0">Private</option>
                </select>
        </Btnx>
        <Btnx disabled={!itemsSelected.length} onClick={deleteManyCouponsHandle} element="button" btnStyle="bg" color="danger"><div className="icon"><BsTrash/></div> Delete Many</Btnx>
        <Btnx onClick={()=>setActiveFilter(e => !e)} element="button" btnStyle="bg" color="success"><div className="icon"><BiFilterAlt/></div>{numberOfFilters && `(${numberOfFilters})`}</Btnx>
        </div>
        {activeFilter && (
        <SectionStructure>
            <form onSubmit={filterHandler} method='GET' className="Filter">
            <FlexSections direction="column">
              <FlexSections wrap={true}>
                <InputBox value={searchFilter} onChange={(e) => {
                      setSearchFilter(e.target.value)
                      }} placeholder="Search ..." label="Search" pd="none" flex="1" type="search" 
                />
              <SelectBox flex="1" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} pd="none" name="type" id="typeSelect" label="Type">
                      <option value="">all</option>
                      {couponTypes.map((opt) => (
                      <option selected={typeFilter} value={opt}>
                        {opt}
                      </option>
                    ))}
              </SelectBox>
              <SelectBox flex="1" value={publishFilter} onChange={(e) => setPublishFilter(e.target.value)} pd="none" name="publish" id="publishSelect" label="Publish">
                      <option value="">all</option>
                      <option value="1">Publish</option>
                      <option value="0">Private</option>
                </SelectBox>
              </FlexSections>
              <FlexSections wrap={true}>
                  <InputBox flex="1" value={dateFilter.from} onChange={(e) => setDateFilter(prev => {return {...prev , from: e.target.value}})} pd="none" label="from" type="date" name="from"/>
                  <InputBox flex="1" value={dateFilter.to} onChange={(e) => setDateFilter(prev => {return {...prev , to: e.target.value}})} pd="none" label="to" type="date" name="to"/>

              </FlexSections>
              <FlexSections style={{marginTop: "20px"}} justify="end" wrap={true}>
                <Btnx onClick={resetForm} disabled={isLoadingPage} flex={.33} width="full" btnStyle="outline" color="danger" element="button" type="reset">Reset</Btnx>
              <Btnx loading={isLoadingPage} flex={.33} type="submit" width="full" btnStyle= "bg" color= "success" element="button">Filter
                </Btnx>
              </FlexSections>
            </FlexSections>
            </form>
        </SectionStructure>
        )}
        <div className='Coupons'>
        <SectionStructure loading={isLoadingPage} length={coupons.length} pd="none">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <td>
                  <CheckBox onChange={(e) => selectAllItemsHandler(e, setItemsSelected, coupons)} name="selectAll" id="selectAll"/>
                </td>
                <td>code</td>
                <td>discount</td>
                <td>expiration date</td>
                <td>status</td>
                <td>publish</td>
                <td>created at</td>
                <td>actions</td>
              </tr>
            </thead>
            <tbody>
              {coupons.map((att, ind) => (
                  <tr key={att._id}>
                    <td>
                      <CheckBox
                              onChange={(e) => itemsSelectedHandler(e, setItemsSelected)}
                              name={"selectOne"}
                              id={`${att._id}`}
                            />
                    </td>
                    <td>
                      <div>
                        <h4>{att.code}</h4>
                      </div>
                    </td>
                    <td>
                      <div className="price">-{att.discount}{att.type === "fixed" ? <span>MAD</span> : <span>%</span>}</div>
                    </td>
                    <td>{moment(att.expirationDate).format("YYYY-MM-DD")}</td>
                    <td>
                      {console.log(att.expirationDate)}
                      <Status type="coupon" active={dateExpirationHandler(att.expirationDate)}/>
                    </td>
                    <td>
                      <Switcher onClick={() => ChangeVisibilityHandle(att._id, att.publish)} key={"switcher"+att._id} active={att.publish}/>
                    </td>
                    <td title={"Last updated: "+moment(att.updatedAt).format("YYYY-MM-DD HH:mm")}>{moment(att.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                    <td>
                      <div className="actions">
                        <NavLink to={`edit/${att._id}`} 
                        className="edit">
                          <BiEdit />
                        </NavLink>
                        <div className="delete">
                          <BsTrash onClick={() => deleteCouponHandle(att._id)}/>
                        </div>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          <PaginationTable dispatchFunc={dispatchFunc} pagination={pagination}/>
        </div>
      </SectionStructure>
        </div>
    </PageStructure>
  )
}


