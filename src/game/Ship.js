// Ship.js

class Ship {
    constructor(length) {
        this.length = length;
        this.hits = [];
    }

    hit(position) {
        this.hits.push(position); // Track the hit position
    }

    isHit(position) {
        return this.hits.some(hit => hit.row === position.row && hit.col === position.col);
    }

    isSunk() {
        return this.hits.length === this.length; // Sunk if all parts are hit
    }
}

module.exports = Ship;
