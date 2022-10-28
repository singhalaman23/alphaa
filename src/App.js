import './App.css';
import * as echarts from 'echarts';
import React,{useState,useEffect} from 'react';


function App() {
  const [mydata,setData]=useState([]);
  const getData=()=>{
    fetch('https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson.data)
      });
  }
  
  useEffect(()=>{
    getData()
  },[])

  const xAxixName = mydata.map(item => {
    return item.subcategory;
  })
  const xAxisData = mydata.map(item=>{
    return item.d__2022sale - item.d__2021sale;
  })
  let sum = 0;
  for(let i=0; i<xAxisData.length; i++){
    sum = xAxisData[i];
  }




  // initialize the echarts instance
var myChart = echarts.init(document.getElementById('main'));
window.onresize = function() {
  myChart.resize();
};
// Draw the chart
myChart.setOption({
  title: {
    text: 'Accumulated Waterfall Chart'
  },
  tooltip: {},
  xAxis: {
    data: xAxixName
  },
  yAxis: {},
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: xAxisData
    }
  ]
});
  return (
    <div className="App">
      <h2>Net Change = {sum}</h2>
    </div>
  );
}

export default App;
