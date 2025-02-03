// GameController.js
const Player = require('../game/Player');
const Ship = require('../game/Ship');
const ComputerController = require('./ComputerController');
const ShipGenerator = require('./ShipGenerator');

class GameController {
    constructor() {
        this.player1 = new Player('real');
        this.player2 = new Player('computer')
        this.currentPlayer = this.player1;
        this.opponent = this.player2;

        this.player1ShipGenerator = new ShipGenerator(this.player1.gameboard);
        this.player2ShipGenerator = new ShipGenerator(this.player2.gameboard);
        this.populateBoards();

        this.computerController = new ComputerController(this);
    }

    populateBoards() {
        // Player 1
        this.player1.gameboard.resetGameBoard();

        this.player1ShipGenerator.placeShipRandomly(new Ship(5));
        this.player1ShipGenerator.placeShipRandomly(new Ship(4));
        this.player1ShipGenerator.placeShipRandomly(new Ship(3));
        this.player1ShipGenerator.placeShipRandomly(new Ship(3));
        this.player1ShipGenerator.placeShipRandomly(new Ship(2));

        // Player 2
        this.player2.gameboard.resetGameBoard();

        this.player2ShipGenerator.placeShipRandomly(new Ship(5));
        this.player2ShipGenerator.placeShipRandomly(new Ship(4));
        this.player2ShipGenerator.placeShipRandomly(new Ship(3));
        this.player2ShipGenerator.placeShipRandomly(new Ship(3));
        this.player2ShipGenerator.placeShipRandomly(new Ship(2));
    }   

    processAttack(row, col) {
        const result = this.opponent.gameboard.receiveAttack({ row, col });
    
        if (result.sunk) {
            console.log('A ship was sunk!');
        }
    
        // Check if the opponent has lost all ships
        if (this.opponent.gameboard.allShipsSunk()) {
            this.declareWinner(this.currentPlayer);
            return { ...result, gameEnded: true }; 
        }
    
        this.swapTurn();
        return result;
    }
    
    declareWinner(winner) {
        this.winner = winner;
        this.gameEnded = true; 
    }
    
    swapTurn() {
        [this.currentPlayer, this.opponent] = [this.opponent, this.currentPlayer];

        if (this.currentPlayer.type === 'computer') {
            console.log('Computer is making its move...');
            this.computerController.takeTurn(); 
        }
    }
}

module.exports = GameController;