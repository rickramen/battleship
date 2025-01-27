// ShipGenerator.js

class ShipGenerator {
    constructor(gameboard) {
        this.gameboard = gameboard;
    }

    getRandomPosition() {
        const row = Math.floor(Math.random() * 10);  
        const col = Math.floor(Math.random() * 10);  
        return { row, col };
    }

    getRandomDirection() {
        return Math.random() < 0.5 ? 'horizontal' : 'vertical';  
    }

    isValidShipPlacement(ship, startPos, direction) {
        const { row, col } = startPos;
    
        // Check for out of bounds
        if (direction === 'horizontal' && col + ship.length > this.gameboard.size) {
            return false; 
        }
        if (direction === 'vertical' && row + ship.length > this.gameboard.size) {
            return false; 
        }
    
        // Check for overlapping ships
        for (let i = 0; i < ship.length; i++) {
            const r = direction === 'vertical' ? row + i : row;
            const c = direction === 'horizontal' ? col + i : col;
    
            if (r < 0 || c < 0 || r >= this.gameboard.size || c >= this.gameboard.size || this.gameboard.grid[r][c]) {
                return false;  // If out of bounds or overlap found
            }
        }
    
        return true;
    }

    placeShipOnBoard(ship, startPos, direction) {
        const { row, col } = startPos;

        for (let i = 0; i < ship.length; i++) {
            const r = direction === 'vertical' ? row + i : row;
            const c = direction === 'horizontal' ? col + i : col;

            this.gameboard.grid[r][c] = ship; 
        }
    }

    placeShipRandomly(ship) {
        let validPositionFound = false;
        let position;
        let direction;

        // Limit to 100 attempts
        let attempts = 0;
        while (!validPositionFound && attempts < 100) {
            position = this.getRandomPosition();  
            direction = this.getRandomDirection(); 

            validPositionFound = this.isValidShipPlacement(ship, position, direction);
            attempts++;
        }

        if (validPositionFound) {
            this.placeShipOnBoard(ship, position, direction);
        }
    }
}

module.exports = ShipGenerator;
