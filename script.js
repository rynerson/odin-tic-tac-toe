let gameStart = false;
const GameBoard = (function(){
    const board = ["","","","","","","","",""];
    let gameEnd = false;
    let playerTurn = true;
    
    return {board, gameEnd, playerTurn};

})();
//factory function for creating the player
function Player (name, XorO){
    return {name, XorO};

}
function DisplayGame(GameBoard){
    for(let i = 0; i <GameBoard.board.length;i++){
        let button = document.getElementById('btn' + i);
        if(button){
            button.textContent = GameBoard.board[i];
        }

    }
}
function MarkSpot(board, user, enemy){
     for(let i = 0; i < 9; i++){
        
        document.getElementById('btn' + i).onclick = function(){
        // ignore clicks if game ended or spot filled
            if(gameStart != true || board.gameEnd || board.board[i] !== "") return;
            //user turn
            if(board.playerTurn){
                board.board[i] = user.XorO;
                DisplayGame(board);
                if(CheckWinState(user,board)){
                    console.log(user.name + " Wins");
                    declareWinner(user.name);
                    board.gameEnd = true;
                    return;
                }
                if(isArrayFull(board.board)){
                    console.log("Nobody wins");
                    declareWinner("Nobody");
                    board.gameEnd = true;
                    return;
                }
                board.playerTurn = false;
                enemyTurn(board, enemy);
            }
            
        }
    }
    
}
function declareWinner(winner){
    const resultsDiv = document.getElementById("results");
    const resultsP = document.createElement("p");
    resultsP.textContent = winner + " Wins";
    resultsDiv.append(resultsP);

}
function enemyTurn(board, enemy){
    let spot = Math.floor(Math.random()*9);
    while(board.board[spot] !== ""){
        spot = Math.floor(Math.random()*9);
    }

    board.board[spot] = enemy.XorO;
    DisplayGame(board);
    console.log("Computer chose", spot);

    if(CheckWinState(enemy,board)){
        console.log("Computer Wins");
        declareWinner("Computer");
        board.gameEnd = true;
        return;
    }

    if(isArrayFull(board.board)){
        console.log("Nobody wins");
        declareWinner("Nobody");
        board.gameEnd = true;
        return;
    }

    board.playerTurn = true; // give control back to user
}
function resetGame() {
    // clear board
    GameBoard.board.fill("");

    // reset flags
    GameBoard.gameEnd = false;
    GameBoard.playerTurn = true;

    // clear results text
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    // Clear player name input
    const nameInput = document.getElementById("name");
    nameInput.value = "";
    gameStart = false;
    const button = document.querySelector('.submit');
    // Change the background color to green
    button.style.backgroundColor = "green";
    button.textContent = "Start";
    // redraw empty board
    DisplayGame(GameBoard);
}

const flow = (function(){
    GameBoard.gameEnd = false;

    const form = document.querySelector('form');
    //get the name for the user
    form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior (which refreshes the page)
    event.preventDefault();
    if(gameStart){
        resetGame();
        return;
    }
    const name = document.getElementById('name').value;
    const user_choice = document.querySelector('input[name="choice"]:checked')?.value;
    const user = Player(name,user_choice);
    let enemy_choice;
    if(user_choice == "X"){
        enemy_choice = "O";
    }
    else{
        enemy_choice = "X";
    }
    const enemy = Player("Computer",enemy_choice);
    const button = document.querySelector('.submit');

    // Change the background color to red
    button.style.backgroundColor = "red";
    button.textContent = "Restart";

    DisplayGame(GameBoard);
    MarkSpot(GameBoard,user,enemy);
    gameStart = true;
    
    
    });

})();

function CheckWinState(person,board){
    let win = false;
    const b = board.board;
    const x = person.XorO;
    //win conditions
    if((b[0] == x && b[1] == x && b[2] == x) 
    || (b[0] == x && b[4] == x && b[8] == x)
    || (b[0] == x && b[3] == x && b[6] == x)
    || (b[1] == x && b[4] == x && b[7] == x)
    || (b[2] == x && b[5] == x && b[8] == x)
    || (b[3] == x && b[4] == x && b[5] == x)
    || (b[6] == x && b[7] == x && b[8] == x)
    ||(b[2] == x && b[4] == x && b[6] == x)){
        return win = true;
    }
    else{
        win = false;
    }


}
function isArrayFull(arr) {
  // all cells are full if none of them hold an empty string
  return arr.every(cell => cell !== "");
}


