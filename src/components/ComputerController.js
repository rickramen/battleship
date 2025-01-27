// ComputerController.js

class ComputerController {
    constructor(gameController) {
        this.gameController = gameController;
    }

    takeTurn() {
        const availableMoves = this.getAvailableMoves();
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        this.gameController.processAttack(randomMove.row, randomMove.col);
    }

    getAvailableMoves() {
        const opponentBoard = this.gameController.opponent.gameboard;
        let availableMoves = [];

        opponentBoard.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (!cell || (cell && !cell.isHit({ row: rowIndex, col: colIndex }))) {
                    availableMoves.push({ row: rowIndex, col: colIndex });
                }
            });
        });

        return availableMoves;
    }
}

module.exports = ComputerController;
