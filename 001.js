const add = (n, m) =>  n + m
const substract = (n, m) =>  n - m
const divide = (n, m) => Math.round(n / m)
const multiply = (n, m) =>  n * m
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

                if(number1 && opreator){
                    let str = display.textContent;
                    number2 = str.match(/\d+/g)?.[1];
                    number2 = parseInt(number2);
                    number1 = operate(number1, opreator, number2);
                    opreator = key.textContent;
                    display.textContent = number1;
                }
                number1 =parseInt(display.textContent);
                opreator = key.textContent;
                display.textContent += key.textContent;
                last = display.textContent.slice(-1);
            }
            
        }
        if (!key.dataset.action) {
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
        
        }
    })
