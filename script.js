//gamboard constructor
function GameBoard(){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.board = ["","","","","","","","",""];
    this.gameEnd = false;
    this.playerTurn = true;

}
//player constructor
function Player(name,XorO){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.name = name;
    this.XorO = XorO;
    
}
function trackTurns(board){
    if(board.playerTurn == true){
        board.playerTurn = false;
        console.log("Computer's turn");

    }
    else{
        board.playerTurn = true;
        console.log("Player's Turn");
    }

}
function flow(){
    gameEnd = false;
    const user = new Player("Linda","X");
    const enemy = new Player("Computer","O");
    const board = new GameBoard();
    let enemySelect = 0;
    let userSelect = 0;
    while(board.gameEnd != true){
        enemySelect = Math.floor(Math.random()*9);
        
        trackTurns(board);
        if(board.playerTurn == true){
            userSelect = Math.floor(Math.random()*9);
            while(board.board[userSelect] != ""){
                userSelect = Math.floor(Math.random()*9);
            }
            board.board[userSelect] = user.XorO;
            console.log(userSelect);
            if(CheckWinState(user,board)){
                board.gameEnd = true;
                console.log("Player wins");
            }
            
            
            
        }
        else{
            enemySelect = Math.floor(Math.random()*9);
            while(board.board[enemySelect] !=""){
                enemySelect = Math.floor(Math.random()*9);
            }
            board.board[enemySelect] = enemy.XorO;
            console.log(enemySelect);
            if(CheckWinState(enemy,board)){
                console.log("Computer wins");
                board.gameEnd = true;

            }

            
        
        
    }
    if(isArrayFull(board.board)){
            board.gameEnd = true;
            console.log("Nobody wins");
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