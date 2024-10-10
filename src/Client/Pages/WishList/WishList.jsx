import React, { useEffect, useState } from 'react'
import Products from '../../Components/ProductsSection/ProductsSection'
import { useDispatch } from 'react-redux'
import { getWishList } from '../../../Store/Client/productSlice'
import EmptyWishList from '../../Components/EmptyWishList/EmptyWishList'

export default function WishList() {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWishList()).unwrap()
        .then(docs => setProducts(docs.data))
        .catch(err => console.log(err))
    }, [])
    
  return (
    <div className='WishList'>
        <Products wishList title="Your list of favorite products" subTitle="Wishlist" products={products} setProducts={setProducts} emptyMessage={<EmptyWishList/>}/>
    </div>
  )
}
