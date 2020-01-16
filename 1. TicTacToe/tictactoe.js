// Human player
function mouseClicked() {
    if (humanPlayers.includes(currentPlayer)) {
        let pos = getGridPosition(mouseX, mouseY);
        if (grid[pos.y][pos.x] == '') {
            grid[pos.y][pos.x] = players[currentPlayer];
            currentPlayer = nextPlayer(currentPlayer);
        }
    }

}

// AI player
function aiPlay(player) {

    let pos = bestMove(player);
    grid[pos.y][pos.x] = players[player];
    currentPlayer = nextPlayer(currentPlayer);
}


function getGridPosition(x, y) {
    let pos = {};
    pos.x = floor(x / caseWidth);
    pos.y = floor(y / caseWidth);
    return pos
}



function nextPlayer(currentPlayer) {
    if (players.length > currentPlayer + 1) {
        return ++currentPlayer;
    } else {
        return 0;
    }
}



function checkWinner(aGrid, showLine) {

    let winner = null;
    available = [];


    let winnerV = new Array(gridSize).fill(true);
    let winnerD1 = true;
    let winnerD2 = true;

    for (let i = 0; i < gridSize; i++) {

        let winnerH = true;
        for (let j = 0; j < gridSize; j++) {

            // Available positions
            if (aGrid[i][j] == '') {
                available.push({ y: i, x: j });
            }

            // Horizontal
            if (aGrid[i][j] != aGrid[i][0] || aGrid[i][j] == '') {
                winnerH = false;
            }
            // end of line, check if horizontal winner
            if (j == gridSize - 1 && winnerH) {
                winner = aGrid[i][0];
                if (showLine) {
                    strokeWeight(10);
                    line(0, caseHeight / 2 + caseHeight * i,
                        width, caseHeight / 2 + caseHeight * i);
                }
                return winner;
            }

            // Vertical
            if (aGrid[i][j] != aGrid[0][j] || aGrid[i][j] == '') {
                winnerV[j] = false;
            }
            // End of column, check if vertical winner
            if (i == gridSize - 1 && winnerV[j]) {
                winner = aGrid[0][j];
                if (showLine) {
                    strokeWeight(10);
                    line(caseWidth / 2 + caseHeight * j, 0,
                        caseWidth / 2 + caseWidth * j, height);
                }
                return winner;

            }


            // These should be outside this loop (multi verificaions...)
            // Diagonal 1
            if (aGrid[j][j] != aGrid[0][0] || aGrid[j][j] == '') {
                winnerD1 = false;
            }
            // Check if Diagonal winner
            if (j == gridSize - 1 && winnerD1) {
                winner = aGrid[0][0];
                if (showLine) {
                    strokeWeight(10);
                    line(0, 0, width, height);
                }
                return winner;
            }

            //Diagonal 2
            if (aGrid[j][gridSize - j - 1] != aGrid[0][gridSize - 1] || aGrid[j][gridSize - j - 1] == '') {
                winnerD2 = false;
            }
            if (j == gridSize - 1 && winnerD2) {
                winner = aGrid[0][gridSize - 1];
                if (showLine) {
                    strokeWeight(10);
                    line(width, 0, 0, height)
                }
                return winner;
            }
        }
    }

    if (available.length == 0) {
        return 'tie'
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