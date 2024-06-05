let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msg_con = document.querySelector(".msg-con");
let msg = document.querySelector("#msg");


let turn = true;
let clicks = 0;

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        
        if(turn){
            box.innerText = "X";
            turn = false;
        }else{
            box.innerText = "O";
            turn = true;
        }
        box.disabled = true;
        clicks++;

        let isWinner = checkWinner();

        if (clicks === 9 && !isWinner) {
            gameDraw();
          }
    });
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msg_con.classList.remove("hide");
    disableBox();
};

const disableBox = () =>{
    for (box of boxes){
        box.disabled=true;
    }
};
const enableBox = () =>{
    for (box of boxes){
        box.disabled=false;
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    msg.innerText = 'Winner is '+ winner;
    msg_con.classList.remove("hide");
    disableBox();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if(pos1 != "" && pos2 != "" && pos3 !=""){
            if (pos1 === pos2 && pos2 == pos3){
                
                showWinner(pos1);
                return true;
            }
        }
    }

};

const resetGame = () =>{
    turn = true;
    clicks = 0;
    enableBox();
    msg_con.classList.add("hide");
};

newBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);