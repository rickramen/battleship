// Player.js

const Gameboard = require('./Gameboard');  

class Player {
    constructor(type) {
        this.type = type;  // 'real' or 'computer'
        this.gameboard = new Gameboard();
    }
}

module.exports = Player;
