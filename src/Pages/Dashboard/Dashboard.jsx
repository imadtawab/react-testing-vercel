import './Dashboard.scss'
import PageStructure from '../../Components/PageStructure/PageStructure'
import GridSections from '../../Components/GridSections/GridSections'
import BoxSection from '../../Components/BoxSection/BoxSection'
import { BiCreditCard, BiSolidLayer } from 'react-icons/bi';
import { FaPercent, FaShoppingCart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import SectionStructure from '../../Components/SectionStructure/SectionStructure';
import SalesReportCharts from '../../Components/Charts/SalesReportCharts';
import CategoriesChart from '../../Components/Charts/CategoriesChart';
import RevenueReportChart from '../../Components/Charts/RevenueReportChart';
// import CategoriesChart from '../../Components/Charts/CategoriesChart';
import productImg from "../../assets/profile.jpg"
import Btn from '../../Components/Btn/Btn';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert/Alert';
import { useEffect, useState } from 'react';
import { dashboard_OrderData } from '../../store/orderSlice';
import Loading from '../../Components/Loading/Loading';

export default function Dashboard() {
    const {registerUserStatus , loginUserStatus} = useSelector(s => s.users)
    const {dashboard_OrderData_Status} = useSelector(s => s.orders)
    const dispatch = useDispatch()
    // const [defaultOrdersData , setDefaultOrdersData] = useState({
    //     lastWeekRevenue: "...",
    //     lastMonthRevenue: "...",
    //     currentYearRevenue: "...",
    //     todayRevenue: "...",
    //     monthRevenue: "...",
    //     totalRevenue: "...",
    //     todayOrdersNumber: "...",
    //     todayVisitors: "...",
    //     convetionRate: "...",
    //     monthChartData_Sales: [],
    //     monthChartData_Revenue: [],
    //     monthChartData_Categorie: [],
    //     monthChartData_TopProductsSaling: [],
    // })
    const [defaultOrdersData , setDefaultOrdersData] = useState({
        todayRevenue: "...",
        lastWeekRevenue: "...",
        lastMonthRevenue: "...",
        currentYearRevenue: "...",
        todayOrdersNumber: "...",
        todayVisitors: "//5",
        convetionRate: "//6",
        monthChartData: {},
    })
    useEffect(() => {
        dispatch(dashboard_OrderData()).then((docs) => {
            if(docs.type === 'dashboard_OrderData/fulfilled'){
                console.log(docs.payload.data,9999999999);
                setDefaultOrdersData(docs.payload.data)
                
            }
        })
    }, [dispatch])
    
    return (
        <>
      {loginUserStatus.success && (
          <Alert type="success">{loginUserStatus.success}</Alert>
        )}
    <PageStructure title="Dashboard">

        <div className='Dashboard'>
            {console.log(dashboard_OrderData_Status)}
            {/* <Loading status={dashboard_OrderData_Status}> */}
            <div className="revenue-data">
            <GridSections>
                    {console.log(defaultOrdersData,"****************")}
                    <BoxSection type="BoxSection2" icon={<BiSolidLayer/>} title="Last Week" value={{type:"mad",amount: defaultOrdersData.lastWeekRevenue}} status="returned"/>
                    <BoxSection type="BoxSection2" icon={<FaShoppingCart/>} title="Last Month" value={{type:"mad",amount: defaultOrdersData.lastMonthRevenue}} status="pending"/>
                    <BoxSection type="BoxSection2" icon={<BiCreditCard/>} title="Current Year" value={{type:"mad",amount: defaultOrdersData.currentYearRevenue}} status="delivered"/>
                </GridSections>
                <GridSections>
                    <BoxSection icon={<FaShoppingCart/>} title="Today orders" value= {defaultOrdersData.todayOrdersNumber} status="delayed"/>
                    <BoxSection icon={<BsFillEyeFill/>} title="Today visitors" value= {defaultOrdersData.todayVisitors} status="pending"/>
                    <BoxSection icon={<FaPercent/>} title="Convertion rate" value={{type:"%",amount: defaultOrdersData.convetionRate}} status="cancelled"/>
                    <BoxSection icon={<BiCreditCard/>} title="Today Revenue" value={{type:"mad",amount: defaultOrdersData.todayRevenue}} status="confirmed"/>
                </GridSections>
            </div>
            {/* </Loading> */}
      
            <div className="parent-dashboard">
              <SectionStructure flex="2" title="Sales Report" controlls={<Btn btnStyle="bg" color="success" element="a" to="/admin/orders" >All Orders</Btn>}>
                  <div className="sales-report">
                      {dashboard_OrderData_Status.success && <SalesReportCharts apiData={defaultOrdersData?.monthChartData?.data_for_each_items}/>}
                  </div>
              </SectionStructure>
              <SectionStructure flex="1" title="Categories">
                  <div className="categories">
                    {console.log(defaultOrdersData?.monthChartData?.data_for_each_items,636363)}
                    {dashboard_OrderData_Status.success && <CategoriesChart apiData={defaultOrdersData?.monthChartData?.global_data?.global_categorie}/>}

                  </div>
              </SectionStructure>
            </div>
            <div className="parent-dashboard">
            <SectionStructure flex="2" title="Revenue Report">
                  <div className="revenue-report">
                      {dashboard_OrderData_Status.success && <RevenueReportChart apiData={defaultOrdersData?.monthChartData?.data_for_each_items}/>}
                  </div>
              </SectionStructure>
              <SectionStructure flex="1" title="Top Selling"  controlls={<Btn btnStyle="bg" color="success" element="a" to="/admin/products" >All Products</Btn>}>
                  <div className="top-selling">
                  <div className="products-table">
                    <table>
                        <thead>
                            <tr>
                                <td style={{textAlign:"start"}}>PRODUCT NAME</td>
                                <td>SALES</td>
                            </tr>
                        </thead>
                        <tbody>
                        {dashboard_OrderData_Status.success && (
                            defaultOrdersData?.monthChartData?.global_data?.global_top_selling_products.map((prod,ind) => (
                                ind < 4 && (
                                    <>
                                                       <tr>
                             
                                <td>
                                    <div className="product-name">
                                        #{ind+1}
                                        <div className="img">
                                            <img src={"http://localhost:3500/media/"+prod.main_image} alt="" />
                                        </div>
                                        <h4>{prod.name}</h4>
                                    </div>
                                </td>
                                <td>
                                    <div className="solde">{prod.number_of_sales}</div>
                                </td>
                            </tr>
                                </>
                                )
                            ))

                        )}
                        </tbody>
                    </table>
                </div>
                  </div>
              </SectionStructure>
            </div>
        </div>
    </PageStructure>
  </>
  )
}
