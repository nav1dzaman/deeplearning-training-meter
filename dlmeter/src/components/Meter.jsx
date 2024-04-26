import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
function Meter() {

  const[data,setData]=useState([]);
  const[testAccuracy,setTestAccuracy]=useState(0);
  const[trainAccuracy,setTrainAccuracy]=useState(0);
  const[epoc,setEpoc]=useState(0);
  const[topTestAccuracy,setTopTestAccuracy]=useState(0);
  const[pathvalue,setPathvalue]=useState("")

  useEffect(()=>{
    const fetchProducts= async()=>{
      const response= await fetch("http://localhost:3000/data");
      const datas=await response.json();
      setData(datas);
    
      let num=datas[datas.length-1].accuracy*100;
      let testAccu=Math.round(num * 10 ** 2) / 10 ** 2;
      setTestAccuracy(testAccu);
     

      let num2=datas[datas.length-1].val_accuracy*100;
      let trainAccu=Math.round(num2 * 10 ** 2) / 10 ** 2;
      setTrainAccuracy(trainAccu);

     
      setEpoc(datas[datas.length-1].epoch);
   
      console.log(datas);
    }
    fetchProducts();
    const intervalId = setInterval(fetchProducts, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
      
  },[])

  useEffect(()=>{
    if(trainAccuracy>topTestAccuracy){
      setTopTestAccuracy(trainAccuracy);
    }
  },[trainAccuracy])


  const handleclick=()=>{
    setData([]);
  }

  

  const handleSubmit=(e)=>{
        
     e.preventDefault();
     fetch('http://localhost:3000/pathvalue', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(pathvalue)
    })
    .then(()=>{
      console.log("done");
    })
     
     


  }

  const handlePath=(e)=>{
        setPathvalue(e.target.value);
  }



  return (
    <div>
      

        <div className='text-3xl m-[40px] flex gap-8  justify-center'>
           <p>Train Accuracy: {testAccuracy} %</p>  
           <p>Validation Accuracy: {trainAccuracy} %</p>
           <p>Epoch: {epoc} </p>
        </div>
        <div className='text-center'>
          <p>Top valdiation Accuracy: {topTestAccuracy}</p>
        </div>

        <div  className='text-center'>
          <p>Total Data {data.length}</p>
          <button className='bg-gray-100 p-1' onClick={handleclick}>Clear</button>
          
          {/* {data.map((epoc)=>(
            <h3 id={epoc.epoch}>{epoc.epoch} - {epoc.val_accuracy}</h3>
          ))} */}

       <div className='max-w-[40%] h-80 flex gap-8 mx-[10%]'>

       <Line
          data={{
            labels: data.map((datas) => datas.epoch),
            datasets: [
              {
                label: "Validation Accuracy",
                data: data.map((datas) => datas.val_accuracy),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
                pointRadius: 1,
              },
              {
                label: "Train Accuracy",
                data: data.map((datas) => datas.accuracy),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
                pointRadius: 1,
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.1,
              },
            },
            plugins: {
              title: {
                text: "Validation and Train Accuracy",
              },
            },
          }}
        />

<Line
          data={{
            labels: data.map((datas) => datas.epoch),
            datasets: [
              {
                label: "Validation loss",
                data: data.map((datas) => datas.val_loss),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
                pointRadius: 1,
              },
              {
                label: "Train loss",
                data: data.map((datas) => datas.loss),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
                pointRadius: 1,
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.1,
              },
            },
            plugins: {
              title: {
                text: "Validation and Train Loss",
              },
            },
          }}
        />
       </div>




        </div>

        <div className='max-w-[600px] border p-[4px]'>
          <form onSubmit={handleSubmit}>

          <input type="text" name='pathdata' onChange={handlePath} placeholder="Type here" className="input input-bordered input-info w-full max-w-[600px]" />

          <button>Submit</button>

          </form>
        
       </div>


    </div>
  )
}

export default Meter