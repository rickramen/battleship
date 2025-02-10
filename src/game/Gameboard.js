// Gameboard.js

const Ship = require('./Ship');

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(null));
        this.missedAttacks = [];
    }

    isValidCoordinate({ row, col }) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    isPositionAvailable(coordinates) {
        return coordinates.every(({ row, col }) => this.grid[row][col] === null);
    }

    placeShip(ship, coordinates) {
        if (!coordinates.every(coord => this.isValidCoordinate(coord))) {
            throw new Error('Invalid ship placement: Coordinates out of bounds');
        }

        if (!this.isPositionAvailable(coordinates)) {
            throw new Error('Invalid ship placement: Position is occupied');
        }

        coordinates.forEach(({ row, col }) => {
            this.grid[row][col] = ship;
        });
    }

    receiveAttack({ row, col }) {
        if (!this.isValidCoordinate({ row, col })) {
            throw new Error('Invalid attack: Coordinates out of bounds');
        }

        const target = this.grid[row][col];

        if (target) {
            if (target.isHit({ row, col })) {
                throw new Error('Invalid attack: Already hit this position');
            }

            target.hit({ row, col });
            return { hit: true, row, col, sunk: target.isSunk() };
        } else {
            if (!this.missedAttacks.some(miss => miss.row === row && miss.col === col)) {
                this.missedAttacks.push({ row, col }); 
            }
            return { hit: false, row, col };
        }
    }

    allShipsSunk() {
        return this.grid.flat().every(cell => !cell || cell.isSunk());
    }

    clearBoard() {
        this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.missedAttacks = [];
    }
}

module.exports = Gameboard;

