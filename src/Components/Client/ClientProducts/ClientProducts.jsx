import { NavLink } from 'react-router-dom'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import './ClientProducts.scss'
import FilterProductsSection, {FilterProductsSection1} from '../../FilterProductsSection/FilterProductsSection'
import Btn from '../../Btn/Btn'
import { BsCart3, BsFilter, BsHeart, BsHeartFill, BsMenuApp, BsSearch, BsX } from 'react-icons/bs'
import SecondCard from '../../../Pages/Client/SecondCard/SecondCard'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCard, addToWishList, deleteProductWishList, getWishList } from '../../../store/usersSlice'
import { client_productDetails } from '../../../store/client_productsSlice'
import Loading from '../../Loading/Loading'
import CercleLoading from '../../CercleLoading/CercleLoading'
import { SelectBox } from '../../InputBox/InputBox'
import { RiHeartAddLine } from "react-icons/ri";

export default function ClientProducts({products , filter ,setProducts , key , filterss, setFilterss , wishLists}) {
    let productss = [
        {_id: 1 , name: "Apple AirPods Pro 2 + 1 Gratuit" , categorie: {name: "Écouteurs"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://www.ramzystore.com/wp-content/uploads/2024/02/1-3ard-airpods-pro-2-ramzystore.jpg" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 2 , name: "Hk9 Pro+ Noir" , categorie: {name: "Smartwatches"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://www.ramzystore.com/wp-content/uploads/2023/12/1-hk-9-pro-ramzystore-1.jpg" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 3 , name: "Anker 30w" , categorie: {name: "Chargeurs"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://www.ramzystore.com/wp-content/uploads/2023/10/1-chargeurs-anker-30w-iphone-adapter-original.jpg" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 4 , name: "Xiaomi 13 Pro 12/256GB (Ceramic Black)" , categorie: {name: "Xiaomi"} , prices: {discount: null , originalPrice: 8000 , salePrice: 6500} , image: "https://www.ramzystore.com/wp-content/uploads/2024/01/xiaomi-redmi-note-13-pro-vert-ramzystore-prix-maroc.jpg" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 5 , name: "Oraimo SmartTrimmer 2" , categorie: {name: "Tondeuse"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://www.ramzystore.com/wp-content/uploads/2023/12/tr13n__1-oraimo-ramzystore.jpg" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "Oraimo FreePods 4" , categorie: {name: "Écouteurs"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://www.ramzystore.com/wp-content/uploads/2023/12/1-oraimo-freepods-4-105d_ramzystore.jpg" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "Benyar Montre Bracelet En Cuir Marron Quartz Pour Hommes..." , categorie: {name: "Montres"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/04/573445/1.jpg?1759" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "Casio Montre analogique pour homme MTP-VT01GL-2BUDF" , categorie: {name: "Montres"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/80/300505/1.jpg?1609" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "VEADA 4 Men's Classic Basic Solid Crew Neck Soft Cotton" , categorie: {name: "Vétements"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/46/044436/1.jpg?1746" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "Débardeur Noir Coton Bio 100 % 4-PACK" , categorie: {name: "Vétements"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/79/514632/1.jpg?9598" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "espadrille pour femme" , categorie: {name: "Chossures"} , prices: {discount: 20 , originalPrice: 500 , salePrice: 350} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/19/655364/1.jpg?9142" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "ALHAMBRA Parfum Mousuf Ambre Oud Bois Eau de Parfum original" , categorie: {name: "parfum"} , prices: {discount: 70 , originalPrice: 499 , salePrice: 149} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/41/201405/1.jpg?1946" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "ard al zaafarn Parfum mousuf - ORIGINAL - 100 ML -" , categorie: {name: "parfum"} , prices: {discount: 51 , originalPrice: 299 , salePrice: 148} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/21/077316/1.jpg?5125" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "Lattafa Ameer Al Oud Intense" , categorie: {name: "parfum"} , prices: {discount: 61 , originalPrice: 499 , salePrice: 194} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/704774/1.jpg?9929" ,  searchEngineOptimize: {urlKey: "first prudct"}},
        {_id: 6 , name: "Lattafa Parfum RAMZ pour l'homme by boutique officielle , 100ml" , categorie: {name: "parfum"} , prices: {discount: 69 , originalPrice: 499 , salePrice: 153} , image: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/73/719384/1.jpg?1252" ,  searchEngineOptimize: {urlKey: "first prudct"}},
    ]
    const [openFilter , setOpenFilter] = useState(false)
    const dispatch = useDispatch()
    const addToWishListHandle = (_id) => {
        dispatch(addToWishList(_id)).then((docs) => {
            if(docs.type === "addToWishList/fulfilled") {
                setWishList(docs.payload);
            }
        })
    }
    const [attributes , setAttributes] = useState([])
    const [attributesChecked , setAttributesChecked] = useState({})

    const addToCartHandle = (e,choices , prod) => {
        e.preventDefault()
        setProduct(prod.variants.length > 0 ? prod.variants[0] : {
            image: prod.media.images[0],
            originalPrice: prod.prices.originalPrice,
            salePrice: prod.prices.salePrice,
            quantite: prod.quantite,
            sku: prod.sku,
            variantId: prod._id
          })
        if(choices) {
            dispatch(client_productDetails(prod.searchEngineOptimize.urlKey)).then((docs) => {
                console.log(docs)
                if (docs.type === 'client_productDetails/fulfilled') {
                    const userProduct = docs.payload.product
                    const userAttributes = docs.payload.attributes

                    // the solution from client product details
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
                    setShowChoicesSection(prod)
                }
            })
        }else{
            console.log("Add To Cart");
            let variant = {
                ...(product ? product : {            image: prod.media.images[0],
                    originalPrice: prod.prices.originalPrice,
                    salePrice: prod.prices.salePrice,
                    quantite: prod.quantite,
                    sku: prod.sku,
                    variantId: prod._id}),
                quantiteUser: 1
              }
            let finalyProduct1 = {
                userId: prod.userId,
                productId: prod._id,
                image: prod.media.images[0],
                name: prod.name,
                slug: prod.searchEngineOptimize.urlKey,
                categorie: prod.categorie,
              }
              console.log(product);
            dispatch(addToCard({finalyProduct1,variant})).then((docs) => {
                if(docs.type === "addToCard/fulfilled") {
                    setShowChoicesSection(null)
                    setProduct(null)
                  openCart(true)
                }
              })
        }
    }
    const {client_productDetailsStatus} = useSelector(s => s.client_products)
    const [showChoicesSection , setShowChoicesSection] = useState(null)
    const openCart = (status) => {
        const action = {
          type : "cart/show" ,
          payload : status
          }
          dispatch(action)
          // console.log("dima maghrib",modalActions.show(action));
        
      }
      const [product , setProduct] = useState(null)
      const showVariantCheckedHandle = (attributesChecked) => {
        showChoicesSection.variants.forEach(va => {
          // console.log(Object.keys(va.variantArr));
          let result = Object.keys(va.variantArr).every(attId => attributesChecked[attId] === va.variantArr[attId])
          if (result) {
            setProduct(va)
          }
        })
      }
      const [wishList , setWishList] = useState([])
    useEffect(() => {
        dispatch(getWishList()).then((docs) => {
            if(docs.type === "getWishList/fulfilled") {
                setWishList(docs.payload);
            }
        })
    }, [])
    const deleteFromWishListHandle = (_id) => {
      dispatch(deleteProductWishList({_id , products})).then((docs) => {
        if(docs.type === "deleteProductWishList/fulfilled") {
          setProducts(docs.payload.newProducts)
        }
    })
    }
  return (
    <div key={key} className="ClientProducts">
        {showChoicesSection && (
            <div data-close="true" onClick={(e) => e.target.dataset.close ? setShowChoicesSection(null) : null} className="choices-section">
                <div className="choices-container">
                <div className="top-choices">
                    <h2>Choix des options</h2>
                    <div onClick={() => setShowChoicesSection(null)} className="close-btn"><BsX/></div>
                </div>
                <div className="content-choices">
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
                                    }} className={v.id === attributesChecked[att._id] ? "active" : ""} style={{background: v.color}}></span>
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
                </div>
                <div className="buttom-choices">
                    <div onClick={(e) => addToCartHandle(e,false, showChoicesSection)}>Ajouter au panier</div>
                    <NavLink to={`/products/${showChoicesSection.searchEngineOptimize.urlKey}`}>Voir les détails</NavLink>
                </div>
                </div>
            </div>
        )}
            {/* {filter && <FilterProductsSection key="main filter" setProducts={setProducts}  filterss={filterss} setFilterss={setFilterss}/>} */}
    <ClientSectionStructure subTitle="Products" title="Our Popular Products">
        {/* {filter && <FilterProductsSection key="result filter" type="result-bar" setProducts={setProducts}  filterss={filterss} setFilterss={setFilterss}/>} */}
        
        <div className="products-container">
        {filter && <FilterProductsSection1 openFilter={openFilter} setOpenFilter={setOpenFilter} setProducts={setProducts}/>}
        <div className="products-section">
            {filter && <div onClick={() => setOpenFilter(true)} className='top-products-section'><BsFilter/> Show Filter</div>}
            <div className='products-grid'>
                {products.map(prod => (
                    // <NavLink to={`/products/${prod._id}`} className="box-product">
                    <NavLink key={prod._id} to={`/products/${prod.searchEngineOptimize.urlKey}`} className="box-product">
                        {prod.prices.discount ? (
                            <>
                                                <span className='kanba'></span>
                        <div className="promo">-{prod.prices.discount}%</div>
                        </>
                        ) : false}
                        <div onClick={(e) => e.preventDefault()} className="more-controlles">
                            <span data-content="Apérçu rapide"><BsSearch/></span>
                            {wishLists ? (
                            <span onClick={() => deleteFromWishListHandle(prod._id)} className='delete' data-content="Supprimer">
                            <BsX/>
                            </span>
                            ) : (
                            <span className={wishList.indexOf(prod._id) !== -1 ? "active" : null} onClick={() => addToWishListHandle(prod._id)} data-content="Ajouter aux favories">
                            {/* <BsHeart/> */}
                            <RiHeartAddLine/>
                            <div className="fill"><BsHeartFill/></div>
                            </span>
                            )}
                        </div>
                        <div className="image">
                            <img src={"http://localhost:3500/media/"+prod.media.images[0]} alt={prod.name} />
                            {/* <img src={prod.image} alt={prod.name} /> */}
                        <div onClick={(e) => addToCartHandle(e,prod.variants.length > 0 , prod)} className="buy"><span>{prod.variants.length > 0 ? "Choix des options" : "Ajouter au panier"}</span><span>{client_productDetailsStatus.isLoading ? <CercleLoading type="btn"/> : <BsCart3/>}</span></div>
                        </div>
                        <p>{prod.categorie.name}</p>
                        <h2>{prod.name}</h2>
                        <div className="prices">
                        {prod.prices.originalPrice ? <div className="originalPrice">{prod.prices.originalPrice}<span>mad</span></div> : null}
                          <div className="salePrice">{prod.prices.salePrice}<span>mad</span></div>
                          {/* {prod.prices.salePrice ? (
                            <>
                            </>
                          ) : (
                            <div className="salePrice">{prod.prices.originalPrice}<span>mad</span></div>

                          )} */}
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
        </div>
    </ClientSectionStructure>
    </div>
  )
}
