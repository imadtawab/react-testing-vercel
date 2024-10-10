import './Dashboard.scss'
import { BiCreditCard, BiSolidLayer } from 'react-icons/bi';
import { FaPercent, FaShoppingCart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageStructure from '../../Components/PageStructure/PageStructure';
import GridSections from '../../Components/GridSections/GridSections';
import BoxSection from '../../Components/BoxSection/BoxSection';
import SectionStructure from '../../Components/SectionStructure/SectionStructure';
import Btnx from '../../Components/Btnx/Btnx';
import { dashboard_OrderStatics } from '../../../Store/Admin/orderSlice';
import SalesReportCharts from '../../Components/Charts/SalesReportCharts';
import CategoriesChart from '../../Components/Charts/CategoriesChart';
import RevenueReportChart from '../../Components/Charts/RevenueReportChart';
import { NavLink } from 'react-router-dom';

export default function Dashboard() {
    const dispatch = useDispatch()
    const { isLoadingPage } = useSelector(s => s.order)
    const [defaultOrdersData , setDefaultOrdersData] = useState({
        todayRevenue: "...",
        lastWeekRevenue: "...",
        lastMonthRevenue: "...",
        currentYearRevenue: "...",
        todayOrdersNumber: "...",
        todayVisitorsNumber: "...",
        conversionRate: "...",
        monthChartData: {},
    })
    const {orders_statics, top_selling, categories_statics} = defaultOrdersData.monthChartData
    useEffect(() => {
        dispatch(dashboard_OrderStatics()).unwrap()
        .then(docs => setDefaultOrdersData(docs.data))
        .catch(err => toast.error(err.message))
    }, [])

    
    return (
    <PageStructure loading={isLoadingPage} title="Dashboard">
            <div className='Dashboard'>
                <div className="revenue-data">
                <GridSections>
                        <BoxSection type="BoxSection2" icon={<BiSolidLayer/>} title="Last Week" value={{type:"mad",amount: defaultOrdersData.lastWeekRevenue}}/>
                        <BoxSection type="BoxSection2" icon={<FaShoppingCart/>} title="Last Month" value={{type:"mad",amount: defaultOrdersData.lastMonthRevenue}}/>
                        <BoxSection type="BoxSection2" icon={<BiCreditCard/>} title="Current Year" value={{type:"mad",amount: defaultOrdersData.currentYearRevenue}}/>
                    </GridSections>
                    <GridSections>
                        <BoxSection icon={<FaShoppingCart/>} title="Today orders" value= {defaultOrdersData.todayOrdersNumber} status="delayed"/>
                        <BoxSection icon={<BsFillEyeFill/>} title="Today visitors" value= {defaultOrdersData.todayVisitorsNumber} status="pending"/>
                        <BoxSection icon={<FaPercent/>} title="Convertion rate" value={{type:"%",amount: defaultOrdersData.conversionRate}} status="cancelled"/>
                        <BoxSection icon={<BiCreditCard/>} title="Today Revenue" value={{type:"mad",amount: defaultOrdersData.todayRevenue}} status="confirmed"/>
                    </GridSections>
                </div>        
                <div className="parent-dashboard">
                <SectionStructure flex="2" title="Sales Report" controlls={<Btnx btnStyle="bg" color="success" element="a" to="/admin/orders" >All Orders</Btnx>}>
                    <div className="sales-report">
                        {orders_statics && <SalesReportCharts data={orders_statics}/>}
                    </div>
                </SectionStructure>
                <SectionStructure flex="1" title="Categories">
                    <div className="categories">
                        {categories_statics && <CategoriesChart data={categories_statics}/>}

                    </div>
                </SectionStructure>
                </div>
                <div className="parent-dashboard">
                <SectionStructure flex="2" title="Revenue Report">
                    <div className="revenue-report">
                        {orders_statics && <RevenueReportChart data={orders_statics}/>}
                    </div>
                </SectionStructure>
                <SectionStructure flex="1" title="Top Selling"  controlls={<Btnx btnStyle="bg" color="success" element="a" to="/admin/products" >All Products</Btnx>}>
                    <div className="top-selling">
                    <div className="products-table table-container">
                        <table>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td style={{textAlign:"start"}}>product</td>
                                    <td>sales</td>
                                </tr>
                            </thead>
                            <tbody>
                                {top_selling?.map((prod,ind) => (
                                    ind < 4 && (
                                        <tr>
                                            <td>#{ind+1}</td>
                                            <td>
                                                <NavLink to={"/admin/products/edit/"+prod._id} className="product-name">
                                                    <div className="img">
                                                        <img loading='lazy' src={`${process.env.REACT_APP_SERVER_DOMAINE}/media/${prod.image}`} alt="" />
                                                    </div>
                                                    <h4>{prod.name}</h4>
                                                </NavLink>
                                        </td>
                                        <td>
                                            <div className="solde">{prod.quantity}</div>
                                        </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </SectionStructure>
                </div>
            </div>
    </PageStructure>
  )
}
