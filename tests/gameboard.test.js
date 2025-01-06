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
            const coordinates = [{x: 0, y: 0}, {x: 0, y: 10}, {x: 0, y: 11}];
            expect(() => gameboard.placeShip(ship, coordinates)).toThrow(Error);
        });

        test('should throw error for overlapping ships', () => {
            const ship2 = new Ship(2);
            const coordinates1 = [{x: 0, y: 0}, {x: 0, y: 1}];
            const coordinates2 = [{x: 0, y: 1}, {x: 0, y: 2}];  

            gameboard.placeShip(ship, coordinates1);
            expect(() => gameboard.placeShip(ship2, coordinates2)).toThrow(Error);
        });

        test('should place a ship correctly', () => {
            const coordinates = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
            gameboard.placeShip(ship, coordinates);

            expect(gameboard.grid[0][0]).toBe(ship);
            expect(gameboard.grid[0][1]).toBe(ship);
            expect(gameboard.grid[0][2]).toBe(ship);
        });
    });

    describe('Attack Behavior', () => {
        test('should register a miss when attacking an empty spot', () => {
            const result = gameboard.receiveAttack({x: 5, y: 5});
            expect(result).toBe(false); 
            expect(gameboard.missedAttacks).toContainEqual({x: 5, y: 5});
        });

        test('should register a hit when attacking a ship', () => {
            const coordinates = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
            gameboard.placeShip(ship, coordinates);

            const result = gameboard.receiveAttack({x: 0, y: 1});
            expect(result).toBe(true); 
            expect(ship.isSunk()).toBe(false); 
        });

        test('should throw error for invalid attack (out of bounds)', () => {
            expect(() => gameboard.receiveAttack({x: 10, y: 10})).toThrow('Invalid attack: Coordinates out of bounds');
        });

        test('should mark ship as sunk after all parts are hit', () => {
            const coordinates = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
            gameboard.placeShip(ship, coordinates);

            gameboard.receiveAttack({x: 0, y: 0});
            gameboard.receiveAttack({x: 0, y: 1});
            gameboard.receiveAttack({x: 0, y: 2});

            expect(ship.isSunk()).toBe(true); // Ship should be sunk
        });
    });

    describe('Gameboard Status', () => {
        test('should return true when all ships are sunk', () => {
            const ship2 = new Ship(2);
            const coordinates1 = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
            const coordinates2 = [{x: 1, y: 0}, {x: 1, y: 1}];
            
            gameboard.placeShip(ship, coordinates1);
            gameboard.placeShip(ship2, coordinates2);

            // Sink both ships
            gameboard.receiveAttack({x: 0, y: 0});
            gameboard.receiveAttack({x: 0, y: 1});
            gameboard.receiveAttack({x: 0, y: 2});

            gameboard.receiveAttack({x: 1, y: 0});
            gameboard.receiveAttack({x: 1, y: 1});

            // All ships should be sunk
            expect(gameboard.allShipsSunk()).toBe(true); 
        });

        test('should return false when not all ships are sunk', () => {
            const coordinates = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
            gameboard.placeShip(ship, coordinates);

            // Attack only part of the ship
            gameboard.receiveAttack({x: 0, y: 0});
            gameboard.receiveAttack({x: 0, y: 1});

            // Not all ships are sunk
            expect(gameboard.allShipsSunk()).toBe(false); 
        });
    });
});
