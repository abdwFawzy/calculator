const add = (n, m) =>  n + m;
const substract = (n, m) =>  n - m;
const divide = (n, m) => Math.round(n / m);
const multiply = (n, m) =>  n * m;
String.prototype.removeCharAt = function (i) {
    var tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}   
const opreators = ['+', '-', '÷', '×'];
let number1;
let opreator;
let number2;
function operate(n, opreator, m) {
    if (opreator == '+')
    {
        return add(n, m)
    }else if (opreator == '-') {
        return substract(n, m)
    }else if (opreator == '÷'){
        return divide(n, m)
    }else if (opreator == '×'){
        return multiply(n, m)
    }
}
const display =  document.querySelector('#display');
const opreatorKeys = document.querySelectorAll('[data-action]'); 
const calculator = document.querySelector('[data-action="calculate"]');
display.textContent = '';
const keys = document.querySelector('.calculator__keys');
let lastIndex = display.textContent.slice(-1);
//  listin to the user input
keys.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        let key = e.target; 
        // if the user input opreator 
        if(key.dataset.type){
            // after blank text
            if(!display.textContent)
            {
                opreatorKeys.forEach((item) => {item.desabled = true});
                lastIndex = display.textContent.slice(-1);
            }
            // after opreator
            else if(opreators.includes(lastIndex)){
                opreatorKeys.forEach((item) => {item.desabled = true});
                lastIndex = display.textContent.slice(-1);
            }
            // after number 
            else if(!isNaN(lastIndex)){
                // if there was number + opreator + number then opreator go here 
                if(opreator){
                    let str = display.textContent;
                    number2 = str.match(/\d+/g)?.[1];
                    number2 = parseInt(number2);
                    if (number2 == 0 && opreator == "÷") { 
                        display.textContent = 0
                    }
                    else{
                        number1 = operate(number1, opreator, number2);
                        opreator = key.textContent;
                        display.textContent = number1;
                    }
                    
                }
                number1 =parseInt(display.textContent);
                opreator = key.textContent;
                display.textContent += key.textContent;
                lastIndex = display.textContent.slice(-1);
            }
            
        }
        // if the user input number 
        else if (!key.dataset.action) {
            // after blank text
            if (!display.textContent) {
                opreatorKeys.forEach((item) => {item.desabled = false}); 
                display.textContent = key.textContent;
                number1 = display.textContent;
                lastIndex = display.textContent.slice(-1);
            }
            // after number 
            else if (!isNaN(lastIndex)){
                display.textContent += key.textContent;
                lastIndex = display.textContent.slice(-1);
            }
            //after opreator
            else if(opreators.includes(lastIndex)){
                opreatorKeys.forEach((item) => {item.desabled = false});
                display.textContent += key.textContent;    
                lastIndex = display.textContent.slice(-1);
            }
        }
        else if (key.dataset.action == 'calculate') {
            if(!lastIndex)
            {
                calculator.desabled = true;
            }
            //desable = if the last index is opreator
            else if (opreators.includes(lastIndex))
            {
                calculator.desabled = true;
            }
            else if (!isNaN(lastIndex))
            {
                if (opreator) {
                    number2 = display.textContent.match(/\d+/g)[1];
                    number2 = parseInt(number2);
                    //redundant code
                    if (number2 == 0 && opreator == "÷") { 
                        display.textContent = 0;
                        number1 = 0;
                    }
                    else{
                        number1 = operate(parseInt(number1), opreator, number2);
                        display.textContent = number1; 
                        number1 = '';
                        
                    }
                    number2 = '';
                    opreator = '';   
                }
                
            }
        }
        else if (key.dataset.action == 'clear')
        {
            display.textContent = "";
        }
        else if (key.dataset.action == 'delete')
        {
            let string = display.textContent.length;
            if (opreators.includes(lastIndex)) {
                opreatorKeys.forEach((item) => {item.desabled = false});
                lastIndex = display.textContent.slice(-1);
            }
            display.textContent = display.textContent.removeCharAt(string);
            lastIndex = display.textContent.slice(-1);
            opreator = "";
        }
    }
})
