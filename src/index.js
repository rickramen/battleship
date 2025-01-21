// index.js
import './styles/styles.css';


const GameController = require('./components/GameController');
const DomController = require('./components/DomController');

function startGame() {
    const gameController = new GameController();
    const domController = new DomController(gameController);

    domController.initialize();
}

document.addEventListener('DOMContentLoaded', startGame);
