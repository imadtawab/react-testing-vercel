import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

export default function SalesReportCharts({apiData = []}) {
  // console.log(apiData.map(d => d?.date));
    
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // let nowMonth = months[new Date(apiData.month).getMonth()] + " - " + new Date(apiData.month).getFullYear()
    const chart_data = {
        labels: apiData.map(d => new Date(d?.date).getDate()),
        datasets: [
          {
            label: 'Orders',
            data: apiData.map(d => d?.number_of_orders),
            // borderColor: "#2ec4b6",
            backgroundColor: "#2ec4b6",
            order: 1
          },
          {
            label: 'Products',
            data: apiData.map(d => d?.number_of_products),
            borderColor: "#3fd5c7",
            backgroundColor: "transparent",
            // backgroundColor: "#2ec4e6",
            type: 'line',
            order: 0,
          },
        ],
      };
    const options = {
    };
    return <Bar data={chart_data} options={options}/>;
}