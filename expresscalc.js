const express = require('express')
const ExpressError = require('./expresscalcerrors')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//to get error for url without number parameters
app.get('/mode',function(req,res){
    throw new ExpressError("no parameters added", 404)
});

app.get('/mode/:numbers',function(req,res){
    const {numbers} = req.params;
    //creates an arr to for each default is string
    const numArray = numbers.split(',').map(Number);
    let mode = []
    const frequency = {}
    let max = 0
   
    numArray.forEach(num=>{
        
        if(isNaN(num)){ 
            console.log("is a num")
            throw new ExpressError("not a number in parameters after /mode", 403)
            }
        if(frequency[num]){
            frequency[num]++
        }else{
            frequency[num]=1;
        }
    });
    for(const num of numbers){
        if(frequency[num]>max){
            max=frequency[num]
            mode=[parseInt(num)]
        }else if(frequency[num]===max){
            mode.push(parseInt(num))
        }
       
    }
    console.log(mode.length)
    const result = {
     operation: "mode",
     value: mode
     }

 res.json (result)
    //res.send(`numbers: ${numbers}`)
})
//to get error for url without number parameters
app.get('/mean',function(req,res){
    throw new ExpressError("no parameters added", 404)
});

app.get('/mean/:numbers',function(req,res){
    const numbers = req.params.numbers.split(',').map(Number);
    for(num in numbers){
        if(isNaN(num)){ 
            console.log("is a num")
            throw new ExpressError("not a number in parameters after /mean", 403)
            }
    }
    //gets the sum of all nums in arr by using the acc with reduce method , acc starting at 0 and adding on to sum 
    const sum = numbers.reduce((acc,num)=>acc+num,0)
    //divides the sum to the length of numbers to get the mean
    const mean = sum/numbers.length
    res.json( {
    operation: "mean",
    value: mean
    })
});

//to get error for url without number parameters
app.get('/median',function(req,res){
    throw new ExpressError("no parameters added", 404)
});

app.get('/median/:numbers',function(req,res){
    //created arr seperated by ,
    const numbers = req.params.numbers.split(',').map(Number);
    for(num in numbers){
        if(isNaN(num)){ 
            console.log("is a num")
            throw new ExpressError("not a number in parameters after /median", 403)
            }
    }
    //sorts numbers arr accordingly asc in order and stores in numArray
    const numArray = numbers.sort((a,b)=>a-b)
    //median idx by dividing numbers array lemgth by 2
    const medianIdx = Math.floor(numbers.length /2)
    let median;
    
    if(numArray.length%2===0){
        median=(numArray[medianIdx -1]+numArray[medianIdx]) /2
    }else{
        median= numArray[medianIdx]
    }
    //json result with median aka the answer passed in
    const result = {
         operation:"median",
         value: median
    }
    res.json(result)
});



app.use(function handleerrors(err, req, res, next) { 
  
    let status = err.status || 500;
    let message = err.msg;
  

    return res.status(status).json({
      error: { message, status }
    });
  });


app.listen(3000,function(){
    console.log("App on port 3000")
})