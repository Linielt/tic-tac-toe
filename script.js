const Gameboard = (function () {
    let grid = ["", "", "",
                "", "", "",
                "", "", ""];

    const isNSquareFilled = (num) => {
        return grid[num] !== "";
    }

    const fillSquare = (num, naughtOrCross) => {
        if (grid[num] === "") {
            grid[num] = naughtOrCross;
        }
    }

    const getGrid = () => grid;

    const emptyGrid = () => {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = "";
        }
    }

    const isGridFull = () => {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === "") {
                return false;
            }
        }

        return true;
    }


    return { getGrid, emptyGrid, isNSquareFilled, fillSquare, isGridFull };
})();

const GameManager = (function () {
    let player1 = createPlayer("Player 1", "x");
    let player2 = createPlayer("Player 2" , "o");
    let currentPlayer = player1;

    const start = () => {
        displayController.instantiateGrid();
    };

    const setPlayer1 = (name) => player1 = createPlayer(name, "x");

    const setPlayer2 = (name) => player2 = createPlayer(name, "o");

    const getPlayer1 = () => player1;

    const getPlayer2 = () => player2;

    const getCurrentPlayer = () => currentPlayer;

    const setCurrentPlayer = (player) => currentPlayer = player;

    const switchTurns = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else if (currentPlayer === player2) {
            currentPlayer = player1;
        }
    }

    const checkForWin = (player) => {
        let currentGrid = Gameboard.getGrid();
        let naughtOrCross = player.naughtOrCross;

        if ((currentGrid[0] === naughtOrCross && currentGrid[1] === naughtOrCross && currentGrid[2] === naughtOrCross) || // Horizontal
           (currentGrid[3] === naughtOrCross && currentGrid[4] === naughtOrCross && currentGrid[5] === naughtOrCross) || // Horizontal
           (currentGrid[6] === naughtOrCross && currentGrid[7] === naughtOrCross && currentGrid[8] === naughtOrCross) || // Horizontal
           (currentGrid[0] === naughtOrCross && currentGrid[3] === naughtOrCross && currentGrid[6] === naughtOrCross) || // Vertical
           (currentGrid[1] === naughtOrCross && currentGrid[4] === naughtOrCross && currentGrid[7] === naughtOrCross) || // Vertical
           (currentGrid[2] === naughtOrCross && currentGrid[5] === naughtOrCross && currentGrid[8] === naughtOrCross) || // Vertical
           (currentGrid[0] === naughtOrCross && currentGrid[4] === naughtOrCross && currentGrid[8] === naughtOrCross) || // Diagonal
           (currentGrid[2] === naughtOrCross && currentGrid[4] === naughtOrCross && currentGrid[6] === naughtOrCross)) { // Diagonal
            return true;
           }

        return false;
    };

    const checkForDraw = () => {
        if (Gameboard.isGridFull()) {
            alert("It's a draw!");
            displayController.removeAllSquareEventListeners();
            return true;
        }
        else {
            return false;
        }
    }

    return { start, getPlayer1, setPlayer1, getPlayer2, setPlayer2, getCurrentPlayer, setCurrentPlayer, switchTurns, checkForWin, checkForDraw };
})();

function createPlayer (name, naughtOrCross) {

    let gamesWon = 0;

    const incrementWins = () => gamesWon++;

    const getGamesWon = () => gamesWon;

    return { name, naughtOrCross, incrementWins, getGamesWon };
}

const displayController = (function () {
    const gridContainer = document.querySelector("#tic-tac-toe-grid-container");

    const instantiateGrid = () => {
        gridContainer.replaceChildren();
        for (let i = 0; i < 9; i++) {
                const square = document.createElement("div");
                square.className = "square";
                square.dataset.indexNumber = i;
                gridContainer.appendChild(square);
            }

        for (const square of gridContainer.children)
        {
            square.addEventListener("click", fillSquare);
        }
    }

    const instantiateScoreDisplay = () => {
        const scoreDisplay = document.querySelector("#player-score-container");

        const playerOneScore = document.createElement("p");
        playerOneScore.id = "player-one-score";

        const playerTwoScore = document.createElement("p");
        playerTwoScore.id = "player-two-score";

        playerOneScore.textContent = GameManager.getPlayer1().name + ": " + GameManager.getPlayer1().getGamesWon();
        playerTwoScore.textContent = GameManager.getPlayer2().name + ": " + GameManager.getPlayer2().getGamesWon();

        scoreDisplay.appendChild(playerOneScore);
        scoreDisplay.appendChild(playerTwoScore);
    }

    const updateScoreDisplay = () => {
        const playerOneScore = document.querySelector("#player-one-score");
        const playerTwoScore = document.querySelector("#player-two-score");

        const playerOneName = GameManager.getPlayer1().name;
        const playerTwoName = GameManager.getPlayer2().name;

        playerOneScore.textContent = playerOneName + ": " + GameManager.getPlayer1().getGamesWon();
        playerTwoScore.textContent = playerTwoName + ": " + GameManager.getPlayer2().getGamesWon();
    }

    const displayWinMessage = (player) => {
        alert(player.name + " is the winner!");
    }

    const fillSquare = (e) => {
        const currentPlayerMark = GameManager.getCurrentPlayer().naughtOrCross;
        if (currentPlayerMark === "o") {
            e.target.innerHTML = "o";
        }
        else if (currentPlayerMark === "x") {
            e.target.innerHTML = "x";
        }
        Gameboard.fillSquare(e.target.dataset.indexNumber, currentPlayerMark);

        if (GameManager.checkForWin(GameManager.getCurrentPlayer())) {
            displayWinMessage(GameManager.getCurrentPlayer());
            GameManager.getCurrentPlayer().incrementWins();
            displayController.removeAllSquareEventListeners();
            displayController.updateScoreDisplay();
        }
        else {
            GameManager.checkForDraw();
        }

        GameManager.switchTurns();

        e.target.removeEventListener("click", fillSquare, false);
    }

    const removeAllSquareEventListeners = () => {
        for (const square of gridContainer.children) {
            square.removeEventListener("click", fillSquare);
        }
    }

    return { instantiateGrid, displayWinMessage, removeAllSquareEventListeners, instantiateScoreDisplay, updateScoreDisplay }
})();

const gameStartForm = document.getElementById("game-start-form");
const startGameButton = document.getElementById("start-button");

startGameButton.addEventListener("click", () => {
    const player1Name = document.getElementById("player1-name");
    const player2Name = document.getElementById("player2-name");

    if (player1Name.value.length !== 0) {
        GameManager.setPlayer1(player1Name.value);
    }
    else {
        GameManager.setPlayer1("Player 1");
    }
    if (player2Name.value.length !== 0) {
        GameManager.setPlayer2(player2Name.value);
    }
    else {
        GameManager.setPlayer2("Player 2");
    }
    displayController.instantiateScoreDisplay();
    GameManager.setCurrentPlayer(GameManager.getPlayer1());
    GameManager.start();
    gameStartForm.remove();
    
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Game";
    restartButton.addEventListener("click", () => {
        document.querySelector("#tic-tac-toe-grid-container").innerHTML = "";
        Gameboard.emptyGrid();
        GameManager.start();
    })
    
    const restartButtonContainer = document.querySelector("#restart-button-container");
    restartButtonContainer.appendChild(restartButton);

});