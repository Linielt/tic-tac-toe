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
            // displayController.drawToSquare(num + 1, naughtOrCross);
        }
    }

    const getGrid = () => grid;

    const isGridFull = () => {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === "") {
                return false;
            }
        }

        return true;
    }


    return { getGrid, isNSquareFilled, fillSquare, isGridFull };
})();

const GameManager = (function () {
    let player1 = createPlayer("Player 1", "o"); // TODO - Allow user to add own names
    let player2 = createPlayer("Player 2" , "x");
    let currentTurn = player1;

    const start = () => {
        // console.log(Gameboard.getGrid());
        // while (true) {
        //     Gameboard.fillSquare(player1.chooseGridSpace(), player1.naughtOrCross);
        //     console.log(Gameboard.getGrid());
        //     if (checkForWin(player1)) break;
        //     if (checkForDraw()) break;
        //     Gameboard.fillSquare(player2.chooseGridSpace(), player2.naughtOrCross);
        //     console.log(Gameboard.getGrid());
        //     if (checkForWin(player2)) break;
        //     if (checkForDraw()) break;
        // }

        // while (true) {
        //     if (currentTurn == player1) { // Remove eventListener after clicking square
                
        //     }
        // }
    };

    const getCurrentTurn = () => currentTurn;

    const switchTurns = () => {
        if (currentTurn == player1) {
            currentTurn = player2;
        }
        else if (currentTurn == player2) {
            currentTurn = player1;
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
            console.log(player.name + " is the winner!");
            return true;
           }

        return false;
    };

    const checkForDraw = () => {
        if (Gameboard.isGridFull()) {
            console.log("It's a draw!")
            return true;
        }
        else {
            return false;
        }
    }

    return { start, getCurrentTurn, switchTurns, checkForWin, checkForDraw };
})();

function createPlayer (name, naughtOrCross) {

    const gamesWon = 0;
    const gamesLost = 0;
    
    // const chooseGridSpace = () => {
    //     let chosenSquare;
    //     while (true) {
    //         chosenSquare = prompt(name + " Pick a square (1 - 9)");
    //         if (chosenSquare < 1 || chosenSquare > 9 || Gameboard.isNSquareFilled(chosenSquare - 1, naughtOrCross)) {
    //             alert("Invalid square");
    //             continue;
    //         }

    //         return chosenSquare - 1;
    //     }
    // }

    const incrementWins = () => gamesWon++;
    const incrementLosses = () => gamesLost++;

    return { name, naughtOrCross, incrementWins, incrementLosses };
}

const displayController = (function () {
    const instantiateGrid = () => {
        const gridContainer = document.querySelector("#tic-tac-toe-grid-container");    
        
        gridContainer.replaceChildren();
        for (let i = 1; i <= 9; i++) {
                const square = document.createElement("div");
                square.id = "square_" + i;
                square.className = "square";
                gridContainer.appendChild(square);
            }

        for (const square of gridContainer.children)
        {
            square.addEventListener("click", fillSquare);
        }
    }

    const fillSquare = (e) => {
        if (GameManager.getCurrentTurn().naughtOrCross === "o") {
            e.target.innerHTML = "o";
        }
        else if (GameManager.getCurrentTurn().naughtOrCross === "x") {
            e.target.innerHTML = "x";
        }

        e.target.removeEventListener("click", fillSquare, false);
    }

    // const drawToSquare = (squareNum, naughtOrCross) => {
    //     const square = document.getElementById("square_" + squareNum);
    //     if (square.innerHTML == "") {
    //         square.innerHTML = naughtOrCross;
    //     }
    // }

    return { instantiateGrid }
})();

displayController.instantiateGrid();
GameManager.start();