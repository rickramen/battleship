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
        boardElement.innerHTML = ''; // Clear before rendering

        gameboard.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;

                if (cell) {
                    if (cell.isSunk()) {
                        cellElement.classList.add('sunk');
                    } else if (cell.isHit({ row: rowIndex, col: colIndex })) {
                        cellElement.classList.add('hit');
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
            const boardElement = document.getElementById('player2-board'); // Assume attacking opponent
            const cellElement = boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);

            if (result.hit) {
                cellElement.classList.add('hit');
                if (result.sunk) {
                    this.markSunkShip('player2-board');
                }
            } else {
                cellElement.classList.add('miss');
            }
        }
    }

    markSunkShip(boardId) {
        const boardElement = document.getElementById(boardId);

        this.gameController.opponent.gameboard.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell && cell.isSunk()) {
                    const cellElement = boardElement.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`);
                    if (cellElement) {
                        cellElement.classList.add('sunk');
                    }
                }
            });
        });
    }
}

module.exports = DomController;

