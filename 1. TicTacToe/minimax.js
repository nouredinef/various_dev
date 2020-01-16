
let scores = {
    X: 10,
    O: -10,
    tie: 0
}

function minimax(aGrid, depth, isMax) {
    let winner = checkWinner(aGrid,false);
    let positionList = available;

    if (winner) {
        return scores[winner];
    }

    if (isMax) {
        let maxEval = -Infinity;
        for (let i = 0; i < positionList.length; i++) {
            let pos = positionList[i];
            aGrid[pos.y][pos.x] = 'X';
            let val = minimax(aGrid, depth + 1, false);
            aGrid[pos.y][pos.x] = '';
            maxEval = max(val, maxEval);
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < positionList.length; i++) {
            let pos = positionList[i];
            aGrid[pos.y][pos.x] = 'O';
            let val = minimax(aGrid, depth + 1, true);
            aGrid[pos.y][pos.x] = '';
            minEval = min(val, minEval);
        }
        return minEval;
    }
}

function bestMove(player) {
    let move;
    let emptyPositions = available;

    if (scores[players[player]] > 0) {
        let bestScore = -Infinity;
        for (let i = 0; i < emptyPositions.length; i++) {
            let pos = emptyPositions[i];
            grid[pos.y][pos.x] = players[player];
            let score = minimax(grid, 0, false);
            grid[pos.y][pos.x] = '';

            if (score > bestScore) {
                bestScore = score;
                move = pos;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < emptyPositions.length; i++) {

            let pos = emptyPositions[i];
            grid[pos.y][pos.x] = players[player];
            let score = minimax(grid, 0, true);
            grid[pos.y][pos.x] = '';

            if (score < bestScore) {
                bestScore = score;
                move = pos;
            }
        }
    }
    return move;
}



function minimax2(grid, isMaxPlayer) {

    let winner = checkWinner(grid);
    if (winner !== null) {
        return scores[winner];
    }

    if (isMaxPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] == '') {
                    grid[i][j] = 'X';
                    let val = minimax(grid, false);
                    grid[i][j] = '';
                    maxEval = max(val, maxEval);
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] == '') {
                    grid[i][j] = 'O';
                    let val2 = minimax(grid, true);
                    grid[i][j] = '';
                    minEval = min(val2, minEval);
                }
            }
        }
        return minEval;
    }
}

function bestMove2() {
    let move;
    // Is maximizing player ?
    if (scores[players[currentPlayer]] > 0) {
        let bestScore = -Infinity;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] == '') {
                    grid[i][j] = 'X';
                    let score = minimax(grid, false);
                    grid[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = {x: j, y: i}
                    }
                }
            }
        }

    } else {
        let bestScore = Infinity;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] == '') {
                    grid[i][j] = 'O';
                    let score = minimax(grid, true);
                    grid[i][j] = '';
                    if (score < bestScore) {
                        bestScore = score;
                        move = {x: j, y: i}
                    }
                }
            }
        }

    }
    return move;
}