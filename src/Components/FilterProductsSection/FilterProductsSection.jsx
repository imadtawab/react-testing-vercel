import './FilterProductsSection.scss'
import Btn from '../Btn/Btn'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {getAttributes} from '../../store/attributesSlice'
import { client_getAttributes, client_getCategories, client_getProducts } from '../../store/client_productsSlice'
import PriceProgress from '../Client/PriceProgress/PriceProgress'
import React from 'react'
import categories_icon from '../../assets/categories.png'
import attributes_icon from '../../assets/attributes.png'
import { FaChevronDown, FaLaptopHouse } from "react-icons/fa";
import CheckBox from "../CheckBox/CheckBox"
import { BsCheckLg, BsX } from 'react-icons/bs'

export default function FilterProductsSection({setProducts , type ,  filterss ,  setFilterss}) {
    const [attributes , setAttributes] = useState([])
    const [categories , setCategories] = useState([])
    
    const [filters , setFilters] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(client_getAttributes()).then(docs => {
            console.log(docs)
            if(docs.type === 'client_getAttributes/fulfilled'){
                setAttributes(docs.payload.data)
            }
        })
        dispatch(client_getCategories()).then(docs => {
            console.log(docs)
            if(docs.type === 'client_getCategories/fulfilled'){
                setCategories(docs.payload.data)
            }
        })
    }, [])
    const [categorieSelect , setCategorieSelect] = useState(null)
    const categorieHandle = (id) => {
        setCategorieSelect(id)
    }
    const [attributesSelect , setAttributesSelect] = useState({})
    const attributesHandle = (att_id , v_id) => {
        console.log(attributesSelect);
        if(attributesSelect[att_id]){
            console.log("att exist");
            if(attributesSelect[att_id].indexOf(v_id) !== -1){
                if(attributesSelect[att_id].length === 1 && attributesSelect[att_id][0] === v_id) {
                    let obj = {...attributesSelect}
                    delete obj[att_id]
                    setAttributesSelect(obj)
                }else{
                    setAttributesSelect(prev => {
                        return {
                            ...prev,
                            [att_id]: prev[att_id].filter(v => v !== v_id)
                        }
                    })
                }
            }else{
                setAttributesSelect(prev => {
                    return {
                        ...prev,
                        [att_id]: [...prev[att_id] , v_id]
                    }
                })
            }
        }else{
            console.log("att not exist");
            setAttributesSelect(prev => {
                return {...prev , [att_id]: [v_id]}
            })
        }

        // setAttributesSelect(prev => {return {...prev , [att_id]: checkValue(prev[att_id] , v_id)}})
    }
    // const attributesHandle = (att_id , v_id) => {
    //     if(attributesSelect[att_id]){
    //         console.log("att exist");
    //         if(attributesSelect[att_id].indexOf(v_id) !== -1){
    //             setAttributesSelect(prev => {
    //                 return {
    //                     ...prev,
    //                     [att_id]: prev[att_id].filter(v => v !== v_id)
    //                 }
    //             })
    //         }else{
    //             setAttributesSelect(prev => {
    //                 return {
    //                     ...prev,
    //                     [att_id]: [...prev[att_id] , v_id]
    //                 }
    //             })
    //         }
    //     }else{
    //         console.log("att not exist");
    //         setAttributesSelect(prev => {
    //             return {...prev , [att_id]: [v_id]}
    //         })
    //     }

    //     // setAttributesSelect(prev => {return {...prev , [att_id]: checkValue(prev[att_id] , v_id)}})
    // }

    const [min_input , setMin_input] = useState(0)
    const [max_input , setMax_input] = useState()

    // useEffect(() => {
    //     let filterObject = {}
    //     if (categorieSelect) filterObject.categorie = categorieSelect
    //     if (Object.keys(attributesSelect).length !== 0) filterObject.attributes = attributesSelect
    //     filterObject.min = min_input
    //     filterObject.max = max_input
    //     dispatch(client_getProducts({filter:filterObject , limit: null})).then(docs => {
    //         if(docs.type === "client_getProducts/fulfilled"){
    //           setProducts(docs.payload.data)
    //         }
    //       })

    //     if (categorieSelect) {
    //         window.history.pushState(null, null, "?category="+categories.find(c => c._id === categorieSelect).name);
    //     }else{
    //         window.history.replaceState(null, null, window.location.pathname);
    //     }
    // //     let filters = ""
    // //     if(Object.keys(filterObject).length === 0) window.history.replaceState(null, null, window.location.pathname);
    // //     Object.keys(filterObject).forEach((f , i) => {
    // //         if(f === "attributes"){
    // //             console.log("okk");
    // //             Object.keys(attributesSelect).forEach(att => {
    // //                 attributesSelect[att].forEach(v => {
    // //                     filters = filters + (i === 0 ? "?" : "&") + att + "=" + v
    // //                 })
    // //             })
    // //             return
    // //         }
    // //       filters = filters + (i === 0 ? "?" : "&") + f + "=" + filterObject[f]
    // //   })
    // //   console.log(filters);
    // //     window.history.pushState(null, null, filters);
    // }, [categorieSelect , attributesSelect])
    const filterHandle = (categorie , attributes) => {
        let filterObject = {}
        if (categorie) filterObject.categorie = categorie
        if (Object.keys(attributes).length !== 0) filterObject.attributes = attributes
        filterObject.min = min_input
        filterObject.max = max_input
        if (categorie) {
            window.history.pushState(null, null, "?category="+categories.find(c => c._id === categorie).name);
        }else{
            window.history.replaceState(null, null, window.location.pathname);
        }
        dispatch(client_getProducts({filter:filterObject , limit: null})).then(docs => {
            if(docs.type === "client_getProducts/fulfilled"){
                console.log(docs);
              setProducts(docs.payload.data)
              setOpenCategories(false)
              setOpenAttributes(false)
              setFilterss(docs.payload.filters)
            }
          })
    }
    const [openCategories , setOpenCategories] = useState(false)
    const [openAttributes , setOpenAttributes] = useState(false)
    const closeFilter = (eo) => {
        if (eo.target.dataset.close === "categories") {
            setOpenCategories(false)
        }
        if (eo.target.dataset.close === "attributes") {
            setOpenAttributes(false)
            document.querySelectorAll(".attributes .box.open").forEach(item => {
                item.classList.remove("open")
            })
        }
    }
    const showOptionsHandle = (eo) => {
        if(!eo.target.classList.contains("forClose")){
            return
        }
        if (eo.target.parentElement ===  document.querySelector(".attributes .box.open") ||
            eo.target.parentElement.parentElement ===  document.querySelector(".attributes .box.open") ||
            eo.target.parentElement.parentElement.parentElement === document.querySelector(".attributes .box.open")
        ) {
            if (eo.target.parentElement.classList.contains("box")) {
                eo.target.parentElement.classList.toggle("open")
            }
            else if(eo.target.parentElement.parentElement.classList.contains("box")) {
                eo.target.parentElement.parentElement.classList.toggle("open")
            }
            else if(eo.target.parentElement.parentElement.parentElement.classList.contains("box")) {
                eo.target.parentElement.parentElement.classList.toggle("open")
            }
            return
        }
        document.querySelectorAll(".attributes .box").forEach(box => {
            box.classList.remove("open")
        })
        if (eo.target.parentElement.classList.contains("box")) {
            eo.target.parentElement.classList.add("open")
        }
        else if(eo.target.parentElement.parentElement.classList.contains("box")) {
            eo.target.parentElement.parentElement.classList.add("open")
        }
        else if(eo.target.parentElement.parentElement.parentElement.classList.contains("box")) {
            eo.target.parentElement.parentElement.classList.add("open")
        }
    }
    useEffect(() => {
      console.log(filterss , 99999);
      setCategorieSelect(filterss?.categorie || null)
      setAttributesSelect(filterss?.attributes || {})
    }, [filterss])

    const removeFilterHandle = async (att) => {
        let obj = {...attributesSelect}
        await delete obj[att]
        await filterHandle(categorieSelect , obj)
    }
  return (
    <div key={type === "result-bar" ? type : "filters"} className='FilterProductsSection'>
        {type === "result-bar" ? (
            (categorieSelect || Object.keys(attributesSelect).length) ? (
            <div className="filter-result">
                {categorieSelect && <div className="result-name">{categories.find(c => c._id === categorieSelect).name}<BsX/></div>}
                {
                    Object.keys(attributesSelect).map(att => (
                        <div className="result-name">{attributes.find(c => c._id === att).public_name}<BsX onClick={() => removeFilterHandle(att)}/></div>
                    ))
                }
                {(min_input || max_input) && <div className="result-name">price<BsX/></div>}
            </div>
            ) : null
        ) : (
            <div className="filter-form">
                <div className="search">
                    <input type="text" name="" id="" placeholder='Search ...'/>
                </div>
                <div onClick={() => setOpenCategories(true)} className="box"><img src={categories_icon} alt="" /> categorie</div>
                <div onClick={() => setOpenAttributes(true)} className="box"><img src={attributes_icon} alt="" /> Plus options</div>
                <button type='submit'>Search</button>
                <div onClick={closeFilter} data-close={"categories"} className={`section-filter${openCategories ? " active" : ""}`}>
                    <div className={`container-filter`}>
                    <h4>Select Categories</h4>
                        <div className="categories">
                            <ul>
                            <li className={!categorieSelect ? "active" : ""} onClick={() => categorieHandle(null)}><img src={categories_icon} alt="" />all products</li>
                                {categories.map(catg => ( // ({catg.number})
                                    <li className={categorieSelect === catg._id ? "active" : ""} onClick={() => categorieHandle(catg._id)} key={catg._id}><img src={categories_icon} alt="" />{catg.name} </li>
                            ))}
                            </ul>
                        </div>
                        <div className="footer">
                            <button onClick={() => filterHandle(categorieSelect , attributesSelect)}>Confirmer</button>
                        </div>
                    </div>
                </div>
                <div onClick={closeFilter} data-close={"attributes"} className={`section-filter${openAttributes ? " active" : ""}`}>
                    <div className={`container-filter`}>
                    <h4>Plus d'options</h4>
                    <div className="attributes">
                        {attributes.map(att => (
                            <div key={att._id} onClick={showOptionsHandle} className="box forClose">
                                <div className="name forClose">{att.public_name} <FaChevronDown className='forClose'/></div>
                                <div style={{"--items-count": att.values.length}} className='values'>
                                    {att.values.map(v => (
                                        <label key={v.id} htmlFor={v.id}>
                                            <input onChange={() => attributesHandle(att._id , v.id)} checked={attributesSelect[att._id] ? attributesSelect[att._id].indexOf(v.id) !== -1 ? true : false : false} type="checkbox" name={v.name} id={v.id} />
                                            <label htmlFor={v.id}><BsCheckLg/></label>
                                            <div className="val-name">{v.name}</div>
                                        </label>
                                    ))}
                                </div>
                            </div> 
                        ))}
                            <div key="price" onClick={showOptionsHandle} className="box forClose">
                                <div className="name forClose">Price <FaChevronDown className='forClose'/></div>
                                <div style={{"--items-count": 4}} className='values'>
                                    <PriceProgress step={100} cielValue={1000} min_input={min_input} setMin_input={setMin_input} max_input={max_input} setMax_input={setMax_input}/>
                                </div>
                            </div>
                    </div>
                        <div className="footer">
                            <button onClick={() => filterHandle(categorieSelect , attributesSelect)}>Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export function FilterProductsSection1({setProducts , openFilter , setOpenFilter}) {
    const [attributes , setAttributes] = useState([])
    const [categories , setCategories] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(client_getAttributes()).then(docs => {
            console.log(docs)
            if(docs.type === 'client_getAttributes/fulfilled'){
                setAttributes(docs.payload.data)
            }
        })
        dispatch(client_getCategories()).then(docs => {
            console.log(docs)
            if(docs.type === 'client_getCategories/fulfilled'){
                setCategories(docs.payload.data)
            }
        })
    }, [])
    const [categorieSelect , setCategorieSelect] = useState(null)
    const categorieHandle = (id) => {
        setCategorieSelect(id)
    }
    const [attributesSelect , setAttributesSelect] = useState({})
    const attributesHandle = (att_id , v_id) => {
        if(attributesSelect[att_id]){
            console.log("att exist");
            if(attributesSelect[att_id].indexOf(v_id) !== -1){
                setAttributesSelect(prev => {
                    return {
                        ...prev,
                        [att_id]: prev[att_id].filter(v => v !== v_id)
                    }
                })
            }else{
                setAttributesSelect(prev => {
                    return {
                        ...prev,
                        [att_id]: [...prev[att_id] , v_id]
                    }
                })
            }
        }else{
            console.log("att not exist");
            setAttributesSelect(prev => {
                return {...prev , [att_id]: [v_id]}
            })
        }

        // setAttributesSelect(prev => {return {...prev , [att_id]: checkValue(prev[att_id] , v_id)}})
    }

    const [min_input , setMin_input] = useState(0)
    const [max_input , setMax_input] = useState()


    useEffect(() => {
        let filterObject = {}
        if (categorieSelect) filterObject.categorie = categorieSelect
        if (Object.keys(attributesSelect).length !== 0) filterObject.attributes = attributesSelect
        filterObject.min = min_input
        filterObject.max = max_input
        dispatch(client_getProducts({filter:filterObject , limit: null})).then(docs => {
            if(docs.type === "client_getProducts/fulfilled"){
              setProducts(docs.payload.data)
            }
          })

        if (categorieSelect) {
            window.history.pushState(null, null, "?category="+categories.find(c => c._id === categorieSelect).name);
        }else{
            window.history.replaceState(null, null, window.location.pathname);
        }
    //     let filters = ""
    //     if(Object.keys(filterObject).length === 0) window.history.replaceState(null, null, window.location.pathname);
    //     Object.keys(filterObject).forEach((f , i) => {
    //         if(f === "attributes"){
    //             console.log("okk");
    //             Object.keys(attributesSelect).forEach(att => {
    //                 attributesSelect[att].forEach(v => {
    //                     filters = filters + (i === 0 ? "?" : "&") + att + "=" + v
    //                 })
    //             })
    //             return
    //         }
    //       filters = filters + (i === 0 ? "?" : "&") + f + "=" + filterObject[f]
    //   })
    //   console.log(filters);
    //     window.history.pushState(null, null, filters);
    }, [categorieSelect , attributesSelect])
    const filterHandle = () => {
        let filterObject = {}
        if (categorieSelect) filterObject.categorie = categorieSelect
        if (Object.keys(attributesSelect).length !== 0) filterObject.attributes = attributesSelect
        filterObject.min = min_input
        filterObject.max = max_input
        dispatch(client_getProducts({filter:filterObject , limit: null})).then(docs => {
            if(docs.type === "client_getProducts/fulfilled"){
              setProducts(docs.payload.data)
            }
          })
    }
  return (
    <div data-close="true" onClick={(e) => e.target.dataset.close ? setOpenFilter(false) : null} className={`FilterProductsSection1${openFilter ? "" : " closed"}`}>
<div className="filter-container">
    <div className="top-filter">
        <div onClick={() => setOpenFilter(false)} className="close-btn"><BsX/> Fermer</div>
    </div>
<div className="one-section price">
            <h4>Filter By Price</h4>
            <PriceProgress step={100} cielValue={1000} min_input={min_input} setMin_input={setMin_input} max_input={max_input} setMax_input={setMax_input}/>
        </div>
        <div className="one-section row">
            <h4>Filter By Categories</h4>
            <ul>
                <label key={'all-categories'} htmlFor={'all-categories'}>
                    <input onChange={() => categorieHandle(null)} checked={!categorieSelect ? true : false} type="checkbox" name={"all-categories"} id={'all-categories'} />
                    <label htmlFor={'all-categories'}><BsCheckLg/></label>
                    <div className="val-name">All categories</div>
                </label>
                {categories.map(catg => (
                 <label key={catg._id} htmlFor={catg._id}>
                    <input onChange={() => categorieHandle(catg._id)} checked={categorieSelect === catg._id ? true : false} type="checkbox" name={catg.name} id={catg._id} />
                    <label htmlFor={catg._id}><BsCheckLg/></label>
                    <div className="val-name">{catg.name} <span>{catg.number}</span></div>
                </label>
                    // <li className={categorieSelect === catg._id ? "active" : ""} onClick={() => categorieHandle(catg._id)} key={catg._id}>{catg.name} ({catg.number})</li>
               ))}
            </ul>
        </div>
  
            {attributes.map(att => (
                        <div key={att._id} className={`one-section box`}>
                        <h4>Filter By {att.public_name}</h4>
                        <ul>
                        {att.values.map(v => (
                            <label key={v.id} htmlFor={v.id}>
                                <input onChange={() => attributesHandle(att._id , v.id)} checked={attributesSelect[att._id] ? attributesSelect[att._id].indexOf(v.id) !== -1 ? true : false : false} type="checkbox" name={v.name} id={v.id} />
                                <label htmlFor={v.id}><BsCheckLg/></label>
                                <div className="val-name">{v.name}</div>
                            </label>
                            // <li className={attributesSelect[att._id] ? attributesSelect[att._id].indexOf(v.id) !== -1 ? "active" : "" : ""} onClick={() => attributesHandle(att._id , v.id)} key={v.id}>{v.name}</li>
                        ))}
                    </ul>
                        {/* )} */}
                    </div>
            ))}
     
        {/* <Btn onClick={filterHandle} width="full" color="dark" element="button" btnStyle="bg">Filter</Btn> */}
</div>
    </div>
  )
}
