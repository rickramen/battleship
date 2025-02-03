// DomController.js

class DomController {
    constructor(gameController) {
        this.gameController = gameController;
    }

    initialize() {
        this.displayPlayerBoards();
        this.setupButtonListeners();
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
            this.gameController.populateBoards(); 
            this.displayPlayerBoards()
            console.log('randomized');
        });
       }

    setupBoardListeners(playerBoardId) {
        const boardElement = document.getElementById(playerBoardId);

        boardElement.querySelectorAll('.cell').forEach((cellElement) => {
            const row = parseInt(cellElement.dataset.row, 10);
            const col = parseInt(cellElement.dataset.col, 10);

            cellElement.addEventListener('click', () => {
                if (
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
            }
        }
    }

    displayWinner(winner) {
        const winnerMessage = document.createElement('div');
        winnerMessage.id = 'winner-message';

        if (winner.type === 'real'){
            winnerMessage.textContent = `YOU WIN!`;
        }else (winnerMessage.textContent = `COMPUTER WINS!`);
        
        document.body.appendChild(winnerMessage);

        // Disable UI interaction
        document.getElementById('player2-board').style.pointerEvents = 'none';
    }
}

module.exports = DomController;

