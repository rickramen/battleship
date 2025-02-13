// ComputerController.js

class ComputerController {
    constructor(gameController) {
        this.gameController = gameController;
    }

    takeTurn() {
        if (this.gameController.gameEnded) return;
        const availableMoves = this.getAvailableMoves();
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const result = this.gameController.processAttack(randomMove.row, randomMove.col);

        if (result) {
            this.gameController.domController.updateGameStatusMessage(
                `Computer attacked (${randomMove.row}, ${randomMove.col})`
            );
        }

        if (result.gameEnded) {
            const winner = this.gameController.currentPlayer.type === 'real' ? 'Player' : 'Computer';
            this.gameController.domController.handleGameEnd(winner); 
        } else {
            this.gameController.domController.enableBoard();
        }
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
