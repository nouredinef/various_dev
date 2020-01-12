
let scores = {
    X: 1,
    O: -1,
    tie: 0
}

function minimax(positionList, depth, isMax) {

    if (positionList.length == 0) {
        return scores[checkWinner(grid)];
    }

    if (isMax) {
        let maxEval = -Infinity;
        for (let i = 0; i < positionList.length; i++) {
            const pos = positionList.shift();
            grid[pos.y][pos.x] = 'X';
            let eval = minimax(positionList, depth + 1, !isMax);
            grid[pos.y][pos.x] = '';
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < positionList.length; i++) {
            const pos = positionList.shift();
            grid[pos.y][pos.x] = 'O';
            let eval = minimax(positionList, depth + 1, !isMax);
            grid[pos.y][pos.x] = '';
        }
        return minEval;
    }
}

function bestMove2(player) {
    let move = { x: -1, y: -1 };
    // is maximizing player ?
    if (scores[players[player]] > 0) {
        let bestScore = -Infinity;
        for (let i = 0; i < available.length; i++) {

            const pos = available[i];
            grid[pos.y][pos.x] = player;
            let score = minimax(available, 0, false);
            grid[pos.y][pos.x] = '';

            if (score > bestScore) {
                bestScore = score;
                move.y = i;
                move.x = j;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < available.length; i++) {

            const pos = available[i];
            grid[pos.y][pos.x] = player;
            let score = minimax(available, 0, true);
            grid[pos.y][pos.x] = '';

            if (score < bestScore) {
                bestScore = score;
                move.y = i;
                move.x = j;
            }
        }
    }
    return move;
}



function minimax2(grid, isMaxPlayer) {

    let winner = checkWinner2();
    if (winner !== null) {
        return scores[winner];
    }

    if (isMaxPlayer) {
        let maxEval = -Infinity;
        for (let j = 0; j < gridSize; j++) {
            for (let i = 0; i < gridSize; i++) {
                if (grid[i][j] == '') {
                    grid[i][j] = 'X';
                    let eval = minimax2(grid, false);
                    grid[i][j] = '';
                    maxEval = max(eval, maxEval);
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
                    let eval = minimax2(grid, true);
                    grid[i][j] = '';
                    minEval = min(eval, minEval);
                    // console.log('MaxEval value : ' + minEval);
                }
            }
        }
        return minEval;
    }
}

function bestMove2() {
    let move = { x: -1, y: -1 };
    let bestScore = -Infinity;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] == '') {
                grid[i][j] = 'X';
                let score = minimax2(grid, false);
                grid[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move.y = i;
                    move.x = j;
                }
            }
        }
    }
    return move;
}