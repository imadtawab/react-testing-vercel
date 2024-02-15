import { NavLink } from 'react-router-dom'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import './ClientProducts.scss'
import FilterProductsSection from '../../FilterProductsSection/FilterProductsSection'
import Btn from '../../Btn/Btn'

export default function ClientProducts({products , filter ,setProducts}) {
  return (
    <ClientSectionStructure subTitle="Products" title="Our Popular Products">
        <div className="ClientProducts">
        {filter && <FilterProductsSection setProducts={setProducts}/>}
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
  )
}
