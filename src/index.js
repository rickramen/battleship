// index.js
import './styles.css';


const GameController = require('./components/GameController');
const DomController = require('./components/DomController');

function startGame() {
    const gameController = new GameController();
    const domController = new DomController(gameController);

    gameController.domController = domController;
    domController.initialize();
}

document.addEventListener('DOMContentLoaded', startGame);
