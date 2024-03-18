import { BsHeart, BsHeartArrow } from "react-icons/bs";
import InputBox, { SelectBox } from "../../../Components/InputBox/InputBox";
import "./ClientProductDetails.scss";
import { BiHeart, BiHeartCircle, BiMinus, BiPlus, BiSolidHeart } from "react-icons/bi";
import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../../store/productsSlice";
import { useParams } from "react-router";
import { addToCard } from "../../../store/usersSlice";
import Alert from "../../../Components/Alert/Alert";
import SecondCard, {SecondCard1} from "../SecondCard/SecondCard";
import { client_productDetails } from "../../../store/client_productsSlice";
import Btn from "../../../Components/Btn/Btn";

export default function ClientProductDetails() {
  const {client_productDetailsStatus} = useSelector(s => s.client_products)
  // const [product , setProduct] = useState({})
  console.log(client_productDetailsStatus,159);
  const dispatch = useDispatch()
  const params = useParams()
  // const [mainImage , setMainImage] = useState()
  // const [quantiteValue , setQuantiteValue] = useState(1)
  // const [color , setColor] = useState(["red" , "blue" , "green"][0])
  // const [size , setSize] = useState(["x" , "xl" , "xxl"][0])
  // const [allImages , setAllImages] = useState([])
  useEffect(() => {
    dispatch(client_productDetails(params.product_slug))
    // .then(() => {
        // setProduct(productDetailsStatus.success)
        // setMainImage(productDetailsStatus.success.media.images[0])
        // setAllImages(productDetailsStatus.success.media.images)
      // })
  },[dispatch,params.product_slug])

  useEffect(() => {
    dispatch({type: "users/states" , payload: "addToCardStatus"}) 
  }, [])
  

  return (
    <div className="ClientProductDetails">
      <Loading status={client_productDetailsStatus} showMessageError={<div className="empty-cart">
                          <h1 className="title">404</h1>
                          <p className="message">Page cannot be find.</p>
                          <Btn
                            btnStyle="bg"
                            color="dark"
                            element="a"
                            to={"/"}
                            >
                            Back to home page
                          </Btn>
                        </div>}>
          <ShowProduct userProduct={client_productDetailsStatus.success.product} userAttributes={client_productDetailsStatus.success.attributes} />
      </Loading>
  </div>
  );
}


export function ShowProduct({userProduct, userAttributes}) {
  // const [product , setProduct] = useState({})
  const dispatch = useDispatch()
  const {addToCardStatus} = useSelector(s => s.users)
  // const params = useParams()
  const [mainImage , setMainImage] = useState(userProduct.media.images[0])
  const [quantiteValue , setQuantiteValue] = useState(1)
  const [attributes , setAttributes] = useState([])
  const [attributesChecked , setAttributesChecked] = useState({})
  const [product , setProduct] = useState({})


  useEffect(() => {
    let attChecked = []
    let attCheckedChecked = {}
    // console.log(userAttributes ,userProduct ,123);
    userProduct.attributes.forEach(prodAtt => {
      userAttributes.forEach(att =>{
        // console.log(prodAtt , "&&&" , att);
        if(att._id === prodAtt.attributeId){
          let attValues = att.values.filter(v => prodAtt.attributeValuesId.indexOf(v.id) !== -1)
          attChecked.push({...att , values: attValues})
          attCheckedChecked[att._id] = attValues[0]?.id
        } 
      })
    })

    setAttributes(attChecked)
    setAttributesChecked(attCheckedChecked)
    setProduct(userProduct.variants.length > 0 ? userProduct.variants[0] : {
      image: userProduct.media.images[0],
      originalPrice: userProduct.prices.originalPrice,
      salePrice: userProduct.prices.salePrice,
      quantite: userProduct.quantite,
      sku: userProduct.sku,
      variantId: userProduct._id
    })
    // console.log(userProduct.variants[0]);
  }, [userAttributes,userProduct])
  
  const showVariantCheckedHandle = (attributesChecked) => {
    userProduct.variants.forEach(va => {
      // console.log(Object.keys(va.variantArr));
      let result = Object.keys(va.variantArr).every(attId => attributesChecked[attId] === va.variantArr[attId])
      if (result) {
        setProduct(va)
        setMainImage(va.image)
        // console.log(va);
      }
    })
  }
  const openCart = (status) => {
    const action = {
      type : "cart/show" ,
      payload : status
      }
      dispatch(action)
      // console.log("dima maghrib",modalActions.show(action));
    
  }
  const addToCardHandle = () => {
    // let finalyProduct = {
    //   product: userProduct,
    //   variant: product,
    //   quantite: quantiteValue
    // }

    let finalyProduct1 = {
      userId: userProduct.userId,
      productId: userProduct._id,
      image: userProduct.media.images[0],
      name: userProduct.name,
      slug: userProduct.searchEngineOptimize.urlKey,
      categorie: userProduct.categorie,
    }
    // console.log(userProduct);
    let variant = {...product, quantiteUser: quantiteValue}
    dispatch(addToCard({finalyProduct1,variant})).then((docs) => {
      if(docs.type === "addToCard/fulfilled") {
        openCart(true)
      }
    })
  }
  return (
            <>
                {addToCardStatus.error && (
              <Alert type={"danger"}>{addToCardStatus.error}</Alert>
            )}
    <div className="parent">
    <div className="catalogue">
      <div className="main-image">
        {userProduct.prices.discount ? (
          <>
          <span className='kanba'></span>
          <div className="promo">-{userProduct.prices.discount}%</div>
          </>
        ) : null}
        {userProduct.media.images.map(img => (
          <img loading='lazy' className={img === mainImage ? "active" : ""} src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${img}`} alt="" />
        ))}
      </div>
      <div className="all-images">
      {userProduct.media.images.map(img => (
        <div className={`box ${img === mainImage ? "active" : ""}`}>
          <img loading='lazy' onClick={(eo) => setMainImage(img)} src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${img}`} alt="" />
        </div>
      ))}

      </div>
    </div>
    <div className="info">
      <div className="category">
        {userProduct.categorie.name}
      </div>
      <h1>{userProduct.name}</h1>
      <div className="price">
        {product.originalPrice ? (
          <div className="originalPrice">
              {product.originalPrice} <span>mad</span>
            </div>
        ) : null}
        <div className="salePrice">
          {product.salePrice} <span>mad</span>
        </div>
      </div>
      <div className="variants">
        {/* {console.log(attributes)} */}
        {attributes.map(att => (
          <div key={att._id } className={"variant " + att.type}>
            <div className="name">{att.public_name} :</div>
            <div className="parent-variants">
              {att.type === "colorSpans" ? (
                att.values.map((v, index )=> (
                  <span key={index*1} onClick={() => {
                    setAttributesChecked(prev => {
                      showVariantCheckedHandle({...prev, [att._id]: v.id})
                      return {...prev, [att._id]: v.id}
                    })
                  }} className={v.id === attributesChecked[att._id] ? "active" : ""} style={{background: v.color}}>
                  </span>
                ))
              ) :att.type === "checkBox" ? (
                att.values.map((v, index )=> (
                  <span key={index*2} onClick={() => {
                    setAttributesChecked(prev => {
                      showVariantCheckedHandle({...prev, [att._id]: v.id})
                      return {...prev, [att._id]: v.id}
                    })
                  }} className={v.id === attributesChecked[att._id] ? "active" : ""} >{v.name}</span>
                ))
              ) :att.type === "dropDown" ? (
                <SelectBox  onChange={(e) => {
                  setAttributesChecked(prev => {
                    showVariantCheckedHandle({...prev, [att._id]: e.target.value})
                    return {...prev, [att._id]: e.target.value}
                  })

                }}>
                  {att.values.map((v, index )=> (
                    <option key={index*3} selected={v.id === attributesChecked[att._id]} value={v.id}>{v.name}</option>
                  ))}
                </SelectBox>
              ) : false}
            </div>
          </div>
        ))}
        <div className="variant">
          <div className="name">Quantite :</div>
            <div className="controller">
              <button disabled={quantiteValue === 1} onClick={() => setQuantiteValue(prev => prev > 1 ? --prev : prev)} className="minus"> <BiMinus/> </button>
              <input type="text" disabled value={quantiteValue} />
              <button disabled={quantiteValue === 10} onClick={() => setQuantiteValue(prev => prev < 10 ? ++prev : prev)} className="plus"> <BiPlus/> </button>
            </div>
        </div>
      </div>
      <div className="footer">
        <div className="btns">
          <div className="buy">Commander Maintenant</div>
          <div className="btns-container">
            <div onClick={addToCardHandle} className="add-to-card">Ajouter au panier</div>
            <div className="favorate"><BsHeart/></div>
          </div>
        </div>
        {/* <div className="favorate">
          <BsHeart/>
        </div> */}
      </div>
      <div className="parent-description">
        <h5>Description :</h5>
        <div dangerouslySetInnerHTML={{ __html: userProduct.description }} className="description"/>
      </div>
    </div>
  </div>
  </>
  )
}

