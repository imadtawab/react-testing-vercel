import ReactECharts from 'echarts-for-react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function SalesReportCharts({data=[]}) {
    const chartRef = useRef(null);
    let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const timesHandler = data.map(d => {
        let day = new Date(d.time).getDate()
        let monthIndex = new Date(d.time).getMonth()
        return `${day} ${month[monthIndex]}`
    })
    const options = {

        grid: { top: 8, right: 10, bottom: 24, left: 36 },
        xAxis: {
          type: 'category',
          data: timesHandler,
        },
        yAxis: {
          type: 'value',
        },
        series: [
            {
                data: data.map(d => d.orders),
                type: 'line',
                smooth: true,
                name: 'Orders',
              },
              {
                data: data.map(d => d.products),
                type: 'bar',
                smooth: true,
                name: 'Products',
              },
        ],
        tooltip: {
          trigger: 'axis',
        },
      };
      useEffect(() => {
        const handleResize = () => {
          if (chartRef.current) {
            chartRef.current.getEchartsInstance().resize();
          }
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    
  return (
    <ReactECharts ref={chartRef} option={options}/>
  )
}
