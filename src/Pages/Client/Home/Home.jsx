import ClientProducts from '../../../Components/Client/ClientProducts/ClientProducts'
import MasterCleanse from '../../../Components/MasterCleanse/MasterCleanse'
import './Home.scss'
import Loading from '../../../Components/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { products } from '../../../store/productsSlice'
import { client_getProducts } from '../../../store/client_productsSlice'
import CategoriesSection from '../../../Components/Client/Categories/CategoriesSection'
import Btn from '../../../Components/Btn/Btn'

export default function Home() {
  const dispatch = useDispatch()
  const [products , setProducts] = useState([])
  const { client_getProductsStatus , allProducts } = useSelector(state => state.client_products)
  console.log(client_getProductsStatus);
  useEffect(() => {
    dispatch(client_getProducts({filter: {},limit: null})).then(docs => {
      if(docs.type === "client_getProducts/fulfilled"){
        setProducts(docs.payload.data)
      }
    })
  }, [dispatch])
  
  return (
    <div className='Home'>
      <Loading status={client_getProductsStatus}>
        <CategoriesSection/>
        <ClientProducts products={products} />
        <Btn style={{margin: "80px auto 10px" ,width: "fit-content"}} element="a" to="/products" btnStyle="bg" color="dark">All products</Btn>
      </Loading>
    </div>
  )
}
