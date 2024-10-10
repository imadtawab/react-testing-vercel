import React, { useEffect, useState } from 'react'
import Products from '../../Components/ProductsSection/ProductsSection'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../../Store/Client/productSlice'
import EmptyErrorSection from '../../../MainComponent/EmptyErrorSection/EmptyErrorSection'

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getProducts()).unwrap()
    //     .then(docs => setProducts(docs.data))
    //     .catch(err => console.log(err))
    // }, [])
    
  return (
    <div className='ProductsPage'>
        <Products filter title="Our Popular Products" subTitle="Products" products={products} setProducts={setProducts} emptyMessage={<EmptyErrorSection/>}/>
    </div>
  )
}
