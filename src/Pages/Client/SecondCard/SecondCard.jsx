import { BiX } from 'react-icons/bi'
import './SecondCard.scss'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function SecondCard({product}) {
  const [closeCard , setCloseCard] = useState(false)
  return (
    <div className={'SecondCard' + (closeCard ? " close-card" : "")}>
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
