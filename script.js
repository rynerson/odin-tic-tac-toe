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
            if(board.gameEnd || board.board[i] !== "") return;
            //user turn
            if(board.playerTurn){
                board.board[i] = user.XorO;
                DisplayGame(board);
                if(CheckWinState(user,board)){
                    console.log("Player Wins");
                    board.gameEnd = true;
                    return;
                }
                if(isArrayFull(board.board)){
                    console.log("Nobody wins");
                    board.gameEnd = true;
                    return;
                }
                board.playerTurn = false;
                enemyTurn(board, enemy);
            }
            
        }
    }
    
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
        board.gameEnd = true;
        return;
    }

    if(isArrayFull(board.board)){
        console.log("Nobody wins");
        board.gameEnd = true;
        return;
    }

    board.playerTurn = true; // give control back to user
}
function trackTurns(board){
    if(board.playerTurn){
        board.playerTurn = false;
        console.log("Computer's turn");
    } else {
        board.playerTurn = true;
        console.log("Player's Turn");
    }
}
function flow(){
    GameBoard.gameEnd = false;
    const user = Player("Linda","X");
    const enemy = Player("Computer","O");
    DisplayGame(GameBoard);
    MarkSpot(GameBoard,user,enemy);
    



}
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
    || (b[6] == x && b[7] == x && b[8] == x)){
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

flow();