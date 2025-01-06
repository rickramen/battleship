const Ship = require('../src/game/Ship');

describe('Ship', () => {
        let ship;

    test('Ship should record hits and determine if sunk', () => {
        ship = new Ship(3);
    
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});

