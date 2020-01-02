import React from 'react';

import './App.css';
import { timingSafeEqual } from 'crypto';

const styleHidden={ backgroundColor: 'whitesmoke',
height: '30px',
width: '50px',
border:"1px solid whitesmoke",
visibility: "hidden"
}
const styleEqual =  { backgroundColor: '#DFFFBF',
height: '30px',
width: '116px'}
const styleLetters =   { backgroundColor: '#F1EEED',
height: '30px',
width: '50px'}
const styleOperatos =  { backgroundColor: '#B5B3B2',
height: '30px',
width: '50px'}
const styleDecimal =   { backgroundColor:'#F1EEED',
height: '30px',
width: '50px'}
const styleClear = { backgroundColor: '#FFC0B3',
height: '30px',
width: '50px'}

const mydata = [
  {
    id: 'clear',
    text:'AC',
    style: styleClear,
    clearAll: (myState, arr1, arr2) => {
      myState.number1=0;
      myState.sign1=1;

      myState.number2=0;
      myState.sign2=1;

      myState.operation='';
      myState.current='num1';
      arr1.splice(0,arr1.length);
      arr2.splice(0,arr2.length);
      myState.display=0;
    }
  },
  {
    id: 'clearOne',
    text:'⬅',
    style: styleClear
    
  },
  {
    id: 'sign',
    text:'±',
    style: styleOperatos
    
    
  },
  {
    id: 'divide',
    text:'÷',
    style: styleOperatos
    
  },
  {
    id: 'seven',
    text:'7',
    style: styleLetters
  },
  {
    id: 'eight',
    text:'8',
    style: styleLetters
  },
  {
    id: 'nine',
    text:'9',
    style: styleLetters
    
  },
  {
    id: 'multiply',
    text:'*',
    style: styleOperatos
    
  },
{
  id: 'four',
  text:'4',
  style: styleLetters
},
{
  id: 'five',
  text:'5',
  style: styleLetters
},
{
  id: 'six',
  text:'6',
  style: styleLetters
},
{
  id: 'subtract',
  text:'-',
  style: styleOperatos
  
},
{
  id: 'one',
  text:'1',
  style: styleLetters
},
{
  id: 'two',
  text:'2',
  style: styleLetters
},
{
  id: 'three',
  text:'3',
  style: styleLetters
},
{
  id: 'add',
  text:'+',
  style: styleOperatos
  
},

{
  id: 'zero',
  text:'0',
  style: styleLetters
},

{
  id: 'decimal',
  text:'.',
  style: styleDecimal
  
},
{
  id: 'equals',
  text:'=',
  style: styleEqual
  
}]; 

var arr1=[];
var arr2=[];

var myState={current: 'num1',
number1: 0,
sign1: 1,
operation: '',
number2: NaN,
sign2: 1,
display:0,
result: 0,
isPeriod1: false,
isPeriod2: false
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
    var dispayText;
    var currentNum;
    var currentSign;

    if(myState.current==='result'){
          if(myState.result<0)
          {
            myState.sign1=-1;
            myState.number1=myState.result*(-1);
          }
          else{
            myState.sign1=1;
            myState.number1=myState.result;
          }
          myState.current='num1';
          currentNum = myState.number1;
          currentSign = myState.sign1;
        }
        else if(myState.current==='num1') {
          currentNum = myState.number1;
          currentSign = myState.sign1;
        } else if (myState.current==='num2') {
          currentNum = myState.number2;
          currentSign = myState.sign2;
        } else {
          return;
        }

    if(Number.isFinite(currentNum) && !Number.isNaN(currentNum)) {
      dispayText=currentSign*currentNum;
    } else {
      dispayText = "Error";
    }
      
    myState.display=dispayText;
  }

  
class myButton extends React.Component {
  
handleClick=()=>{
 
  if(this.props.id ==="sign" && myState.current==='num1'){
    myState.sign1= -1;
  }
  if(this.props.id ==="sign" && 
  myState.operation!==''  && myState.current!=='num2' ){
    myState.sign2=-1;
  }

  if(this.props.id ==='decimal' ){
   
    if(myState.current==='num1' && myState.isPeriod1===false){
      myState.isPeriod1=true;
      var temp=myState.number1.toString();
        if(temp.length<9)
        {
          arr1.push(this.props.text);
          var t=MakeSting(arr1);
         
        }
         
    }
    else
    if(myState.current==='num2'&& myState.isPeriod2===false){
      myState.isPeriod2=true;
      myState.current='num2';
      var temp=myState.number2.toString();
      if(temp.length<9)
        {
          arr2.push(this.props.text);
          var t=MakeSting(arr2);
        }
    }

  }
  if((this.props.id ==="divide"|| 
     this.props.id ==="add"||
     this.props.id ==="multiply"||
     this.props.id ==="subtract" ) 
     && myState.current==='num1' )
    {
      myState.operation=this.props.text;
        myState.current='oper';
    }

    else if(this.props.id ==="subtract" 
            && myState.operation!=='')
            {
              myState.sign2=-1;
              myState.current='oper';
            }
          else if((this.props.id ==="divide"|| 
                this.props.id ==="add"||
                this.props.id ==="multiply"
                ) 
                && myState.current==='oper'
                ){
                      myState.operation=this.props.text;
                  }
   
  
  var num = Number(this.props.text);
  if(!Number.isNaN(num)) 
  {
    if(myState.current==='num1'){
      var temp=myState.number1.toString();
        if(temp.length<9)
        {
          arr1.push(this.props.text);
          var t=MakeSting(arr1);
          myState.number1=Number(t);
        }
         
    }
    else
    if(myState.current==='oper'||myState.current==='num2'){
 
      myState.current='num2';
      var temp=myState.number2.toString();
      if(temp.length<9)
        {
          arr2.push(this.props.text);
          var t=MakeSting(arr2);
          myState.number2=Number(t);
        }
    }
  }

  
  if(this.props.id ==='equals'){

    var result;
    var a=myState.number1*myState.sign1;
    var b;
    
        if(Number.isNaN(myState.number2) && myState.operation!=''){
          b=a;
        }
        else if(myState.number2!==NaN ){
          b=myState.number2*myState.sign2;
        }
          else{
            b=NaN;
          }
        var oper=myState.operation;
            switch(oper){
              case '-':
                  result=a-b;
                  break;
              case '+':
                      result=a+b;
                      break;
              case '*':
                  result=a*b;
                  break;
              case '÷':
                  result=a/b;
                  break;           
            }

    var str=result.toString();
    /*if(str.indexOf('.')>-1)
    {
      result=Math.floor(result*10000)/10000;
      alert(result);
    }
    */
    myState.result=result;
    alert( myState.result);
    myState.number1=result;

    MakeArray(myState.result,arr1);

    myState.current='num1';
  }

  if(this.props.id === "clear"){
    this.props.clearAll(myState, arr1, arr2);
  }

  if(this.props.id === "clearOne"){
    if(myState.current==='num1')
      {
       arr1.pop();
       var t=MakeSting(arr1);
       myState.number1=Number(t);
       myState.display=myState.number1;
     
      }
      if(myState.current==='num2')
      {  arr2.pop();
         var t=MakeSting(arr2);
         myState.number2=Number(t);
         myState.display=myState.number2;
      }
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

class myConst extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: '0'
     
    }
  }

  handleDisplay=()=>{
    this.state.display=myState.display;
  
     this.setState({});
  }

  
     render(){
       return( 
         <div id="all"> 
         <div id="display" className="displayText">{this.state.display}</div>
         <div id="calculator" >
        {data.map(b => (
           
          <Button 
          key={b.id}
          id={b.id}
          text={b.text}
          style={b.style}
          clearAll={b.clearAll}
          handleDisplay={this.handleDisplay}
          />
        
         ))} 
         </div>
         </div>
    
    )
  }
}

export default myConst;
