// GameController.js
const Player = require('../game/Player');
const Ship = require('../game/Ship');

class GameController {
    constructor() {
        this.player1 = new Player('real');
        this.player2 = new Player('real')

        this.populateBoards();
    }

    populateBoards() {
        this.player1.gameboard.placeShip(
            new Ship(3), [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}]
        );
        this.player2.gameboard.placeShip(
            new Ship(3), [{x: 7, y: 3}, {x: 7, y: 4}, {x: 7, y: 5}]
        );
    }   
}

module.exports = GameController;