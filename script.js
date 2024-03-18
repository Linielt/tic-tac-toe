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
    const start = () => {
        let player1 = createPlayer("Player 1", "o"); // TODO - Allow user to add own names
        let player2 = createPlayer("Player 2" , "x");
        console.log(Gameboard.getGrid());
        while (true) {
            Gameboard.fillSquare(player1.chooseGridSpace(), player1.naughtOrCross);
            console.log(Gameboard.getGrid());
            if (checkForWin(player1)) break;
            if (checkForDraw()) break;
            Gameboard.fillSquare(player2.chooseGridSpace(), player2.naughtOrCross);
            console.log(Gameboard.getGrid());
            if (checkForWin(player2)) break;
            if (checkForDraw()) break;
        }
    };

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

    return { start, checkForWin, checkForDraw };
})();

function createPlayer (name, naughtOrCross) {
    
    const chooseGridSpace = () => {
        let chosenSquare;
        while (true) {
            chosenSquare = prompt(name + " Pick a square (1 - 9)");
            if (chosenSquare < 1 || chosenSquare > 9 || Gameboard.isNSquareFilled(chosenSquare - 1, naughtOrCross)) {
                alert("Invalid square");
                continue;
            }

            return chosenSquare - 1;
        }
    }

    return { name, naughtOrCross, chooseGridSpace };
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
            square.addEventListener("click", () => {
                square.innerHTML = "A";
            });
        }
    }
    return { instantiateGrid }
})();

displayController.instantiateGrid();
// GameManager.start();