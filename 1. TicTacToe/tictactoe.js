
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
    pos.x = floor(x / caseWidth);
    pos.y = floor(y / caseWidth);
    return pos
}

function aiPlay(player) {
    // let pos = random(available);
    let pos = bestMove();
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


function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner2() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(grid[i][0], grid[i][1], grid[i][2])) {
            winner = grid[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(grid[0][i], grid[1][i], grid[2][i])) {
            winner = grid[0][i];
        }
    }

    // Diagonal
    if (equals3(grid[0][0], grid[1][1], grid[2][2])) {
        winner = grid[0][0];
    }
    if (equals3(grid[2][0], grid[1][1], grid[0][2])) {
        winner = grid[2][0];
    }

    if (winner == null && available.length == 0) {
        return 'tie';
    } else {
        return winner;
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