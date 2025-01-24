// GameController.js
const Player = require('../game/Player');
const Ship = require('../game/Ship');

class GameController {
    constructor() {
        this.player1 = new Player('real');
        this.player2 = new Player('computer')
        this.currentPlayer = this.player1;
        this.opponent = this.player2;

        this.populateBoards();
    }

    populateBoards() {
        // Add randomization later
        this.player1.gameboard.placeShip(
            new Ship(5), [
                {row: 4, col: 2}, {row: 4, col: 3}, {row: 4, col: 4}, {row: 4, col: 5}, {row: 4, col: 6}
            ] // carrier
        );
        this.player1.gameboard.placeShip(
            new Ship(4), [
                {row: 6, col: 1}, {row: 7, col: 1}, {row: 8, col: 1}, {row: 9, col: 1}
            ] // battleship
            );
        this.player1.gameboard.placeShip(
            new Ship(3), [
                {row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}
            ] // cruiser
        );
        this.player1.gameboard.placeShip(
            new Ship(3), [
                {row: 6, col: 6}, {row: 7, col: 6}, {row: 8, col: 6}
            ] // submarine
        );
        this.player1.gameboard.placeShip(
            new Ship(2), [
                {row: 1, col: 8}, {row: 2, col: 8}
            ] // destroyer
        );
        this.player2.gameboard.placeShip(
            new Ship(3), [
                {row: 7, col: 3}, {row: 7, col: 4}, {row: 7, col: 5}
            ]
        );
    }   


    attack(row, col) {
        const targetBoard = this.player2.gameboard;
          
        const result = targetBoard.receiveAttack({ row, col });

        return result ? 'Hit!' : 'Miss!';
    }
}

module.exports = GameController;