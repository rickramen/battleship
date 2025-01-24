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

    addEventListeners(playerBoard) {
        const boardElement = document.getElementById(playerBoard); 
        
        boardElement.querySelectorAll('.cell').forEach((cellElement) => {
            const row = parseInt(cellElement.dataset.row, 10);
            const col = parseInt(cellElement.dataset.col, 10);

            cellElement.addEventListener('click', () => {
                this.handleAttack(row, col);
            });
        });
    }

    handleAttack(row, col) {
        const result = this.gameController.attack(row, col);

        if (result) {
            console.log(result); 
        }
        this.displayPlayerBoards();
    }

}

module.exports = DomController;
