const Gameboard = require('../src/game/Gameboard');
const Ship = require('../src/game/Ship');

describe('Gameboard', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
        gameboard = new Gameboard(); 
        ship = new Ship(3);  
    });

    describe('Ship Placement', () => {
        test('should throw error for invalid ship placement (out of bounds)', () => {
            const coordinates = [{row: 0, col: 0}, {row: 0, col: 10}, {row: 0, col: 11}];
            expect(() => gameboard.placeShip(ship, coordinates)).toThrow(Error);
        });

        test('should throw error for overlapping ships', () => {
            const ship2 = new Ship(2);
            const coordinates1 = [{row: 0, col: 0}, {row: 0, col: 1}];
            const coordinates2 = [{row: 0, col: 1}, {row: 0, col: 2}];  

            gameboard.placeShip(ship, coordinates1);
            expect(() => gameboard.placeShip(ship2, coordinates2)).toThrow(Error);
        });

        test('should place a ship correctly', () => {
            const coordinates = [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}];
            gameboard.placeShip(ship, coordinates);

            expect(gameboard.grid[0][0]).toBe(ship);
            expect(gameboard.grid[0][1]).toBe(ship);
            expect(gameboard.grid[0][2]).toBe(ship);
        });
    });

    describe('Attack Behavior', () => {
        test('should register a miss when attacking an empty spot', () => {
            const result = gameboard.receiveAttack({row: 5, col: 5});
            expect(result.hit).toBe(false); 
            expect(gameboard.grid[5][5]).toBeNull();
        });

        test('should register a hit when attacking a ship', () => {
            const coordinates = [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}];
            gameboard.placeShip(ship, coordinates);

            const result = gameboard.receiveAttack({row: 0, col: 1});
            expect(result.hit).toBe(true); 
            expect(ship.isHit({ row: 0, col: 1 })).toBe(true);
        });

        test('should throw error for invalid attack (out of bounds)', () => {
            expect(() => gameboard.receiveAttack({row: 10, col: 10})).toThrow('Invalid attack: Coordinates out of bounds');
        });

        test('should mark ship as sunk after all parts are hit', () => {
            const coordinates = [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}];
            gameboard.placeShip(ship, coordinates);

            gameboard.receiveAttack({row: 0, col: 0});
            gameboard.receiveAttack({row: 0, col: 1});
            gameboard.receiveAttack({row: 0, col: 2});

            expect(ship.isSunk()).toBe(true); // Ship should be sunk
        });
    });

    describe('Gameboard Status', () => {
        test('should return true when all ships are sunk', () => {
            const ship2 = new Ship(2);
            const coordinates1 = [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}];
            const coordinates2 = [{row: 1, col: 0}, {row: 1, col: 1}];
            
            gameboard.placeShip(ship, coordinates1);
            gameboard.placeShip(ship2, coordinates2);

            // Sink both ships
            gameboard.receiveAttack({row: 0, col: 0});
            gameboard.receiveAttack({row: 0, col: 1});
            gameboard.receiveAttack({row: 0, col: 2});

            gameboard.receiveAttack({row: 1, col: 0});
            gameboard.receiveAttack({row: 1, col: 1});

            // All ships should be sunk
            expect(gameboard.allShipsSunk()).toBe(true); 
        });

        test('should return false when not all ships are sunk', () => {
            const coordinates = [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}];
            gameboard.placeShip(ship, coordinates);

            // Attack only part of the ship
            gameboard.receiveAttack({row: 0, col: 0});
            gameboard.receiveAttack({row: 0, col: 1});

            // Not all ships are sunk
            expect(gameboard.allShipsSunk()).toBe(false); 
        });
    });
});
