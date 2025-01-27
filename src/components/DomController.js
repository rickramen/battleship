// DomController.js

class DomController {
    constructor(gameController) {
        this.gameController = gameController;
    }

    initialize() {
        this.displayPlayerBoards();
    }

    displayPlayerBoards() {
        this.renderBoard(this.gameController.player1.gameboard, 'player1-board');
        this.renderBoard(this.gameController.player2.gameboard, 'player2-board');
        this.addEventListeners('player2-board');
    }

    renderBoard(gameboard, playerBoardId) {
        const boardElement = document.getElementById(playerBoardId);
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
                        cellElement.classList.add('ship');
                    }
                } 
                else {
                    cellElement.classList.add('empty');
                }
    
                boardElement.appendChild(cellElement);
            });
        });
    }
    
    addEventListeners(playerBoardId) {
        const boardElement = document.getElementById(playerBoardId);

        boardElement.querySelectorAll('.cell').forEach((cellElement) => {
            const row = parseInt(cellElement.dataset.row, 10);
            const col = parseInt(cellElement.dataset.col, 10);

            cellElement.addEventListener('click', () => {
                if (!cellElement.classList.contains('hit') && !cellElement.classList.contains('miss')) {
                    this.handleAttack(row, col);
                }
            });
        });
    }

handleAttack(row, col) {
        const result = this.gameController.processAttack(row, col);
    
        if (result) {
            this.displayPlayerBoards(); 
        }
    }    
}    

module.exports = DomController;

