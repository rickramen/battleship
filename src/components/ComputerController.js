// ComputerController.js

class ComputerController {
    constructor(gameController) {
        this.gameController = gameController;
    }

    takeTurn() {
        if (this.gameController.gameEnded) return;
        const availableMoves = this.getAvailableMoves();

        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        console.log(`Computer attacking: Row ${randomMove.row}, Column ${randomMove.col}`);
        this.gameController.processAttack(randomMove.row, randomMove.col);
    }

    getAvailableMoves() {
        const opponentBoard = this.gameController.opponent.gameboard;
        let availableMoves = [];

        opponentBoard.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                // Exclude cells that are either missed or already hit
                if (
                    !cell || 
                    (cell && !cell.isHit({ row: rowIndex, col: colIndex })) // Cell has not been hit
                ) {
                    const isMissed = this.gameController.opponent.gameboard.missedAttacks.some(miss => miss.row === rowIndex && miss.col === colIndex);
                    if (!isMissed) {
                        availableMoves.push({ row: rowIndex, col: colIndex });
                    }
                }
            });
        });

        return availableMoves;
    }
}

module.exports = ComputerController;
