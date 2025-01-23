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
    }

    renderBoard(gameboard, playerBoard) {
        const boardElement = document.getElementById(playerBoard);
        boardElement.innerHTML = ''; // Clear before render

        gameboard.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                
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
