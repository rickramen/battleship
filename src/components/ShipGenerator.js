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

    // Return either horizontal or vertical orientation 
    getRandomDirection() {
        return Math.random() < 0.5 ? 'horizontal' : 'vertical';  
    }

    getAvailablePositions(ship, direction) {
        const positions = [];
        const size = this.gameboard.size;

        // Loop through all the rows and columns to find valid starting positions
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (this.isValidShipPlacement(ship, { row, col }, direction)) {
                    positions.push({ row, col });
                }
            }
        }

        // Shuffle the valid positions to randomize the placement
        return this.shufflePositions(positions);
    }

    
    isValidShipPlacement(ship, startPos, direction) {
        const { row, col } = startPos;

        // Check if the ship is within the bounds of the gameboard
        if (direction === 'horizontal' && col + ship.length > this.gameboard.size) return false;
        if (direction === 'vertical' && row + ship.length > this.gameboard.size) return false;

        // Check if the ship overlaps with any other ships
        for (let i = 0; i < ship.length; i++) {
            const r = direction === 'vertical' ? row + i : row;
            const c = direction === 'horizontal' ? col + i : col;

            // Check if the grid cell is already occupied
            if (this.gameboard.grid[r][c]) return false; 
        }

        // Return true if the ship placement is valid
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
        const direction = this.getRandomDirection();
        let availablePositions = this.getAvailablePositions(ship, direction);

        if (availablePositions.length === 0) {
            throw new Error(`No valid positions found for ship of length ${ship.length}`);
        }

        // Place the ship on board with the random position and direction
        const position = availablePositions[0]; 
        this.placeShipOnBoard(ship, position, direction);
    }

    shufflePositions(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

module.exports = ShipGenerator;
