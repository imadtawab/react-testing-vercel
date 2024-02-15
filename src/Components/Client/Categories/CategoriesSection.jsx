import './CategoriesSection.scss'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import {NavLink} from "react-router-dom"
import {FaArrowRight} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { client_getCategories } from '../../../store/client_productsSlice'
import Loading from '../../Loading/Loading'
export default function CategoriesSection() {
  const {client_getCategories_Status} = useSelector(s => s.client_products)
  const [categories , setCategories] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(client_getCategories()).then(docs => {
      if (docs.type === "client_getCategories/fulfilled") {
        setCategories(docs.payload.data)
      }
    })
  }, [])
  
  return (
    <>
    <Loading status={client_getCategories_Status}>
        <ClientSectionStructure subTitle="Categories" title="Our Popular Categories">
            <div className="CategoriesSection">
              {categories.map(catg => (
                <NavLink to={`/categories/${catg.slug}`} key={catg._id} className="box-category">
                  {console.log(catg)}
                  <div style={{backgroundImage: `url(http://localhost:3500/media/${catg.image})`}} className="image"></div>
                  <div className="name">
                    <h2>{catg.name}</h2>
                  </div>
                {/* <NavLink className="parent" to={`/categories/${catg.slug}`}>
                    <div className="head">
                      <div className="image">
                        <img src={"http://localhost:3500/media/"+catg.image} alt="" />
                      </div>
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                      <h2>{catg.name}</h2>
                    </div>
                    <div className="content">
                      <p> {catg.description} </p>
                      <NavLink to={`/categories/${catg.name}`}>Learn More <FaArrowRight/> </NavLink>
                    </div>
                </NavLink> */}

                </NavLink>
              ))}
            </div>
        </ClientSectionStructure>
    </Loading>
    </>
  )
}
