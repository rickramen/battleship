// DomController.js

class DomController {
    constructor(gameController) {
        this.gameController = gameController;
    }

    initialize() {
        this.displayPlayerBoards();
        this.setupButtonListeners();
        this.updateGameStatus('Press start to BATTLE!!!');
    }

    displayPlayerBoards() {
        this.renderBoard(this.gameController.player1.gameboard, 'player1-board');
        this.renderBoard(this.gameController.player2.gameboard, 'player2-board');
        this.setupBoardListeners('player2-board');
    }

    renderBoard(gameboard, playerBoardId) {
        const boardElement = document.getElementById(playerBoardId);
        const isComputerBoard = playerBoardId === 'player2-board';

        boardElement.innerHTML = ''; // Clear the board before re-rendering
    
        gameboard.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
    
                // Check for missed attacks first
                if (gameboard.missedAttacks.some(miss => miss.row === rowIndex && miss.col === colIndex)) { 
                    cellElement.classList.add('miss');
                } 
                else if (cell) {
                    if (cell.isSunk()) {
                        cellElement.classList.add('sunk');
                    } else if (cell.isHit({ row: rowIndex, col: colIndex })) {
                        cellElement.classList.add('hit');
                    } else {
                    if (isComputerBoard) {
                        cellElement.classList.add('empty');
                    } else {
                        cellElement.classList.add('ship');
                    }
                }
                } 
                else {
                    cellElement.classList.add('empty');
                }
    
                boardElement.appendChild(cellElement);
            });
        });
    }
    
    setupButtonListeners() {
        document.getElementById("random-btn").addEventListener("click", () => {
            this.gameController.resetBoards(); 
            this.displayPlayerBoards()
        });

        document.getElementById("start-btn").addEventListener("click", () => {
            document.getElementById("player1-board").classList.remove("disabled");
            document.getElementById("player2-board").classList.remove("disabled");
            document.getElementById("player1-board").classList.add("started");
            document.getElementById("player2-board").classList.add("started");
        });
       }

    setupBoardListeners(playerBoardId) {
        const boardElement = document.getElementById(playerBoardId);

        boardElement.querySelectorAll('.cell').forEach((cellElement) => {
            const row = parseInt(cellElement.dataset.row, 10);
            const col = parseInt(cellElement.dataset.col, 10);

            cellElement.addEventListener('click', () => {
                if (
                boardElement.classList.contains('started') &&    
                !cellElement.classList.contains('hit') && 
                !cellElement.classList.contains('miss') && 
                !cellElement.classList.contains('sunk')
                ) { this.handleAttack(row, col); }
            });
        });
    }

      handleAttack(row, col) {
        const result = this.gameController.processAttack(row, col);
    
        if (result) {
            this.displayPlayerBoards();
            // Check if the game has ended and display winner
            if (result.gameEnded) {
                this.displayWinner(this.gameController.winner);
                document.getElementById("player1-board").classList.remove("started");
                document.getElementById("player2-board").classList.remove("started");
            }
        }
    }
    updateGameStatus(message) {
        const gameStatusElement = document.getElementById('game-status');
        gameStatusElement.textContent = message;
    }

    displayWinner(winner) {
        const gameStatusElement = document.getElementById('game-status');

        if (winner.type === 'real'){
            gameStatusElement.textContent = `YOU WIN!`;
        }else {
            gameStatusElement.textContent = `COMPUTER WINS!`;
        };
    }
}

module.exports = DomController;

