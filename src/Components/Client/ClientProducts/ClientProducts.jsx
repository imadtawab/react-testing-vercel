import { NavLink } from 'react-router-dom'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import './ClientProducts.scss'
import FilterProductsSection, {FilterProductsSection1} from '../../FilterProductsSection/FilterProductsSection'
import Btn from '../../Btn/Btn'
import { BsX } from 'react-icons/bs'

export default function ClientProducts({products , filter ,setProducts , key , filterss, setFilterss}) {
  return (
    <div key={key} className="clientProducts">
            {filter && <FilterProductsSection key="main filter" setProducts={setProducts}  filterss={filterss} setFilterss={setFilterss}/>}
    <ClientSectionStructure subTitle="Products" title="Our Popular Products">
        {filter && <FilterProductsSection key="result filter" type="result-bar" setProducts={setProducts}  filterss={filterss} setFilterss={setFilterss}/>}
        <div className="ClientProducts">
        {/* {filter && <FilterProductsSection1 setProducts={setProducts}/>} */}
        <div className='products-section'>
            {products.map(prod => (
                // <NavLink to={`/products/${prod._id}`} className="box-product">
                <NavLink to={`/products/${prod.searchEngineOptimize.urlKey}`} className="box-product">
                    {prod.prices.discount ? (
                        <>
                                            <span className='kanba'></span>
                    <div className="promo">{prod.prices.discount}%</div>
                    </>
                    ) : false}
                    <div className="image">
                        {/* <img src={prod.media.images[0]} alt={prod.name} /> */}
                        <img src={"http://localhost:3500/media/"+prod.media.images[0]} alt={prod.name} />
                    </div>
                    <p>{prod.categorie.name}</p>
                    <h2>{prod.name}</h2>
                    <div className="prices">
                    <div className="originalPrice">{prod.prices.originalPrice}<span>mad</span></div>
                    <div className="salePrice">{prod.prices.salePrice}<span>mad</span></div>
                    </div>
                    <div className="buy">Ajouter au panier</div>
                </NavLink>
            ))}
        </div>
        </div>
    </ClientSectionStructure>
    </div>
  )
}
