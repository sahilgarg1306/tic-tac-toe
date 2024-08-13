var buttons = document.getElementsByTagName('button');
for(var i=0; i<buttons.length; i++){
    var currentButton = buttons[i];
    currentButton.addEventListener('click', printXorZero);
}

var flag = true;
var count = 0;
var isGameEnd = false;
var countdown = 5;
var interval;

function waitFor5Sec(message){
    interval = setInterval(function(){
        document.getElementById('output').innerText = `${message} Game restarts in ${countdown} sec`;
        countdown--;
    }, 1000);
    setTimeout(reset, 5000);
}

function reset(){
    clearInterval(interval);
    countdown = 5;
    isGameEnd = false;
    flag = true;
    count = 0;
    for(var i=0; i<buttons.length; i++){
        buttons[i].innerText = '';
    }
    document.getElementById('output').innerText = '';
}

function isNotBlank(currentButton){
    return currentButton.innerText.trim().length > 0;
}

function isThreeSame(first, second, third){
    if(isNotBlank(first) && isNotBlank(second) && isNotBlank(third)){
        return first.innerText == second.innerText && first.innerText == third.innerText;
    }
    return false;
}

function isGameOver(){
    return isThreeSame(buttons[0], buttons[1], buttons[2]) || 
           isThreeSame(buttons[3], buttons[4], buttons[5]) || 
           isThreeSame(buttons[6], buttons[7], buttons[8]) || 
           isThreeSame(buttons[0], buttons[3], buttons[6]) || 
           isThreeSame(buttons[1], buttons[4], buttons[7]) || 
           isThreeSame(buttons[2], buttons[5], buttons[8]) || 
           isThreeSame(buttons[0], buttons[4], buttons[8]) || 
           isThreeSame(buttons[2], buttons[4], buttons[6]);
}

function printXorZero(){
    var currentButton = this;
    if(!isGameEnd && currentButton.innerText.trim().length == 0){
        count++;
        var value = flag ? "X" : "0";
        currentButton.innerText = value;
        var player = flag ? "Player 1" : "Player 2";
        flag = !flag;

        if(count > 4){
            if(isGameOver()){
                isGameEnd = true;
                waitFor5Sec(`${player} Wins!`);
            } 
            else if(count == buttons.length){
                isGameEnd = true;
                waitFor5Sec('It\'s a Tie.');
            }
        }
    }
}
