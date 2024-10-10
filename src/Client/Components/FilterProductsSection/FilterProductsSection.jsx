import './FilterProductsSection.scss'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import React from 'react'
import { FaChevronDown, FaLaptopHouse } from "react-icons/fa";
import { BsCheckLg, BsX } from 'react-icons/bs'
import PriceProgress from '../PriceProgress/PriceProgress';
import { getCategories } from '../../../Store/Client/categorySlice';
import { filterQuerysHandler } from '../../../MainUtils/filtersUtils';
import { getProductsFilter } from '../../../Store/Client/productSlice';
import { getAttributes } from '../../../Store/Client/attributeSlice';

export default function FilterProductsSection({setProducts , openFilter , setOpenFilter}) {
    const [attributes , setAttributes] = useState([])
    const [categories , setCategories] = useState([])
    const dispatch = useDispatch()
    let dispatchFunc = () => dispatch(getProductsFilter()).unwrap()
    .then(docs => {
        let {data, query} = docs
        setProducts(data)
        let {categories, min, max, attributes} = query
        setCategoriesSelect(categories ? categories.split(",") : [])
        setMin_input(min)
        setMax_input(max)
        setAttributesSelect(attributes ? attributes.split(",") : [])
    }).catch(err => console.log(err))

    const [categoriesSelect , setCategoriesSelect] = useState([])
    const categoriesHandle = (id) => {
        let newCategories = categoriesSelect.indexOf(id) === -1 ? [...categoriesSelect, id] : categoriesSelect.filter(v => v !== id)
        // setCategriesSelect(newAttributes)
        let filter = {}
        filter.categories = newCategories ? newCategories.join(","):   null
        filterQuerysHandler(filter, dispatchFunc)
    }
    const attributesHandle = (v_id) => {
        let newAttributes = attributesSelect.indexOf(v_id) === -1 ? [...attributesSelect, v_id] : attributesSelect.filter(v => v !== v_id)
        console.log(newAttributes)
        // setAttributesSelect(newAttributes)
        let filter = {}
        filter.attributes = newAttributes ? newAttributes.join(","):   null
        filterQuerysHandler(filter, dispatchFunc)
    }
    const priceHandle = () => {
        let filter = {}
        filter.min = min_input
        filter.max = max_input
        filterQuerysHandler(filter, dispatchFunc)
    }
    const [attributesSelect , setAttributesSelect] = useState([])


    const [min_input , setMin_input] = useState(0)
    const [max_input , setMax_input] = useState()

    useEffect(() => {
        Promise.all([dispatch(getCategories()).unwrap(), dispatch(getAttributes()).unwrap()]).then(docs => {
            setCategories(docs[0].data)
            setAttributes(docs[1].data)
            dispatchFunc()
        }).catch(err => console.log(err))
    }, [])

    // useEffect(() => {
    //     let filter = {}
    //     filter.category = categoriesSelect
    //     filterQuerysHandler(filter, () => console.log("aa"))
    // }, [categoriesSelect])
   
    const resetFilterHandler = () => {
        let filter = {}
        filter.category = null
        filter.min = null
        filter.max = null
        filter.attributes = null
        filterQuerysHandler(filter, dispatchFunc)
    }
  return (
    <div data-close="true" onClick={(e) => e.target.dataset.close ? setOpenFilter(false) : null} className={`FilterProductsSection1${openFilter ? "" : " closed"}`}>
<div className="filter-container">
    <div className="top-filter">
        <div onClick={() => setOpenFilter(false)} className="close-btn"><BsX/> Fermer</div>
    </div>
    <div className="content-filter">
    <div className="one-section price">
            <h4>Filter By Price</h4>
            <PriceProgress onClick={priceHandle} step={100} cielValue={1000} min_input={min_input} setMin_input={setMin_input} max_input={max_input} setMax_input={setMax_input}/>
        </div>
        <div className="one-section row">
            <h4>Filter By Categories</h4>
            <ul>
                {categories.map(catg => (
                 <label key={catg._id} htmlFor={catg._id}>
                    <input onChange={() => categoriesHandle(catg._id)} checked={categoriesSelect.indexOf(catg._id) !== -1} type="checkbox" name={catg.name} id={catg._id} />
                    <label htmlFor={catg._id}><BsCheckLg/></label>
                    <div className="val-name">{catg.name} <span>{catg.number}</span></div>
                </label>
               ))}
            </ul>
        </div>
            {attributes.map(att => (
                        <div key={att._id} className={`one-section box`}>
                        <h4>Filter By {att.public_name}</h4>
                        <ul>
                        {att.values.map(v => (
                            <label key={v._id} htmlFor={v._id}>
                                <input onChange={() => attributesHandle(v._id)} checked={attributesSelect.indexOf(v._id) !== -1} type="checkbox" name={v.name} id={v._id} />
                                <label htmlFor={v._id}><BsCheckLg/></label>
                                <div className="val-name">{v.name}</div>
                            </label>
                        ))}
                    </ul>
                    </div>
            ))}
            <div onClick={resetFilterHandler} className="reset">Reset Filter</div>
    </div>
</div>
    </div>
  )
}
