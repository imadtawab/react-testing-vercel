import { BiX } from 'react-icons/bi'
import './SecondCard.scss'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs'
import { deleteProductFromCard, getShoppingCard } from '../../../store/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import empty_card from '../../../assets/empty-cart.png'
export default function SecondCard({products}) {
  // const [closeCard , setCloseCard] = useState(false)
  // const [shoppingCard , setShoppingCard] = useState([])
  const {shoppingCard} = useSelector(s => s.users)
  const {showCart} = useSelector(s => s.cart)
  const dispatch = useDispatch()
  const deleteProductFromCardHandle = (e,productId, variantId) => {
    e.preventDefault()
    dispatch(deleteProductFromCard({productId,variantId}))
  }
  useEffect(() => {
    dispatch(getShoppingCard())
  }, [dispatch])
  // useEffect(() => {
  //   dispatch(getShoppingCard())
  // }, [shoppingCard]
  const openCart = (status) => {
    const action = {
      type : "cart/show" ,
      payload : status
      }
      dispatch(action)
      // console.log("dima maghrib",modalActions.show(action));
    
  }
  useEffect(() => {
    openCart(false)
  } , [window.location.pathname])
  return (
    <div data-close="true" onClick={(e) => e.target.dataset.close ? openCart(false) : null} className={'SecondCard' + (showCart ? "" : " closed")}>
      <div className="card-container">
        {showCart && (
          <>
          <div className="top-card">
            <h2>Mon panier</h2>
            <div onClick={() => openCart(false)} className="close-btn"><BsX/> Fermer</div>
          </div>
          {shoppingCard.length > 0 ? (
            <>
                  <div className="content-card">
                  {shoppingCard.map(prod => (
                    prod.variants.length === 1 ? (
                      <NavLink to={`/products/${prod.slug}`} className="card">
                      <div className="card-info">
                        <div className="image">
                        <img src={"http://localhost:3500/media/"+prod.variants[0].image} alt={prod.name} />
                          {/* <img src={prod.image} alt="" /> */}
                        </div>
                        <div className="text-info">
                          <h3>{prod.name}</h3>
                          {/* <div className="category">{prod.categorie.name}</div> */}
                          <div className="variant">{prod.variants[0].variantName}</div>
                          <div className="price-qty">
                          {prod.variants[0].quantiteUser} × <span>{prod.variants[0].salePrice} MAD</span>
                          </div>
                        </div>
                      </div>
                      {/* onClick={() => deleteProductFromHandle(prod.productId,prod.variants[0].variantId)} */}
                      <div onClick={(e) => deleteProductFromCardHandle(e,prod.productId,prod.variants[0].variantId)} className="delete-card"><BsX/></div>
                    </NavLink>
                    ) : (
                      <NavLink to={`/products/${prod.slug}`} className="card multi-variants">
          
                        <div className="mulit-cart">
                          <div className="card-info">
                            <div className="image">
                              <img src={"http://localhost:3500/media/"+prod.image} alt={prod.name} />
                              {/* <img src={prod.image} alt="" /> */}
                            </div>
                            <div className="text-info">
                              <h3>{prod.name}</h3>
                              {/* <div className="category">{prod.categorie.name}</div> */}
                              {prod.variants.map(v => (
                                <div className="sub-card">
                                  <div className="sub-container">
                                    <div className="image">
                                      <img src={`http://localhost:3500/media/${v.image}`} alt="" />
                                    </div>
                                    <div className="text-info">
                                      <div className="variant">{v.variantName}</div>
                                      <div className="price-qty">
                                      {v.quantiteUser} × <span>{v.salePrice} MAD</span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* onClick={() => deleteProductFromHandle(prod.productId,v.variantId)} */}
                                  <div onClick={(e) => deleteProductFromCardHandle(e,prod.productId,v.variantId)} className="delete-card"><BsX/></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                    </NavLink>
                    )
                    // <NavLink to={`/products/${prod.slug}`} className="card">
                    //   <div className="card-info">
                    //     <div className="image">
                    //     <img src={"http://localhost:3500/media/"+prod.image} alt={prod.name} />
                    //       {/* <img src={prod.image} alt="" /> */}
                    //     </div>
                    //     <div className="text-info">
                    //       <h3>{prod.name}</h3>
                    //       <div className="price-qty">
                    //       {prod.variants.map(p => p.quantiteUser).reduce((a,b) => a+b)} × <span>{prod.variants.map(p => p.quantiteUser * p.salePrice).reduce((a,b) => a+b)} MAD</span>
                    //       </div>
                    //     </div>
                    //   </div>
                    //   <div onClick={(e) => {e.preventDefault()}} className="delete-card"><BsX/></div>
                    // </NavLink>
                  ))}
                </div>
                <div className="bottom-card">
                  <div className="sub-total">
                    Sous-total : <span>{[...shoppingCard.map(p => p.variants.map(v => v.quantiteUser * v.salePrice)).map(a => a.reduce((a,b) => a+b)),0,0].reduce((a,b) => a+b)} MAD</span>
                  </div>
                  <div className="btns-card">
                    <NavLink to="/cart">voir le panier</NavLink>
                    <NavLink to="#">commander</NavLink>
                  </div>
                </div>
                </>
          ) : (
            <div className="empty-cart">
              <img src={empty_card} alt="" />
              <p>Votre panier est vide.</p>
              <NavLink onClick={() => openCart(false)} to="/products">Continue Shopping</NavLink>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  )
}

export function SecondCard1({product}) {
  const [closeCard , setCloseCard] = useState(false)
  return (
    <div className={'SecondCard1' + (closeCard ? " close-card" : "")}>
      {/* <div className="box-card"> */}
        <div className="head-card">
          <div className="title">Product Added In Your Cart</div>
          <div onClick={()=> setCloseCard(true)} className="close"><BiX/></div>
        </div>
        <div className="content-card">
            <div className="product">
              <div className="info">
                <div className="image">
                  <img src={`http://localhost:3500/media/${product.variant.image}`} alt="" />
                </div>
                <div className="info-text">
                  <div className="name">{product.name}</div>
                  <div className="variant">{product.variant.variantName}</div>
                </div>
              </div>
              <div className="quantite">QTY: {product.variant.quantiteUser}</div>
            </div>
        </div>
        <div className="bottom-card">
          <NavLink className="view-card" to="/cart">View Card</NavLink>
          <div onClick={()=> setCloseCard(true)} className="continue-shopping">Continue Shopping</div>
        </div>
      {/* </div> */}
    </div>
  )
}
