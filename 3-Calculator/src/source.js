////////////////////////////////////
// Parameter Definition

// Dom Parameters
let operators = document.querySelectorAll(".cl-operator");
let numbers = document.querySelectorAll(".cl-numbers");
let equalSign = document.querySelector("#equalSign");
let resultDom = document.querySelector("#result");
let clearAllDom = document.querySelector("#clearAll");


// Calculator Parameter
let result = 0;
let terms = [0,0];
let operand = "";
let termStr = "";
let index = 0;
let minesCount = 0;



// Parameter Definition
////////////////////////////////////


////////////////////////////////////
// Functions


// Assign Event to Opernad Btns
operators.forEach(operator =>{
    operator.addEventListener("click", ()=>{
        
        operand = operator.value;
        runOperators();
              
    });
});

// Assign Event to numbers Btns
numbers.forEach(number =>{
    number.addEventListener("click", ()=>{

        termStr += number.value;
        resultDom.innerHTML = termStr;
         
    });
});

//Assign Event to equal operand
equalSign.addEventListener("click" , ()=>{

    runOperators();
 
});


// Clear All Function
clearAllDom.addEventListener("click", () =>{
    
    resultDom.innerHTML = "0";
    resetParameters();

});


// Calculate Result Function
function calculateResult(){

    // Select Operator
    switch(operand){

        case '+':{
            result = terms[0] + terms[1];
            break;
        }

        case '-':{
            result = terms[0] - terms[1];
            break;
        }

        case 'x':{
            result = terms[0] * terms[1];
            break;
        }

        case '÷':{
            
            if(terms[1] != 0){
                result = terms[0] / terms[1];
            }
            else{
                
                resetParameters();
                resultDom.innerHTML = "Error!"
                
                return;
            
            }
            break;
        }

        default:{
            
            break;
        }
    }

    // Assign Parameter
    terms = [0,0];
    terms[0] = result;
    resultDom.innerHTML = `${result.toFixed(2)}`;
}


// Reset Parameters
function resetParameters()
{
    result = 0;
    terms = [0,0]; 
    operand = "";
    termStr = "";
    index = 0;

}

// Operetors Function
function runOperators(){

        try{    
                if(operand == "-"){
                    if(minesCount == 0){
                        termStr = "-" + termStr;
                        resultDom.innerHTML = termStr;
                        minesCount++;
                        return;
                    }
                }
                else{
                    minesCount = 0;
                }

                if(termStr != "" && termStr != "-"){
                    terms[index] = Number(termStr);
                    termStr = "";
                    if(index == 1){calculateResult();}
                    index = 1; 
                } 
        }
        catch (error){
            resetParameters();
        }
          
}

// Functions
///////////////////////////////////
