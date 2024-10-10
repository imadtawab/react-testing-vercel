import ReactECharts from 'echarts-for-react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function RevenueReportChart({data=[]}) {
    const chartRef = useRef(null);
    let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const timesHandler = data.map(d => {
        let day = new Date(d.time).getDate()
        let monthIndex = new Date(d.time).getMonth()
        return `${day} ${month[monthIndex]}`
    })
    const options = {

        grid: { top: 8, right: 10, bottom: 24, left: 46 },
        xAxis: {
          type: 'category',
          data: timesHandler,
        },
        yAxis: {
          type: 'value',
          data: data.map(d => d.revenue)
        },
        series: [
              {
                data: data.map(d => d.revenue),
                type: 'line',
                smooth: true,
                name: 'Revenue (MAD)',
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
