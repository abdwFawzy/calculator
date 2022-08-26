const add = (n, m) =>  n + m
const substract = (n, m) =>  n - m
const divide = (n, m) => Math.round(n / m)
const multiply = (n, m) =>  n * m
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
const calculator = document.querySelector('[data-action="calculate"]')
display.textContent = '';
const keys = document.querySelector('.calculator__keys');
let last = display.textContent.slice(-1);
keys.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        console.log(last)
        let key = e.target; 
        if(key.dataset.type){
            if(!display.textContent)
            {
                opreatorKeys.forEach((item) => {item.desabled = true});
                last = display.textContent.slice(-1);
            }
            else if(opreators.includes(last)){
                opreatorKeys.forEach((item) => {item.desabled = true});
                last = display.textContent.slice(-1);
            }
            else if(!isNaN(last)){

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
                last = display.textContent.slice(-1);
            }
            
        }
        else if (!key.dataset.action) {
            if (!display.textContent) {
                opreatorKeys.forEach((item) => {item.desabled = false}); 
                display.textContent = key.textContent;
                last = display.textContent.slice(-1);
            }
            else if (!isNaN(last)){
                display.textContent += key.textContent;
                last = display.textContent.slice(-1);
            }
            else if(opreators.includes(last)){
                opreatorKeys.forEach((item) => {item.desabled = false});
                display.textContent += key.textContent;    
                last = display.textContent.slice(-1);
            }
        }
        else if (key.dataset.action == 'calculate') {
            if(!last)
            {
                calculator.desabled = true;
            }
            else if (opreators.includes(last))
            {
                calculator.desabled = true;
            }
            else if (!isNaN(last))
            {
                if (opreator) {
                    number2 = display.textContent.match(/\d+/g)[1];
                    number2 = parseInt(number2);
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
            if (opreators.includes(last)) {
                opreatorKeys.forEach((item) => {item.desabled = false});
                last = display.textContent.slice(-1);
            }
            display.textContent = display.textContent.removeCharAt(string);
            last = display.textContent.slice(-1);
            opreator = "";
        }
    }
})
