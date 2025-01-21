// DomController.js

class DomController {
    constructor(gameController) {
        this.gameController = gameController;
    }

    initialize() {
        this.displayAllBoards();
    }

    displayAllBoards() {
        
        this.displayBoard(this.gameController.player1.gameboard, 'player1-board');
        this.displayBoard(this.gameController.player2.gameboard, 'player2-board');
    
    }

    displayBoard(gameboard, playerBoard) {
        const boardElement = document.getElementById(playerBoard);
        boardElement.innerHTML = ''; // Clear before render

        gameboard.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.x = x;
                cellElement.dataset.y = y;
                
                if (cell) {
                    if (cell.isSunk()) {
                        cellElement.classList.add('sunk');
                    } else {
                        cellElement.classList.add('ship');
                    }
                } else {
                    cellElement.classList.add('empty');
                }

                boardElement.appendChild(cellElement);
                
            });
        });
    }
}

module.exports = DomController;