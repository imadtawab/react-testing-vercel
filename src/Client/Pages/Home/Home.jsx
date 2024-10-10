import './Home.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CategoriesSection from '../../Components/CategoriesSection/CategoriesSection'
import ProductsSection from '../../Components/ProductsSection/ProductsSection'
import { getProducts } from '../../../Store/Client/productSlice'
import {toast} from 'react-toastify'

export default function Home() {
  const dispatch = useDispatch()
  const [products , setProducts] = useState([])
  useEffect(() => {
    dispatch(getProducts()).unwrap()
    .then(docs => setProducts(docs.data))
    .catch(err => toast.error(err.message))
  }, [])
  
  return (
    <div className='Home'>
      <CategoriesSection/>
        <ProductsSection title="Our Popular Products" subTitle="Products" products={products}/>
    </div>
  )
}
