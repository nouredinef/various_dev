
let scores = {
    X: 10,
    O: -10,
    tie: 0
}

function minimax(positionList, depth, isMax) {

    if (positionList.length == 0) {
        return scores[checkWinner()];
    }

    if (isMax) {
        let maxEval = -Infinity;
        for (let i = 0; i < positionList.length; i++) {
            let pos = positionList.shift();
            grid[pos.y][pos.x] = 'X';
            let val = minimax(positionList.slice(1), depth + 1, false);
            grid[pos.y][pos.x] = '';
            positionList.push(pos);
            maxEval = max(val, maxEval);
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < positionList.length; i++) {
            let pos = positionList.shift();
            grid[pos.y][pos.x] = 'O';
            let val = minimax(positionList.slice(1), depth + 1, true);
            grid[pos.y][pos.x] = '';
            positionList.push(pos);
            minEval = min(val, minEval);
        }
        return minEval;
    }
}

function bestMove(player) {
    let move;
    let emptyPositions = available;
    // is maximizing player ?
    if (scores[players[player]] > 0) {
        let bestScore = -Infinity;
        for (let i = 0; i < emptyPositions.length; i++) {
            let pos = emptyPositions.shift();
            console.log(pos);
            grid[pos.y][pos.x] = players[player];
            let score = minimax(emptyPositions, 0, false);
            grid[pos.y][pos.x] = '';
            console.log(score);

            if (score > bestScore) {
                bestScore = score;
                move = pos;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < available.length; i++) {

            let pos = available[i];
            grid[pos.y][pos.x] = players[player];
            let score = minimax(available, 0, true);
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

    let winner = checkWinner();
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
                    // console.log('MaxEval value : ' + maxEval);
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
                    // console.log('MaxEval value : ' + minEval);
                }
            }
        }
        return minEval;
    }
}

function bestMove2() {
    let move;
    let bestScore = -Infinity;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] == '') {
                grid[i][j] = 'X';
                let score = minimax(grid, false);
                grid[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    // move.y = i;
                    // move.x = j;
                    move = {x: j, y: i}
                }
            }
        }
    }
    return move;
}