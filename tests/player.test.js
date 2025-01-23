const Player = require('../src/game/Player');
const Gameboard = require('../src/game/Gameboard');

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player('real'); 
    });

    test('should initialize with the correct type', () => {
        expect(player.type).toBe('real');
    });

    test('should have a gameboard property', () => {
        expect(player.gameboard).toBeInstanceOf(Gameboard); 
    });

    test('should be able to interact with the gameboard', () => {
        const ship = { length: 3, hit: jest.fn(), isSunk: jest.fn() };
        const coordinates = [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}];
        
        player.gameboard.placeShip(ship, coordinates);

        expect(player.gameboard.grid[0][0]).toBe(ship);
        expect(player.gameboard.grid[0][1]).toBe(ship);
        expect(player.gameboard.grid[0][2]).toBe(ship);
    });
});
