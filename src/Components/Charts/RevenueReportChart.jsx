import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { Bar, Line } from 'react-chartjs-2';
import React from 'react'


export default function RevenueReportChart({apiData=[]}) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const dataGategorie = [
            {
                name: "Pending",
                value: 40,
                color: "#20a4f3",
              },
              {
                name: "Confirmed",
                value: 19,
                color: "#2ec4b6",
              },
              {
                name: "Shipped",
                value: 41,
                color: "#ffe66d",
              },
              {
                name: "Delivered",
                value: 9,
                color: "#F653A6",
              },
              {
                name: "Cancelled",
                value: 10,
                color: "#EE204E",
              },
              {
                name: "On Hold",
                value: 10,
                color: "#BEBFC5",
              },
              {
                name: "Delayed",
                value: 13,
                color: "#FF7538",
              },
              {
                  name: "Returned",
                  value: 4,
                  color: "#9966CC",
                },
               
          ];
        
        // let nowMonth = months[new Date(apiData.month).getMonth()] + " - " + new Date(apiData.month).getFullYear()
        const chart_data = {
            labels: apiData.map(d => new Date(d?.date).getDate()), //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: "Sales",
                data: apiData.map(d => d?.total_revenue), // [12, 19, 3, 5, 2, 3, 8],
                // borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor:  dataGategorie.map((data) => data.color), //"#2ec4b6"// 'rgba(75, 192, 192, 0.2)',
              },
            ],
          };
        
          const options = {
            // Customize chart options here
          };
        
          return <Line data={chart_data} options={options} />;
}