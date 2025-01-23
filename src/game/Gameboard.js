// Gameboard.js

const Ship = require('./Ship');  

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(null));
        this.missedAttacks = [];
    }

    isValidCoordinate({row, col}) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    isPositionAvailable(coordinates) {
        return coordinates.every(({row, col}) => this.grid[row][col] === null);
    }

    placeShip(ship, coordinates) {
        if (!coordinates.every(coord => this.isValidCoordinate(coord))) {
            throw new Error('Invalid ship placement: Coordinates out of bounds');
        }
        
        if (!this.isPositionAvailable(coordinates)) {
            throw new Error('Invalid ship placement: Position is occupied');
        }
        
        coordinates.forEach(({row, col}) => {
            this.grid[row][col] = ship;
        });
    }

    receiveAttack({row, col}) {
        if (!this.isValidCoordinate({row, col})) {
            throw new Error('Invalid attack: Coordinates out of bounds');
        }

        if (this.grid[row][col]) {
            this.grid[row][col].hit();
            return true;  // Hit
        } else {
            this.missedAttacks.push({row, col});
            return false;  // Miss
        }
    }

    allShipsSunk() {
        return this.grid.flat().every(cell => !cell || cell.isSunk());
    }
}

module.exports = Gameboard;
