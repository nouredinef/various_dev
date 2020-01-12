
let scores = {
    X: 1,
    O: -1,
    tie: 0
}

function minimax2(positionList, depth, isMax) {
    if (positionList.length == 0) {
        return scores[checkWinner(grid)];
    }

    if (isMax) {
        maxEval = -Infinity;
        for (let i = 0; i < positionList.length; i++) {
            const pos = positionList[i];

        }
    } else {

    }
}







function minimax(grid, isMaxPlayer) {

    let winner = checkWinner();
    if (winner !== null) {
        return scores[winner];
    }

    if (isMaxPlayer) {
        let maxEval = -Infinity;
        for (let j = 0; j < gridSize; j++) {
            for (let i = 0; i < gridSize; i++) {
                if (grid[i][j] == '') {
                    grid[i][j] = 'X';
                    let eval = minimax(grid, false);
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
                    let eval = minimax(grid, true);
                    grid[i][j] = '';
                    minEval = min(eval, minEval);
                    // console.log('MaxEval value : ' + minEval);
                }
            }
        }
        return minEval;
    }
}

function bestMove() {
    let move = {
        x: -1,
        y: -1
    };
    let bestScore = -Infinity;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] == '') {
                grid[i][j] = 'X';
                let score = minimax(grid, false);
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