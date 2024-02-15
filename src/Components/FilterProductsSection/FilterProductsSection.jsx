import './FilterProductsSection.scss'
import Btn from '../Btn/Btn'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {getAttributes} from '../../store/attributesSlice'
import { client_getAttributes, client_getCategories, client_getProducts } from '../../store/client_productsSlice'
import PriceProgress from '../Client/PriceProgress/PriceProgress'
export default function FilterProductsSection({setProducts}) {
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
    <div className='FilterProductsSection'>
        <div className="one-section row">
            <h4>Categories</h4>
            <ul>
            <li className={!categorieSelect ? "active" : ""} onClick={() => categorieHandle(null)}>all products</li>
                {categories.map(catg => (
                    <li className={categorieSelect === catg._id ? "active" : ""} onClick={() => categorieHandle(catg._id)} key={catg._id}>{catg.name} ({catg.number})</li>
               ))}
            </ul>
        </div>
            {attributes.map(att => (
                        // <div key={att._id} className={`one-section ${att.type === "dropDown" ? "drop-down" : "box"}`}>
                        <div key={att._id} className={`one-section box`}>
                        <h4>{att.public_name}</h4>
                        {/* {att.type === "dropDown" ? (
                            <select name={att.public_name} id={att._id}>
                                    {att.values.map(v => (
                                            <option key={v.id} value={v.id}>{v.name}</option>

                                        ))}
                            </select>
                        ) : ( */}
                        <ul>
                        {att.values.map(v => (
                            <li className={attributesSelect[att._id] ? attributesSelect[att._id].indexOf(v.id) !== -1 ? "active" : "" : ""} onClick={() => attributesHandle(att._id , v.id)} key={v.id}>{v.name}</li>

                        ))}
                    </ul>
                        {/* )} */}
                    </div>
            ))}
        <div className="one-section price">
            <h4>Price</h4>
            <PriceProgress step={100} cielValue={1000} min_input={min_input} setMin_input={setMin_input} max_input={max_input} setMax_input={setMax_input}/>
        </div>
        <Btn onClick={filterHandle} width="full" color="dark" element="button" btnStyle="bg">Filter</Btn>
    </div>
  )
}
