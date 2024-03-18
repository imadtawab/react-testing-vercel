import PageStructure from "../../Components/PageStructure/PageStructure";
import SectionStructure from "../../Components/SectionStructure/SectionStructure";
import "./Products.scss";
import { BiEdit, BiFilterAlt, BiLogoZoom, BiPlusCircle, BiSolidZoomIn, BiZoomIn } from "react-icons/bi";
import productImg from "../../assets/profile.jpg";
import { BsCheckLg, BsTrash, BsTrash2, BsTrash3 } from "react-icons/bs";
import CheckBox from "../../Components/CheckBox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../Components/Alert/Alert";
import Loading from "../../Components/Loading/Loading";
import ShadowLoading from "../../Components/ShadowLoading/ShadowLoading";
import { useEffect, useState } from "react";
import {changeProductVisibility, deleteManyStatus_products, deleteProduct, products, updateManyStatus_products} from "../../store/productsSlice";
import CercleLoading from "../../Components/CercleLoading/CercleLoading";
import { NavLink } from "react-router-dom";
import Btn from "../../Components/Btn/Btn";
import EmptyErrorSection from "../../Components/EmptyErrorSection/EmptyErrorSection";
import ModalValidation from '../../Components/ModalValidation/ModalValidation'
import PaginationTable from "../../Components/PaginationTable/PaginationTable";
import FlexSections from "../../Components/FlexSections/FlexSections";
import InputBox, { SelectBox } from "../../Components/InputBox/InputBox";
import { getCategories } from "../../store/categoriesSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { newProductStatus, allProducts, productsStatus ,deleteProductStatus , changeProductVisibilityStatus , updateProductStatus , addVariantsStatus , updateManyStatus_products_Status , deleteManyStatus_products_Status} = useSelector(
    (state) => state.products
  );
  const {getCategoriesStatus} = useSelector(s => s.categories)
  const [categories , setCategories] = useState([])
  const [itemDeletedId, setItemDeletedId] = useState([])
  
  const [itemsSelected , setItemsSelected] = useState([])

  const publishedHandle = (eo ,id, visibility) => {
    // console.log(eo.target.className);
        console.log(eo.target,id,visibility,9);
    dispatch(changeProductVisibility({id,visibility}))
  };
  const deleteProductHandle = (id) => {
    dispatch(deleteProduct(id)).then(docs => {
        console.log(docs.payload);
        setItemDeletedId(itemDeletedId.filter(id => id !== docs.payload))
    })
    setItemDeletedId([...itemDeletedId , id])
  }

  const selectItemHandle = (selectType) => {
    let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
    let selectAllInput = document.getElementById("selectAll")
    if (selectType === "selectAll") {
      console.log(selectAllInput.checked);
      selectInputs.forEach(ipt => {
        ipt.checked = selectAllInput.checked
      })
    }
    let selectInputsChecked = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']:checked")
    // if(selectInputsChecked.length){
    //   setBtnDisabled(true)
    // }else{
    //   setBtnDisabled(false)
    // }
    let result = []
    selectInputsChecked.forEach(i => {
      result.push(i.id)
    })
    console.log(selectInputsChecked);
    setItemsSelected(result)
    console.log(itemsSelected);
  }
  const UpdateManyHandle = (e) => {
    dispatch(updateManyStatus_products({items: itemsSelected, status: e.target.value})).then((docs) => {
      console.log(docs);
      if(docs.type === "updateManyStatus_products/fulfilled"){
        let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
        let selectAllInput = document.getElementById("selectAll")

          selectAllInput.checked = false
          selectInputs.forEach(ipt => {
            ipt.checked = false
          })
          document.getElementById("selectManyBtn").value = ""
          setItemsSelected([])
      }
    })    
  }
  const deleteManyHandle = () => {
    dispatch(deleteManyStatus_products(itemsSelected)).then((docs) => {
      console.log(docs);
      if(docs.type === "deleteManyStatus_products/fulfilled"){
        let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
        let selectAllInput = document.getElementById("selectAll")

          selectAllInput.checked = false
          selectInputs.forEach(ipt => {
            ipt.checked = false
          })
          setItemsSelected([])
      }
    })
  }
  useEffect(() => {
    dispatch(products({count: 1, step: 5})).then((docs) => {
      if(docs.type === "products/fulfilled") {
        setDateFilter({from:docs.payload.filterValues?.from, to:docs.payload.filterValues?.to})
        setStatusFilter(docs.payload.filterValues?.status)
        setVisibilityFilter(docs.payload.filterValues?.visibility)
        setCategoryFilter(docs.payload.filterValues?.category)
        setSearchFilter(docs.payload.filterValues?.search)
      }
  })
  dispatch(getCategories())
  }, [dispatch]);
  useEffect(() => {
    console.log(getCategoriesStatus.success,55555555555555);
    setCategories(getCategoriesStatus.success)
  }, [getCategoriesStatus])
  const showModal = (show , nextFunc,modalInfo) => {
    const action = {
      type : "modal/show" ,
      payload : {
          showModal: show,
          nextFunc: nextFunc,
          modalInfo
        }
      }
      dispatch(action)
  }
  const allStatusModal = [
    // newProductStatus,
    // productsStatus,
    deleteProductStatus,
    changeProductVisibilityStatus,
    updateProductStatus,
    // addVariantsStatus,
    updateManyStatus_products_Status,
    deleteManyStatus_products_Status,
     ]
    //  filtering
    const [activeFilter , setActiveFilter] = useState(false)
    const [dateFilter , setDateFilter] = useState({
      from: null,
      to: null
  })
  const [statusFilter , setStatusFilter] = useState("all")
  const [visibilityFilter , setVisibilityFilter] = useState("all")
  const [categoryFilter , setCategoryFilter] = useState("all")
  const [searchFilter , setSearchFilter] = useState("")
  const filteringHandle = (e) => {
    e.preventDefault();

    let filterObject = {}
    if(searchFilter) filterObject.search = searchFilter
    if(statusFilter !== "all" && statusFilter) filterObject.status = statusFilter
    if(visibilityFilter !== "all" && visibilityFilter) filterObject.visibility = visibilityFilter
    if(categoryFilter !== "all" && categoryFilter) filterObject.category = categoryFilter
    if(dateFilter.from) filterObject.from = dateFilter.from
    if(dateFilter.to) filterObject.to = dateFilter.to
    
    let filters = ""
    if(Object.keys(filterObject).length === 0) window.history.replaceState(null, null, window.location.pathname);
    Object.keys(filterObject).forEach((f , i) => {
      filters = filters + (i === 0 ? "?" : "&") + f + "=" + filterObject[f]
  })
    window.history.pushState(null, null, filters);
    // return filterObject
    // setFilterProps(filterObject)
    console.log(productsStatus)
    dispatch(products({count: 1, step: productsStatus.success.pagination?.step}))
}
  const resetForm = () => {
    
    let filterObject = {}
    if(searchFilter) filterObject.search = searchFilter
    if(statusFilter !== "all" && statusFilter) filterObject.status = statusFilter
    if(visibilityFilter !== "all" && visibilityFilter) filterObject.visibility = visibilityFilter
    if(categoryFilter !== "all" && categoryFilter) filterObject.category = categoryFilter
    if(dateFilter.from) filterObject.from = dateFilter.from
    if(dateFilter.to) filterObject.to = dateFilter.to

    if(Object.keys(filterObject).length !== 0){
      window.history.replaceState(null, null, window.location.pathname);
      dispatch(products({count: 1, step: productsStatus.success.pagination?.step})).then((docs) => {
        if(docs.type === "products/fulfilled") {
        setDateFilter({from: "", to: ""})
        setStatusFilter("all")
        setVisibilityFilter("all")
        setCategoryFilter("all")
        setSearchFilter("")
        setActiveFilter(false)
      }
      })
    }
  }
  useEffect(() => {
    // "newProductStatus", "allProducts", "productsStatus" ,
    dispatch({type: "products/states" , payload: [
      "newProductStatus",
      "deleteProductStatus",
      "changeProductVisibilityStatus",
      "updateProductStatus",
      "addVariantsStatus",
      "updateManyStatus_products_Status",
      "deleteManyStatus_products_Status",
       ]}) 
  }, [])
  return (
    <>

     
    <ModalValidation status={{
      success: allStatusModal.filter(a => a.success)[0] ? true : false,
      error: allStatusModal.filter(a => a.error)[0] ? true : false,
      isLoading: allStatusModal.filter(a => a.isLoading)[0] ? true : false
      }}/>
    {/* <ModalValidation status={changeProductVisibilityStatus}/> */}
      {changeProductVisibilityStatus.isLoading && (
        <ShadowLoading/>
      )}
      {newProductStatus.success && (
        <Alert type="success">{newProductStatus.success}</Alert>
      )}
          {updateProductStatus.success && (
        <Alert type="success">{updateProductStatus.success.mss}</Alert>
      )}
      {deleteProductStatus.success && (
        <Alert type="success">
            {/* {deleteProductStatus.success}  */}
            Deleted Successfully!</Alert>
      )}
      {changeProductVisibilityStatus.success && (
        <Alert type="success">Product Status Changed</Alert>
      )}
          {addVariantsStatus.success && (
        <Alert type="success">Product Variants Changed</Alert>
      )}
                {updateManyStatus_products_Status.success && (
        <Alert type="success">{updateManyStatus_products_Status.success}</Alert>
      )}
                      {updateManyStatus_products_Status.error && (
        <Alert type="danger">{updateManyStatus_products_Status.error}</Alert>
      )}
                            {updateManyStatus_products_Status.isLoading && (
        <ShadowLoading/>
      )}
                      {deleteManyStatus_products_Status.success && (
        <Alert type="success">{deleteManyStatus_products_Status.success}</Alert>
      )}
                      {deleteManyStatus_products_Status.error && (
        <Alert type="danger">{deleteManyStatus_products_Status.error}</Alert>
      )}
                            {deleteManyStatus_products_Status.isLoading && (
        <ShadowLoading/>
      )}

        <PageStructure
          button={{ icon: <BiPlusCircle/> , href: "/admin/new-product", name: "New Product" }}
          title="Products"
        >
             <div className="actions-head">
        <Btn disabled={!itemsSelected.length} style={{position:"relative"}} element="button" btnStyle="bg" color="primary">
        <div className="icon"><BiEdit /></div> Update Many
                <select onChange={(e) => showModal(true,() => UpdateManyHandle(e), {
      title: "Update Many Products",
      message: "Vous voulez vraiment modifier les produits selectionés ?",
      type: "info"
    })} disabled={!itemsSelected.length} name="selectManyBtn" id="selectManyBtn">
                    <option selected disabled value="">Status :</option>
                    <option value="true">Publish</option>
                    <option value="false">Private</option>
                </select>
        </Btn>
        <Btn onClick={() => showModal(true, deleteManyHandle , {
      title: "Delete Many Products",
      message: "Vous voulez vraiment supprimer les produits selectionés ?",
      type: "info"
    })} disabled={!itemsSelected.length} element="button" btnStyle="bg" color="danger"><div className="icon"><BsTrash/></div> Delete Many
    </Btn>
    <Btn onClick={()=>setActiveFilter(e => !e)} element="button" btnStyle="bg" color="success"><div className="icon"><BiFilterAlt/></div>
    {((productsStatus.success.sub_data?.numberTotal || productsStatus.success.sub_data?.numberTotal === 0) && window.location.search !== "" && !activeFilter) ? ` ( ${productsStatus.success.sub_data?.numberTotal} )` : ""}
    </Btn>
        </div>
        {activeFilter && (
        <SectionStructure>
            <form onSubmit={filteringHandle} method='GET' className="Filter">
            <FlexSections direction="column">
              <FlexSections wrap={true}>
                <InputBox value={searchFilter} onChange={(e) => {
                      setSearchFilter(e.target.value)
                      filteringHandle()
                      }} placeholder="Search ..." label="Search" pd="none" flex="1" type="search" 
                />
                <SelectBox flex="1" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} pd="none" name="category" id="CategorySelect" label="Category">
                      <option value="all">all</option>
                      {categories.map(c => (
                        <option value={c._id}>{c.name}</option>
                      ))}
              </SelectBox>
              <SelectBox flex="1" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} pd="none" name="status" id="stautsSelect" label="Status">
                      <option value="all">all</option>
                      <option value="true">In Stock</option>
                      <option value="false">Out Stock</option>
              </SelectBox>
              </FlexSections>
              <FlexSections wrap={true}>
                {/* <FlexSections flex="2" wrap={true}> */}
                  <InputBox flex="1" value={dateFilter.from} onChange={(e) => setDateFilter(prev => {return {...prev , from: e.target.value}})} pd="none" label="from" type="date" name="from"/>
                  <InputBox flex="1" value={dateFilter.to} onChange={(e) => setDateFilter(prev => {return {...prev , to: e.target.value}})} pd="none" label="to" type="date" name="to"/>
                {/* </FlexSections> */}
                <SelectBox flex="1" value={visibilityFilter} onChange={(e) => setVisibilityFilter(e.target.value)} pd="none" name="visibility" id="visibilitySelect" label="Visibility">
                      <option value="all">all</option>
                      <option value="true">Publish</option>
                      <option value="false">Private</option>
                </SelectBox>
              </FlexSections>
              <FlexSections justify="end" wrap={true}>
                <Btn onClick={resetForm} flex={.3333} width="full" btnStyle= "outline" color= "danger" element="div">Reset</Btn>
              <Btn flex={.3333} type="submit" width="full" btnStyle= "bg" color= "success" element="button">Filter
                      {((productsStatus.success.sub_data?.numberTotal || productsStatus.success.sub_data?.numberTotal === 0) && window.location.search !== "") ? ` ( ${productsStatus.success.sub_data?.numberTotal} )` : ""}
                </Btn>
              </FlexSections>
            </FlexSections>
            </form>
        </SectionStructure>
        )}
          <div className="Products">
          <Loading status={productsStatus}>
            <SectionStructure pd="none">
            {allProducts.length ? (
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <td>
                        {/* <input type="checkbox" name='selectAll' id="selectAll"/>
                                    <label htmlFor="selectAll" className='checkbox'>
                                        <BsCheckLg/>
                                    </label> */}
                        <CheckBox onChange={() => selectItemHandle("selectAll")} name={"selectAll"} id="selectAll" />
                      </td>
                      <td>product name</td>
                      <td>category</td>
                      <td>price</td>
                      <td>sale price</td>
                      <td>stock</td>
                      <td>status</td>
                      {/* <td>VIEW</td> */}
                      <td>published</td>
                      <td>actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((prod, ind) => (
                        <tr key={prod._id}>
                          <td>
                            {/* <input type="checkbox" name='selectOne' id={ind+"one"}/>
                                    <label htmlFor={ind+"one"} className='checkbox'>
                                        <BsCheckLg/>
                                    </label> */}
                            <CheckBox
                              onChange={() => selectItemHandle("selectOne")}
                              name={"selectOne"}
                              id={`${prod._id}`}
                            />
                          </td>
                          <td>
                            <div className="product-name">
                              <div className="img">
                                <img loading='lazy' src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${prod.media.images[0]}`} alt="" />
                              </div>
                              <h4>{prod.name}</h4>
                            </div>
                          </td>
                          <td>
                            <div className="categorie">{prod.categorie.name}</div>
                          </td>
                          <td>
                            <div className="original-price price">
                              {prod.prices.originalPrice}<span>mad</span>
                            </div>
                          </td>
                          <td>
                            <div className="sale-price price">
                            {prod.prices.salePrice}<span>mad</span>
                            </div>
                          </td>
                          <td>
                            <div className="stock">{prod.quantite}</div>
                          </td>
                          <td>
                            {/* outOfStock */}
                            <div className={`status ${prod.productStatus.status === "true" ? "inStock" : "outOfStock"}`}>
                              {/* <div className="circle"></div> */}
                              <div className="status-name">{prod.productStatus.status === "true" ? "in stock" : "outOfStock"}</div>
                            </div>
                          </td>
                          {/* <td>
                            <div className="view">
                              <BiZoomIn />
                            </div>
                          </td> */}
                          <td>
                            <div
                              onClick={(eo) => showModal(true,() => publishedHandle(eo ,prod._id, `${prod.productStatus.visibility}`) , {
                                title: "Change Visibility",
                                message: "Vous voulez valider le changement de visibility ?",
                                type: "info"
                              })}
                              className={`published ${prod.productStatus.visibility === "true" ? "checked" : "notChecked"}`}
                            >
                              <div className="btnForClick"></div>
                            </div>
                          </td>
                          <td>
                            <div className="actions">
                            <div className="view">
                              <BiZoomIn />
                              {/* <BsZoomIn/> */}
                            </div>
                              <NavLink to={`/admin/products/edit/${prod._id}`} className="edit">
                                <BiEdit />
                              </NavLink>
                              <div className="delete">
                                {deleteProductStatus.isLoading && itemDeletedId.indexOf(prod._id) !== -1 ? <CercleLoading size="l"/> : <BsTrash onClick={() =>  showModal(true, () => deleteProductHandle(prod._id) , 
                                {
                                title: "Delete Product",
                                message: "Vous voulez vraiment supprimer ce produit ?",
                                type: "info"
                              })} /> }
                                
                                {/* <BsTrash onClick={() => deleteProductHandle(prod._id)} /> */}
                              </div>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                {console.log(productsStatus)}
                <PaginationTable paginationStep={5} dispatchFunc={products} pagination={productsStatus.success.pagination}/>
                {/* {allProducts.length ? (false
        ) : (
            <EmptyErrorSection/>
        )} */}
              </div>
        ) : (
            <EmptyErrorSection/>
        )}
            </SectionStructure>
            </Loading>
          </div>
        </PageStructure>

    </>
  );
}
