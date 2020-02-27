import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Button} from 'semantic-ui-react';

const Chart=(props)=>{
  console.log(props);
  
  //console.log(options);

  var tasks = [];
 
// options.forEach(function (option) {
 
//     tasks.push(option.option);
     
// });

console.log(tasks);

  /**var chartData1= {     
    labels: options.map(option => option.option),
    datasets:[
      {
        label: question,      
        data: options.map(option => option.votes)
      }
    ]                     
  };  ***/
  
  return(
    <div> {props.poll.question}</div>
  );
}
export default Chart;
