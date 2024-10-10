import './EmptyWishList.scss'
import { NavLink } from 'react-router-dom'
import { BsHeartbreak } from 'react-icons/bs'


export default function EmptyWishList() {
  return (
    <div className="EmptyWishList">
    <BsHeartbreak/>
    <p>Votre wishlist est vide.</p>
    <NavLink to="/products">Continue Shopping</NavLink>
  </div>
  )
}
