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
        this.gameEnded = false;
    }

    populateBoards() {
        const ships = [5, 4, 3, 3, 2];
        ships.forEach(length => {
            // Player 1
            this.player1ShipGenerator.placeShipRandomly(new Ship(length));
            // Player 2
            this.player2ShipGenerator.placeShipRandomly(new Ship(length));
        });
    }   

    resetBoards() {
        this.player1.gameboard.clearBoard();
        this.player2.gameboard.clearBoard();
        this.populateBoards();
        this.gameEnded = false;
    }

    processAttack(row, col) {
        const result = this.opponent.gameboard.receiveAttack({ row, col });
    
        if (result.sunk) {
            console.log('A ship was sunk!');
        }
    
        // Ends game if all ships are sunk
        if (this.checkForWinner()) {
            this.gameEnded = true;
        } else {
            this.swapTurn();
        }

        return result;
    }
        
    checkForWinner() {
        if (this.opponent.gameboard.allShipsSunk()) {
            return true;
        }
        return false;
    }

    swapTurn() {
        [this.currentPlayer, this.opponent] = [this.opponent, this.currentPlayer];
        if (this.currentPlayer.type === 'computer') {
            this.computerController.takeTurn(); 
        }
        else {
            console.log("Player's turn");
        }

    }
}

module.exports = GameController;