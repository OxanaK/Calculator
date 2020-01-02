import React from 'react';

import './App.css';
import { timingSafeEqual } from 'crypto';
import { func } from 'prop-types';

const styleHidden={ backgroundColor: 'whitesmoke',
height: '30px',
width: '50px',
border:"1px solid whitesmoke",
visibility: "hidden"
}
const styleEqual =  { backgroundColor: '#F1EEED',
height: '30px',
width: '116px'}
const styleLetters =   { backgroundColor: '#d8d2c6',
height: '30px',
width: '50px'}
const styleOperatos =  { backgroundColor: '#ceb0b0',
height: '30px',
width: '50px'}
const styleDecimal =   { backgroundColor:'#F1EEED',
height: '30px',
width: '50px'}
const styleClear = { backgroundColor: '#EE8262',
height: '30px',
width: '50px'}
const styleFree = { visibility: 'hidden',
height: '30px',
width: '50px'}


const data = [
  {
    id: 'clear',
    text:'AC',
    rang: 7,
    style: styleClear,
    clearAll: (myState, arr, arrRang, currentArr, numbers, operations) => {
      
      myState.isCurrentPeriod= false;
      myState.display= 0;
      myState.displayCurrent=0;
     
      arr.splice(0,arr.length);
      currentArr.splice(0,currentArr.length);
      arrRang.splice(0,arrRang.length);
     numbers.splice(0,numbers.length);
     operations.splice(0,operations.length);
      
    } 
  },
  {
    id: 'clearOne',
    text:'⬅',
    style: styleClear,
    rang: 6,
    
  },
  {
    id: 'free',
    text:'',
    style:styleFree,
    rang:-1
    
  },
  {
    id: 'divide',
    text:'÷',
    style: styleOperatos,
    rang: 4
    
  },
  {
    id: 'seven',
    text:'7',
    style: styleLetters,
    rang: 2
  },
  {
    id: 'eight',
    text:'8',
    style: styleLetters,
    rang: 2
  },
  {
    id: 'nine',
    text:'9',
    style: styleLetters,
    rang: 2
    
  },
  {
    id: 'multiply',
    text:'*',
    style: styleOperatos,
    rang: 4
    
  },
{
  id: 'four',
  text:'4',
  style: styleLetters,
  rang: 2
},
{
  id: 'five',
  text:'5',
  style: styleLetters,
  rang: 2
},
{
  id: 'six',
  text:'6',
  style: styleLetters,
  rang: 2
},
{
  id: 'subtract',
  text:'-',
  style: styleOperatos,
  rang: 1
  
},
{
  id: 'one',
  text:'1',
  style: styleLetters,
  rang: 2
},
{
  id: 'two',
  text:'2',
  style: styleLetters,
  rang: 2
},
{
  id: 'three',
  text:'3',
  style: styleLetters,
  rang: 2
},
{
  id: 'add',
  text:'+',
  style: styleOperatos,
  rang: 3
  
},

{
  id: 'zero',
  text:'0',
  style: styleLetters,
  rang: 2
},

{
  id: 'decimal',
  text:'.',
  style: styleDecimal,
  rang: 0
},
{
  id: 'equals',
  text:'=',
  style: styleEqual,
  rang: 5
  
}]; 

var arr=[];
var arrRang=[];

var currentArr=[];

var numbers=[];
var operations=[];

var myState={

  isCurrentPeriod: false,

  display:0,
  displayCurrent:0 
}

function MakeSting (arr){
  var res='' ;
  for(var i=0; i<arr.length;i++)
  {
    res=res+arr[i];
  }
  return res;
}
function MakeArray (number, arr){
  var res=[] ;
  var str=number.toString();
  for(var i=0; i<str.length;i++)
  {
    res[i]=str[i];
  }

  arr.splice(0,arr.length);
  arr=res;
  return arr;

}

function MakeDisplay(){
    var displayCurrent=MakeSting(currentArr);
    var dispayString=MakeSting(arr);
      
    myState.display=dispayString;
    myState.displayCurrent= displayCurrent;
  }
function TrimNotNumbersAtEnd(){
  while(arrRang.length>0 && arrRang[arrRang.length-1]!==2){
    arr.pop();
    arrRang.pop(); 
  }
}
function AddToArrays(where1,what1, where2,what2, where3,what3 ){
where1.push(what1);
where2.push(what2);
where3.push(what3);
}

function Result(){
var res;
var oper=true;
var temp="";
for(var i=0;i<arr.length;){
  
    if(arr[i]==='-' && oper===true)
    {
    temp=temp+'-';
    oper=false;
    i++;
    }
    else if(arrRang[i]===2)
    { oper=false;
      while(arrRang[i]===2||arrRang[i]===0)
      {
      temp=temp+arr[i];
      i++;
      }
      var a=Number(temp);

            if(operations.length===0)
            {
              numbers.push(a);
            }
              else 
                {
              if((operations[operations.length-1]==='+')||
                (operations[operations.length-1]==='-')){
                numbers.push(a);
                }
              else if(operations[operations.length-1]==='*'){
                var b= numbers.pop();
                operations.pop();
                var r=a*b;
                numbers.push(r);
              }
              else{
                var b= numbers.pop();
                operations.pop();
                var r=b/a;
                numbers.push(r);
              }
            }
          temp='';
          
    }
      else if(arrRang[i]!==2 && oper===false)
      {
       operations.push(arr[i]);
       oper=true;
       i++;
      }
    {
   
  }

}
res=LastLoop();
return res;
}
function LastLoop(){
  var res;
  while(numbers.length!==1){
    var a=numbers.pop();
    var b=numbers.pop();
    var oper=operations.pop();
    if(oper==='+'){
      res=a+b;
    }
    if(oper==='-'){
      res=b-a;
    }
   numbers.push(res);
  }
  return numbers[0];
}
class Button extends React.Component {
  
handleClick=()=>{
var previousRang;
var previous;
if(currentArr.length>0){
  previous=MakeSting(currentArr);
}
else previous='';

if(arrRang.length>0)
{
  previousRang=arrRang[arrRang.length-1];}

else{
  previousRang=-1;
}

var current=this.props.text;
var currentRang=this.props.rang;

if(arrRang.length===0 && currentRang>=1 && currentRang<=2){
  AddToArrays(arr,current,currentArr, current, arrRang, currentRang);
}
if(currentRang===0){
  if(previousRang===-1){
    AddToArrays(arr,'0',currentArr, '0', arrRang, 2);
    AddToArrays(arr,'.',currentArr, '.', arrRang, 0);
    myState.isCurrentPeriod=true;
  }
  else if((myState.isCurrentPeriod===false && (previous==='0' ||previous==='-0'))||(myState.isCurrentPeriod===false && previousRang===2 )){
    AddToArrays(arr,'.',currentArr, '.', arrRang, 0);
    myState.isCurrentPeriod=true;
  }
}

if(this.props.id === "clear"){
  this.props.clearAll(myState, arr, arrRang,currentArr, numbers, operations);
  this.props.handleDisplay();
  return;
}

if((previousRang===2  && (currentRang===1 ||currentRang===3||currentRang===4))||
   (currentRang===2 && (previousRang===1||previousRang===3||previousRang===4))||
   (currentRang===1 &&(previousRang===1||previousRang===3||previousRang===4))){
     
    myState.isCurrentPeriod=false;
    currentArr=[];
    AddToArrays(arr,current,currentArr, current, arrRang, currentRang);
    myState.displayCurrent=currentArr.toString();
}
if((previousRang===2 || previousRang===0) && currentRang===2){
  AddToArrays(arr,current,currentArr, current, arrRang, currentRang);
  myState.displayCurrent=currentArr.toString();
}
if((previousRang===0 && (currentRang===1 ||currentRang===3||currentRang===4))||
((currentRang===3||currentRang===4)&&(previousRang===1||previousRang===3||previousRang===4))){

  arr.pop();
  arrRang.pop();
  currentArr=[];
  AddToArrays(arr,current,currentArr, current, arrRang, currentRang);
  myState.displayCurrent=currentArr.toString();
}
if(this.props.id ==='equals'){
  TrimNotNumbersAtEnd();
  
  var res=Result();
  arr.push('=');
  arr.push(res);
  MakeDisplay();
  myState.displayCurrent=numbers[0].toString();
  this.props.handleDisplay();
  return;

}
    MakeDisplay();
  this.props.handleDisplay();
 }
 
 render() {
   return (
     <div className="buttons" 
         style={this.props.style}
         id={this.props.id}
         onClick={this.handleClick}
     >
       <h2>{this.props.text}</h2>
       
     </div>
   )
 }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: '0',
      displayCurrent: '0'
    }
  }

  handleDisplay=()=>{
    this.state.display=myState.display;
    this.state.displayCurrent=myState.displayCurrent;
     this.setState({});
  }

  
     render(){
       return( 
         <div id="all"> 
         <div id="display" >
         <div id='displayAll' className="displayText" >{this.state.display}</div>
         <div id='displayCurrent' className="displayText">{this.state.displayCurrent}</div>
         </div>
         <div id="calculator" >
        {data.map(b => (
           
          <Button 
          key={b.id}
          id={b.id}
          text={b.text}
          style={b.style}
          rang={b.rang}
          clearAll={b.clearAll}
          handleDisplay={this.handleDisplay}
          />
        
         ))} 
         </div>
         </div>
    
    )
  }
}

export default App;
