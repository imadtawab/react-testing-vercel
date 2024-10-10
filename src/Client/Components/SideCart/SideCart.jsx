import './SideCart.scss'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import empty_cart from '../../../Assets/empty-cart.png'
import { activeSideCart, countShoppingCartTotalPrice } from '../../Utils/sideCartUtils'
import { deleteItemFromCart, getShoppingCart } from '../../../Store/Client/shoppingCartSlice'
export default function SideCart() {
  const {active} = useSelector(s => s.sideCart)
  // const {shoppingCart} = useSelector(s => s.shoppingCart)
  const [shoppingCart, setShoppingCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const dispatch = useDispatch()

  let deleteItemHandler = (e, prod_id, v_id) => {
    e.preventDefault()
    dispatch(deleteItemFromCart({prod_id, v_id})).unwrap()
    .then(docs => {
      setShoppingCart(docs)
      setTotalPrice(countShoppingCartTotalPrice(docs))
    })
    .catch(err => console.log(err))
  }
  // if(!active) return
  useEffect(() => {
    if(!active) return
    dispatch(getShoppingCart()).unwrap()
    .then(docs => {
      setShoppingCart(docs)
      setTotalPrice(countShoppingCartTotalPrice(docs))
    })
    .catch(err => console.log(err))
  }, [active])

const hiddenCartHandler = (e) => {
  if (e.target.classList.contains("SideCart")) activeSideCart(false)
}
  return (
    <div onClick={hiddenCartHandler} className={'SideCart' + (active ? "" : " closed")}>
        <div className="cart-container">
          {active && (
            <>
            <div className="top-cart">
              <h2>Mon panier</h2>
              <div onClick={() => activeSideCart(false)} className="close-btn"><BsX/> Fermer</div>
            </div>
            {shoppingCart.length > 0 ? (
              <>
                    <div className="content-cart">
                    {shoppingCart.map(prod => (
                      prod.variants.length === 1 ? (
                        <NavLink 
                        // onClick={() => activeSideCart(false)} 
                        key={prod._id} to={`/products/${prod.slug}`} className="cart">
                        <div className="cart-info">
                          <div className="image">
                          <img loading='lazy' src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${prod.variants[0].image}`} alt={prod.name} />
                            {/* <img loading='lazy' src={prod.image} alt="" /> */}
                          </div>
                          <div className="text-info">
                            <h3>{prod.name}</h3>
                            {/* <div className="category">{prod.categorie.name}</div> */}
                            <div className="variant">{prod.variants[0].name}</div>
                            <div className="price-qty">
                            {prod.variants[0].quantityUser} × <span>{prod.variants[0].salePrice} MAD</span>
                            </div>
                          </div>
                        </div>
                        {/* onClick={() => deleteProductFromHandle(prod.productId,prod.variants[0].variantId)} */}
                        <div onClick={(e) => deleteItemHandler(e, prod._id, prod.variants[0]._id)} className="delete-cart"><BsX/></div>
                      </NavLink>
                      ) : (
                        <NavLink 
                        // onClick={() => activeSideCart(false)} 
                        key={prod._id} to={`/products/${prod.slug}`} className="cart multi-variants">
            
                          <div className="mulit-cart">
                            <div className="cart-info">
                              <div className="image">
                                <img loading='lazy' src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${prod.image}`} alt={prod.name} />
                              </div>
                              <div className="text-info">
                                <h3>{prod.name}</h3>
                                {/* <div className="category">{prod.categorie.name}</div> */}
                                {prod.variants.map(v => (
                                  <div key={v._id} className="sub-cart">
                                    <div key={v._id} className="sub-container">
                                      <div className="image">
                                        <img loading='lazy' src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${v.image}`} alt="" />
                                      </div>
                                      <div className="text-info">
                                        <div className="variant">{v.name}</div>
                                        <div className="price-qty">
                                        {v.quantityUser} × <span>{v.salePrice} MAD</span>
                                        </div>
                                      </div>
                                    </div>
                                    {/* onClick={() => deleteProductFromHandle(prod.productId,v.variantId)} */}
                                    <div onClick={(e) => deleteItemHandler(e, prod._id, v._id)} className="delete-cart"><BsX/></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                      </NavLink>
                      )
                    ))}
                  </div>
                  <div className="bottom-cart">
                    <div className="sub-total">
                      Sous-total : <span>{totalPrice} MAD</span>
                    </div>
                    <div className="btns-cart">
                      <NavLink onClick={() => activeSideCart(false)} to="/cart" >voir le panier</NavLink>
                      <NavLink to="#">commander</NavLink>
                    </div>
                  </div>
                  </>
            ) : (
              <div className="empty-cart">
                <img loading='lazy' src={empty_cart} alt="" />
                <p>Votre panier est vide.</p>
                <NavLink onClick={() => activeSideCart(false)} to="/products">Continue Shopping</NavLink>
              </div>
            )}
            </>
          )}
        </div>
    </div>
  )
}