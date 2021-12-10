const svgns="http://www.w3.org/2000/svg";

var session=1;
var sTime=20;
var curSTime;
var bTime=5;
var curBTime;
var isSession=true;
var tick;
var perimeterProgress=973;

var sTick;
var bTick; 

var device=document.getElementById("device");
var timerDisplay=document.getElementById("timerDisplay");
var timerText=document.getElementById("timerText");
var sessionDisplay=document.getElementById("sessionDisplay");
var adjustTime=document.getElementById("adjustTime");
var sessionTime=document.getElementById("sessionTime");
var breakTime=document.getElementById("breakTime");
var sessionText=document.getElementById("sessionText");
var breakText=document.getElementById("breakText");
var svgContainer=document.getElementById("svgContainer");

var progress=document.createElementNS(svgns, "rect");

initialSetup();

function initialSetup()
{
    progress.setAttribute("id","progress");
    progress.setAttribute("class","sessionProgress"); 
    progress.setAttribute("width","100%");
    progress.setAttribute("height","100%");   

    timerText.innerText=sTime-1+" : 60";
    
    sessionDisplay.innerText="Session "+session;

    sessionText.innerText=sTime+" min";

    var increaseSessionTime=document.createElement("button");
    increaseSessionTime.setAttribute("class","rightButton");
    increaseSessionTime.innerText="+";
    increaseSessionTime.addEventListener("click", increaseTimer);

    var decreaseSessionTime=document.createElement("button");
    decreaseSessionTime.setAttribute("class","leftButton");
    decreaseSessionTime.innerText="-";
    decreaseSessionTime.addEventListener("click", decreaseTimer);

    breakText.innerText=bTime+" min";

    var increaseBreakTime=document.createElement("button");
    increaseBreakTime.setAttribute("class","rightButton");
    increaseBreakTime.innerText="+";
    increaseBreakTime.addEventListener("click", increaseTimer);

    var decreaseBreakTime=document.createElement("button");
    decreaseBreakTime.setAttribute("class","leftButton");
    decreaseBreakTime.innerText="-";
    decreaseBreakTime.addEventListener("click", decreaseTimer);

    var pauseTime=document.createElement("button");
    pauseTime.setAttribute("class","leftButton");
    pauseTime.innerText="Pause";
    pauseTime.addEventListener("click", pauseTimer);

    var resetTime=document.createElement("button");
    resetTime.setAttribute("class","rightButton");
    resetTime.innerText="Reset";
    resetTime.addEventListener("click", resetTimer);

    svgContainer.appendChild(progress);

    sessionTime.appendChild(decreaseSessionTime);
    sessionTime.appendChild(increaseSessionTime);

    breakTime.appendChild(decreaseBreakTime);
    breakTime.appendChild(increaseBreakTime);

    pauseRetry.appendChild(pauseTime);
    pauseRetry.appendChild(resetTime);

    setTimerDisplay();

}

function setTimerDisplay()
{
    clearInterval(sTick);
    clearInterval(bTick);
    if(isSession)
    {
        sessionDisplay.innerText="Session "+session;
        timerDisplay.setAttribute("class","sessionText");
        timerText.innerText=("0" + parseInt(sTime-1)).slice(-2)+" : 60";
        tick=curSTime=sTime*60;
        progress.style.stroke="#35d6db";
        sTick=setInterval(countDownTick,1000);
    }
    else
    {        
        sessionDisplay.innerText="Break !";
        timerDisplay.setAttribute("class","breakText");
        timerText.innerText=("0" + parseInt(bTime-1)).slice(-2)+" : 60";
        session++;
        tick=curBTime=bTime*60;
        progress.style.stroke="#eb3f28";
        bTick=setInterval(countDownTick,1000);
    }
}

function countDownTick()
{
    tick--;

    var min = ("0" + parseInt(tick/60)).slice(-2);
    var sec = ("0" + tick%60).slice(-2);

    timerText.innerText=min+" : "+sec;

    if(isSession)
        setProgress(tick/curSTime);
    else
        setProgress(-tick/curBTime);

    if(tick==0)
    {
        isSession=!isSession;
        setTimerDisplay();
    }

}

function increaseTimer(event)
{
    var parent=event.target.parentNode;
    if(parent.id=="sessionTime" && sTime<60)
    {
        sTime+=5;
        sessionText.innerText=sTime+" min";
    }
    else if(parent.id=="breakTime" && bTime<15)
    {
        bTime+=1;
        breakText.innerText=bTime+" min";
    }
    else
        console.log("Unknown Button");
    

}

function decreaseTimer(event)
{
    var parent=event.target.parentNode;
    if(parent.id=="sessionTime" && sTime>5)
    {
        sTime-=5;
        sessionText.innerText=sTime+" min";
    }
    else if(parent.id=="breakTime" && bTime>1)
    {
        bTime-=1;
        breakText.innerText=bTime+" min";
    }
    else
        console.log("Unknown Button");

}

function pauseTimer()
{
    clearInterval(sTick);
    clearInterval(bTick);
}

function resetTimer()
{
    session=1;
    isSession=true;
    setProgress(1);
    setTimerDisplay();
}

function setProgress(percent)
{
    progress.style.strokeDashoffset=perimeterProgress-(percent*perimeterProgress);
}