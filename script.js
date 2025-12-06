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
    
    let enemySelect = 0;
    let userSelect = 0;
    while(GameBoard.gameEnd != true){
        
        enemySelect = Math.floor(Math.random()*9);
        
        trackTurns(GameBoard);
        if(GameBoard.playerTurn == true){
            userSelect = Math.floor(Math.random()*9);
            while(GameBoard.board[userSelect] != ""){
                userSelect = Math.floor(Math.random()*9);
            }
            GameBoard.board[userSelect] = user.XorO;
            console.log(userSelect);
            DisplayGame(GameBoard);
            if(CheckWinState(user,GameBoard)){
                GameBoard.gameEnd = true;
                console.log("Player wins");
                break;
            }
            
            
            
        }
        else{
            enemySelect = Math.floor(Math.random()*9);
            while(GameBoard.board[enemySelect] !=""){
                enemySelect = Math.floor(Math.random()*9);
            }
            GameBoard.board[enemySelect] = enemy.XorO;
            DisplayGame(GameBoard);
            console.log(enemySelect);
            if(CheckWinState(enemy,GameBoard)){
                console.log("Computer wins");
                GameBoard.gameEnd = true;
                break;

            }

            
        
        
    }
    if(isArrayFull(GameBoard.board)){
            GameBoard.gameEnd = true;
            console.log("Nobody wins");
            break;
    }
    



    }



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