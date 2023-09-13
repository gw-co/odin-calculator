let currentvalue = document.querySelector('.current-value');
let prev = document.querySelector('.prev');
let screenvalue = '';
let ans = 0, num1 = 0, num2 = 0, operation = '';
let isdecimal = false, isnegative = false;

function buttonfunc(v, thisbutton){
    // console.log(v);
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
            if(operation == ''){ // on startup or all clear
                if(screenvalue == '') {return;}
                else {
                    num1 = Number(screenvalue);
                    if(isNaN(num1)) num1 = 0;
                    isdecimal = false;
                    isnegative = false;
                    operation = v;
                    screenvalue = '';
                    setscreenvalue('');
                    prev.textContent = num1 + operation;
                    return;
                }
            }
            else{
                if(operation == '='){ // on last time pressed =
                    if(screenvalue == '')
                        num1 = ans;
                    else
                        num1 = Number(screenvalue);
                    if(isNaN(num1)) num1 = 0;
                    isdecimal = false;
                    isnegative = false;
                    operation = v;
                    screenvalue = '';
                    setscreenvalue('');
                    prev.textContent = num1 + operation;
                    return;

                }
                if(screenvalue == ''){
                    operation = v;
                    prev.textContent = num1 + operation;
                }
                else{
                    num2 = Number(screenvalue);
                    if(isNaN(num2)) num2 = 0;
                    process();

                    setscreenvalue('');
                    screenvalue = '';
                    num1 = ans;
                    
                    operation = v;
                    prev.textContent = num1 + operation;
                    return;
                }
            }
        }
        case '=':{
            if(operation == ''|| screenvalue == '')return;
            num2 = Number(screenvalue);
            if(isNaN(num2)) num2 = 0;
            if(operation == '/' && num2 == 0){
                setscreenvalue('not this one.')
                return;
            }
            else{
                prev.textContent = num1 + operation + num2;
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
            if(screenvalue.at(-1) == '.') isdecimal = false;
            if(screenvalue.at(-1) == '-') isnegative = false;
            screenvalue = screenvalue.slice(0, -1);
            setscreenvalue(screenvalue);
            break;
        }
        case 'A':{
            //reset
            // clearscreen();
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
    // console.log('before ' + screenvalue);
    // if(screenvalue == '' || screenvalue == '0'){
    //     screenvalue = '';
    //     isdecimal = false;
    //     isnegative = false;
    // }
    // if(screenvalue == '-00'){
    //     screenvalue = '-0';
    // } 
        
    // if(screenvalue == '-.') screenvalue = '-0.';
    // console.log('after  ' + screenvalue);//, Number('-01'));
    // setscreenvalue(screenvalue);
}

function process(){
    if(screenvalue == '') return;
    if(screenvalue == '-') screenvalue = '0';
    // console.log(num1, num2, operation);
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
    // let fix = 1000000000;
    // ans = Math.round(ans * fix) / fix;
    console.log(num1, num2, operation, ans);
    // num1 = ans;
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

function getnum(){
    let n = Number(screenvalue);
    if(isNaN(n)) n = 0;
    isdecimal = false;
    isnegative = false;
}