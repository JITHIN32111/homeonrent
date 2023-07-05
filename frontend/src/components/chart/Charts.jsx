
import { useEffect, useState } from 'react';
// import { Chart } from "react-google-charts";
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';


function Charts({  approvedPropertyCount, pendingPropertyCount,type4BHKCount,type3BHKCount,type2BHKCount }) {
 

  // const bdata = [
  //   ["Type", "Number"],
  //   ["4BHK", type4BHKCount],
  //   ["3BHK", type3BHKCount],
  //   ["2BHK", type2BHKCount],
  // ];
  
  //  const boptions = {
  //   chart: {
  //     title: "Types of Properties",
  //     subtitle: "3Bhk, 4Bhk, 2Bhk",
  //   },
  // };
  
  //  const data = [
  //   ["Status", "Hours per Day"],
  //   ["Approved", approvedPropertyCount],
  //   ["Pending", pendingPropertyCount],
  // ];
  
  //  const options = {
  //   title: "Property Status",
  //   colors: ['#3366CC', '#DC3912'],
  // };

  const cseries = [approvedPropertyCount, pendingPropertyCount];
  const coptions = {
  chart: {
    type: 'pie',
  },
  labels: ["approved", "pending", ],
  theme: {
      monochrome: {
          enabled: true,
        }
    },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5
      }
    }
  },
  title: {
    text: "Status"
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.bseriesIndex]
      return [name, val.toFixed(1) + '%']
    }
  },
  legend: {
    show: false
  }

}
const series = [{
  data: [type4BHKCount, type3BHKCount, type2BHKCount]
}];
const options = {
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['4BHK','3BHK', '2BHK', 
    ],
  }
};
  return (
    <div className="bg-white p-2 rounded shadow w-full "> {/* Set the desired width */}
    <div className="w-full flex items-center   bg-white  relative  flex-col xl:flex-row mx-auto">
      <div id="chart" className="w-2/1 mx-auto">
        <ReactApexChart options={coptions} series={cseries} type="pie" />
      </div>
      <div id="chart" className="w-2/1 mx-auto">
      <ReactApexChart options={options} series={series} type="bar" height={250} />
      </div>
    </div>
    
      
    </div>
  )
}

export default Charts

