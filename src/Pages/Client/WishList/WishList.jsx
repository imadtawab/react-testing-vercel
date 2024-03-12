import { useDispatch, useSelector } from 'react-redux'
import './WishList.scss'
import { useEffect, useState } from 'react'
import { getWishList } from '../../../store/usersSlice'
import { client_getProducts } from '../../../store/client_productsSlice'
import Loading from '../../../Components/Loading/Loading'
import ClientProducts from '../../../Components/Client/ClientProducts/ClientProducts'
import { NavLink } from 'react-router-dom'
import empty_card from '../../../assets/empty-cart.png'
import { BsHeart, BsHeartbreak } from 'react-icons/bs'

export default function WishList() {
    const {client_getProductsStatus} = useSelector(s => s.client_products)
    const {wishList} = useSelector(s => s.users)
    const dispatch = useDispatch()
    const [products , setProducts] = useState([])
    useEffect(() => {
      dispatch(getWishList()).then(docs => {
        if (docs.type === "getWishList/fulfilled") {
            dispatch(client_getProducts({filter: {},limit: null , specialItems: docs.payload})).then(docs => {
                if (docs.type === "client_getProducts/fulfilled") {
                    setProducts(docs.payload.data)
                }
              })
        }
      })
    }, [])

  return (
    <div className='WishList'>
        <Loading status={client_getProductsStatus}>
          {products.length > 0 ? (
            <ClientProducts wishLists key={"wishlistproduct"} setProducts={setProducts} products={products}/>
          ) : (
            <div className="empty-cart">
            <BsHeartbreak/>
            <p>Votre wishlist est vide.</p>
            <NavLink to="/products">Continue Shopping</NavLink>
          </div>
          )}
        </Loading>
    </div>
  )
}
