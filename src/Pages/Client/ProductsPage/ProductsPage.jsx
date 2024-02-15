import { useEffect, useState } from 'react'
import CategoriesSection from '../../../Components/Client/Categories/CategoriesSection'
import ClientProducts from '../../../Components/Client/ClientProducts/ClientProducts'
import './ProductsPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { client_getProducts } from '../../../store/client_productsSlice'
import FilterProductsSection from '../../../Components/FilterProductsSection/FilterProductsSection'
import ShadowLoading from '../../../Components/ShadowLoading/ShadowLoading'

export default function ProductsPage() {
  const {client_getProductsStatus} = useSelector(s => s.client_products)
  const [products , setProducts] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(client_getProducts({filter: {},limit: null})).then(docs => {
      if(docs.type === "client_getProducts/fulfilled"){
        setProducts(docs.payload.data)
      }
    })
  }, [dispatch])

  return (
    <div className='ProductsPage'>
      {client_getProductsStatus.isLoading && <ShadowLoading />}
        <ClientProducts setProducts={setProducts} filter products={products}/>
    </div>
  )
}
