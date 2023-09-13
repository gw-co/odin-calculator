let currentvalue = document.querySelector('.current-value');
let prev = document.querySelector('.prev');
let screenvalue = '';
let ans = 0, num1 = 0, num2 = 0, operation = 'started';
let isdecimal = false, isnegative = false;

document.onkeydown = function(e){
    let key = e.key;
    switch (key){
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
        case 'n':
        case '.':
        case '+': case '-': case '*': case '/': case '^':
        case '=':
            buttonfunc(key);
            break;
        case 'Enter':
            buttonfunc('=');
            break;
        case 'Backspace':
            buttonfunc('b');
            break;
        case 'Escape':
            buttonfunc('A');
        break;
        default:
            break;
    }
}

function buttonfunc(v, thisbutton){
    // console.log(v);
    if(operation = 'started'){
        operation = '';
        prev.textContent = '';
    }
    switch (v){
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':{
            if(screenvalue == '')
                screenvalue = v.toString();
            else{
                screenvalue += v;
                if(screenvalue == '00')
                    screenvalue = '0';
                if(screenvalue == '-00')
                    screenvalue = '-0';
            }
            setscreenvalue(screenvalue);
            break;
        }
        case 'n':{
            if(!isnegative){
                screenvalue = '-' + screenvalue;
                isnegative = true;
            }
            else{
                screenvalue = screenvalue.slice(1);
                isnegative = false;
            }
            setscreenvalue(screenvalue);
            break;
        }
        case '.':{
            if(!isdecimal){
                if(screenvalue == '') screenvalue = '0';
                screenvalue += '.';
                isdecimal = true;
            }
            setscreenvalue(screenvalue);
            break;
        }
        case '+': case '-': case '*': case '/': case '^':{
            // console.log('operating  ' + screenvalue);
            if( operation == '' || operation == '='){ // on startup or all clear
                if(operation == '' && screenvalue == '') return;
                if(screenvalue == '')
                    num1 = ans;
                else
                    num1 = Number(screenvalue);
                if(isNaN(num1) || !isFinite(num1)){
                    num1 = 0;
                    return;
                }
                isdecimal = false;
                isnegative = false;
                operation = v;
                screenvalue = '';
                setscreenvalue('');
                prev.textContent = num1 + ' ' + operation;
            }
            else{
                if(screenvalue == ''){
                    operation = v;
                    prev.textContent = num1 + ' ' + operation;
                }
                else{
                    num2 = Number(screenvalue);
                    if(isNaN(num2)) num2 = 0;
                    process();

                    setscreenvalue('');
                    screenvalue = '';
                    num1 = ans;
                    
                    operation = v;
                    prev.textContent = num1 + ' ' + operation;
                }
            }
            return;
        }
        case '=':{
            if(operation == '' || operation == '=' || screenvalue == '')return;
            num2 = Number(screenvalue);
            if(isNaN(num2)) num2 = 0;
            if(operation == '/' && num2 == 0){
                isdecimal = false;
                isnegative = false;
                prev.textContent = num1 + ' ' + operation + ' ' + num2;
                setscreenvalue('not this one.');
            }
            else{
                prev.textContent = num1 + ' ' + operation + ' ' + num2;
                process();
                setscreenvalue(ans.toString());
            }
            screenvalue = '';
            num1 = 0;
            num2 = 0;
            operation = '=';
            return;
        }
        case 'b':{
            if(operation == '='){
                buttonfunc('A');
                return;
            }
            if(screenvalue.at(-1) == '.') isdecimal = false;
            if(screenvalue.at(-1) == '-') isnegative = false;
            screenvalue = screenvalue.slice(0, -1);
            setscreenvalue(screenvalue);
            break;
        }
        case 'A':{
            //reset
            setscreenvalue('');
            prev.textContent = '';
            screenvalue = '';
            val1 = 0;
            val2 = 0;
            ans = 0;
            isdecimal = false;
            isnegative = false;
            operation = '';
            break;
        }
    }
    if(operation == '=') prev.textContent = '';
}

function process(){
    if(screenvalue == '') return;
    if(screenvalue == '-') screenvalue = '0';
    switch (operation){
        case '+':{
            ans = num1 + num2;
            break;
        }
        case '-':{
            ans = num1 - num2;
            break;
        }
        case '*':{
            ans = num1 * num2;
            break;
        }
        case '/':{
            ans = num1 / num2;
            break;
        }
        case '^':{
            ans = Math.pow(num1, num2);
            break;
        }
    }
    // console.log(num1, num2, operation, ans);
    isdecimal = false;
    isnegative = false;
}

function setscreenvalue(value){
    if(value.length > 20)
        currentvalue.style.fontSize = (800 / value.length).toString()+'px';
    else
        currentvalue.style.fontSize = '40px';        
    if(value == ''){
        currentvalue.textContent = '0';
    }
    else if(value == '-'){
        currentvalue.textContent = '-0';
    }
    else{
        currentvalue.textContent = value;
    }
}
