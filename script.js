let currentvalue = document.querySelector('.current-value');
let prev = document.querySelector('.prev');
let screenvalue = '';
let ans = 0, num1 = 0, num2 = 0, operation = 'started';
let isdecimal = false, isnegative = false;

document.onkeydown = function(e){
    let key = e.key;
    if(key == 'Enter' || key == ' ')e.preventDefault();
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
    if(operation == 'started'){
        operation = '';
        setprev('');
    }
    if(operation == 'nan'){
        operation = '/';
        setprev(num1 + ' ' + operation);
        setscreenvalue(screenvalue);
    }
    switch (v){
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':{
            if(screenvalue == '' || screenvalue == '0')
                screenvalue = v;
            else if(screenvalue == '-0')
                screenvalue = '-' + v;
            else{
                screenvalue += v;
            }
            if(screenvalue == '00') screenvalue = '0';
            if(screenvalue == '-00') screenvalue = '-0';
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
            break;
        }
        case '.':{
            if(!isdecimal){
                screenvalue += '.';
                isdecimal = true;
            }
            if(screenvalue == '.') screenvalue = '0.';
            if(screenvalue == '-.') screenvalue = '-0.';
            break;
        }
        case 'b':{
            if(screenvalue.at(-1) == '.') isdecimal = false;
            if(screenvalue.at(-1) == '-') isnegative = false;
            screenvalue = screenvalue.slice(0, -1);
            break;
        }
        case '+': case '-': case '*': case '/': case '^':{
            if(operation == '' && screenvalue == '') return;
            if( operation == '' || operation == '='){
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
            }
            else{
                if(screenvalue !== ''){
                    num2 = Number(screenvalue);
                    if(isNaN(num2)) num2 = 0;
                    if(operation == '/' && num2 == 0){
                        setprev(num1 + ' ' + operation + ' ' + num2);
                        setscreenvalue('not this one.');
                        operation = 'nan';
                        return;
                    }
                    else{
                        process();
                        num1 = ans;
                    }
                }
            }
            screenvalue = '';
            setscreenvalue('');
            operation = v;
            setprev(num1 + ' ' + operation);
            return;
        }
        case '=':{
            if(operation == '' || operation == '=' || screenvalue == '')return;
            num2 = Number(screenvalue);
            if(isNaN(num2)) num2 = 0;
            if(operation == '/' && num2 == 0){
                setprev(num1 + ' ' + operation + ' ' + num2);
                setscreenvalue('not this one.');
                operation = 'nan';
                return;
            }
            process();
            setscreenvalue(ans.toString());
            setprev(num1 + ' ' + operation + ' ' + num2);
            screenvalue = '';
            operation = '=';
            return;
        }
        case 'A':{
            //reset
            setscreenvalue('');
            setprev('');
            screenvalue = '';
            operation = '';
            val1 = 0;
            val2 = 0;
            ans = 0;
            isdecimal = false;
            isnegative = false;
            break;
        }
    }
    setscreenvalue(screenvalue);
    if(operation == '=') setprev('');
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
    isdecimal = false;
    isnegative = false;
}

function setscreenvalue(value){
    if(value.length > 20)
        currentvalue.style.fontSize = (800 / value.length).toString()+'px';
    else
        currentvalue.style.fontSize = '40px';

    if(value == '')
        currentvalue.textContent = '_';
    else
        currentvalue.textContent = value;
}
function setprev(value){
    if(value.length > 40)
        prev.style.fontSize = (800 / value.length).toString()+'px';
    else
        prev.style.fontSize = '20px';
    prev.textContent = value
}