
const inputDisplay = document.querySelector('input');

document.querySelectorAll('.num__key').forEach(key =>{

    key.onclick = () => {

        inputDisplay.value = inputDisplay.value !== "0" ? inputDisplay.value + key.innerText : key.innerText;
    };
});


const buffer = [];
 
const opCallback = opName => function(){

    let currentValue = parseFloat(inputDisplay.value);

    if (opName === "percent"){

        currentValue *= 0.01;
        inputDisplay.value = currentValue;
    }

    else{

        if(buffer && buffer.length){
        //⚡ if there is something inside the buffer[]
            
            buffer.push({value: currentValue});
            const result = evaluate(buffer);

            buffer.push({value: result});
            buffer.push({value: opName});

            inputDisplay.value = "";

        }

        else{
        //⚡ if there is something inside the buffer[]

            buffer.push({value: currentValue});
            buffer.push({value: opName});

            inputDisplay.value = "";
        }

    }

};


const evaluate = buffer =>{

    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;


    switch (operator) {
        case "add":
                return firstOperand + secondOperand;
            break;
        case "subtract":
                return firstOperand - secondOperand;
            break;
        case "multiply":
                return firstOperand * secondOperand;
            break;
        case "divide":
                return firstOperand / secondOperand;
            break;
    
        default:
            return secondOperand;
            break;
    }

}


for (const opName of ['add', 'subtract', 'multiply', 'divide', 'percent']){

    document.querySelector(`.op__key[op=${opName}]`).onclick = opCallback(opName);
}
 

document.querySelector(".eq__key").onclick = function(){

    buffer.push({value: parseFloat(inputDisplay.value)});
    inputDisplay.value = evaluate(buffer);
};

document.querySelector(".op__key[op=clear]").onclick = function(){

    inputDisplay.value = 0;
    buffer.length = 0;
}

document.querySelector(".op__key[op=negate]").onclick = function(){

    inputDisplay.value = -parseFloat(inputDisplay.value);
}

