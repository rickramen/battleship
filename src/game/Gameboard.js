// Gameboard.js

const Ship = require('./Ship');  

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(null));
        this.missedAttacks = [];
    }

    isValidCoordinate({x, y}) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    isPositionAvailable(coordinates) {
        return coordinates.every(({x, y}) => this.grid[x][y] === null);
    }

    placeShip(ship, coordinates) {
        if (!coordinates.every(coord => this.isValidCoordinate(coord))) {
            throw new Error('Invalid ship placement: Coordinates out of bounds');
        }
        
        if (!this.isPositionAvailable(coordinates)) {
            throw new Error('Invalid ship placement: Position is occupied');
        }
        
        coordinates.forEach(({x, y}) => {
            this.grid[x][y] = ship;
        });
    }

    receiveAttack({x, y}) {
        if (!this.isValidCoordinate({x, y})) {
            throw new Error('Invalid attack: Coordinates out of bounds');
        }

        if (this.grid[x][y]) {
            this.grid[x][y].hit();
            return true;  // Hit
        } else {
            this.missedAttacks.push({x, y});
            return false;  // Miss
        }
    }

    allShipsSunk() {
        return this.grid.flat().every(cell => !cell || cell.isSunk());
    }
}

module.exports = Gameboard;