
// 
function mouseClicked() {
    if (humanPlayers.includes(currentPlayer)) {
        let pos = getGridPosition(mouseX, mouseY);
        if (grid[pos.y][pos.x] == '') {
            grid[pos.y][pos.x] = players[currentPlayer];
            currentPlayer = nextPlayer(currentPlayer);
        }
    }

}


function getGridPosition(x, y) {
    let pos = {};
    // get x
    for (let i = 0; i < gridSize; i++) {
        if (caseWidth * i <= x && x < caseWidth * (i + 1)) {
            pos.x = i;
        }
        if (caseWidth * i <= y && y < caseWidth * (i + 1)) {
            pos.y = i;
        }
    }
    return pos
}

function aiPlay(player) {
    let pos = random(available);
    // let pos = bestMove(grid);
    // console.log('Minimax value for AI : ' + minimax(grid, false));
    // console.log('Next Best Move : ' + bestMove(grid).x + ', ' + bestMove(grid).y)
    grid[pos.y][pos.x] = players[player];
    currentPlayer = nextPlayer(currentPlayer);
}



function nextPlayer(currentPlayer) {
    if (players.length > currentPlayer + 1) {
        return ++currentPlayer;
    } else {
        return 0;
    }

}

function checkWinner(aGrid) {
    let winner = null;
    if (available.length == 0) {
        return 'Tie'
    }
    //horizontal
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {

            if (aGrid[i][j] != aGrid[i][0]) {
                winner = null;
                break;
            } else if (j == gridSize - 1 && aGrid[i][0] != '') {
                winner = aGrid[i][0];
                strokeWeight(10);
                line(0, caseHeight / 2 + caseHeight * i,
                    width, caseHeight / 2 + caseHeight * i);
                return winner;
            }

        }
    }


    //vertical
    for (let j = 0; j < gridSize; j++) {
        for (let i = 0; i < gridSize; i++) {

            if (aGrid[i][j] != aGrid[0][j]) {
                winner = null;
                break;
            } else if (i == gridSize - 1 && aGrid[0][j] != "") {
                winner = aGrid[0][j];
                strokeWeight(10);
                line(caseWidth / 2 + caseHeight * j, 0,
                    caseWidth / 2 + caseWidth * j, height);
                return winner;
            }

        }
    }


    //diagonal 1
    for (let i = 0; i < gridSize; i++) {

        if (aGrid[i][i] != aGrid[0][0]) {
            winner = null;
            break;
        } else if (i == gridSize - 1 && aGrid[0][0] != '') {
            winner = aGrid[0][0];
            strokeWeight(10);
            line(0, 0, width, height);
            return winner;
        }

    }

    //diagonal 2
    for (let i = 0; i < gridSize; i++) {

        if (aGrid[i][gridSize - i - 1] != aGrid[0][gridSize - 1]) {
            winner = null;
            break;
        } else if (i == gridSize - 1 && aGrid[0][gridSize - 1] != '') {
            winner = aGrid[0][gridSize - 1];
            strokeWeight(10);
            line(width, 0, 0, height)
            return winner;
        }

    }

    return null;


}

function drawX(pos) {
    line(caseWidth / 4 + caseWidth * pos.x, caseHeight / 4 + caseHeight * pos.y,
        3 * caseWidth / 4 + caseWidth * pos.x, 3 * caseHeight / 4 + caseHeight * pos.y);

    line(3 * caseWidth / 4 + caseWidth * pos.x, caseHeight / 4 + caseHeight * pos.y,
        caseWidth / 4 + caseWidth * pos.x, 3 * caseHeight / 4 + caseHeight * pos.y);

}

function drawO(pos) {
    circle(caseWidth / 2 + caseWidth * pos.x, caseHeight / 2 + caseHeight * pos.y, caseHeight / 2);
}

function drawGrid(gridSize) {
    for (let i = 1; i < gridSize; i++) {
        line(i * width / gridSize, 0, i * width / gridSize, height);
        line(0, i * height / gridSize, width, i * height / gridSize);
    }
}

function createGrid(gridSize) {
    let grid = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        grid[i] = new Array(gridSize);
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = '';
        }
    }
    return grid;
}