let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let turnO = true;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


function btnPressAudio() {
    // Create an Audio object and specify the path to your audio file
    var audio = new Audio('./btn-press.mp3');
    // Play the audio
    audio.play();
}
function gameOverAudio() {
    // Create an Audio object and specify the path to your audio file
    var audio = new Audio('./game-over.wav');
    // Play the audio
    audio.play();
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerHTML = "O";
            box.style.color = "#7c0000";
            turnO=false;
            btnPressAudio();
        }
        else{
            box.innerHTML = "X";
            box.style.color = "#00027c";
            turnO = true;
            btnPressAudio();
        }
        box.disabled = true;

        checkWinner();
    });
});

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                document.querySelector(".game").style.display = 'none';
                document.querySelector(".game-over").style.display = 'block';
                document.querySelector(".game-over-msg").innerText = `Player ${pos1Val} won!`;
                gameOverAudio();
                if(pos1Val==="O"){
                    document.querySelector(".game-over-msg").style.color = "#7c0000";
                }
                else{
                    document.querySelector(".game-over-msg").style.color = "#00027c";
                }
                break;
            }
            else{
                checkDraw();
            }
        } 
    }
}

const checkDraw = ()=>{
    let cnt = 0;
    boxes.forEach((box)=>{
        if(box.disabled){
            cnt++;
        }
    });
    if(cnt===9){
        document.querySelector(".game").style.display = 'none';
        document.querySelector(".game-over").style.display = 'block';
        document.querySelector(".game-over-msg").innerText = "Match Draw!";
        gameOverAudio();
    }
}






resetBtn.addEventListener("click",()=>{
    document.querySelector(".game").style.display = 'flex';
    document.querySelector(".game-over").style.display = 'none';
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
})