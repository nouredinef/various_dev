
scores = {
    'X': 1,
    'O': -1,
    'Tie': 0
}


function minimax(aGrid, isMaxPlayer) {
    winner = checkWinner(aGrid);
    if (winner != null) {
        console.log('The winner is ' + winner);
        return scores[winner];
    }

    if (isMaxPlayer) {
        maxEval = -Infinity;
        for (let j = 0; j < gridSize; j++) {
            for (let i = 0; i < gridSize; i++) {
                if (aGrid[i][j] == '') {
                    aGrid[i][j] = 'X';
                    maxEval = max([maxEval, minimax(aGrid, false)]);
                    aGrid[i][j] = '';
                    // console.log('MaxEval value : ' + maxEval);
                }
            }
        }
        return maxEval;
    } else {
        minEval = Infinity;
        for (let j = 0; j < gridSize; j++) {
            for (let i = 0; i < gridSize; i++) {
                if (aGrid[i][j] == '') {
                    aGrid[i][j] = 'O';
                    minEval = min([minEval, minimax(aGrid, true)]);
                    aGrid[i][j] = '';
                    // console.log('MaxEval value : ' + minEval);
                }

            }
        }
        return minEval;
    }
}

function bestMove(aGrid) {
    let move = {};
    let bestScore = -Infinity;
    for (let j = 0; j < gridSize; j++) {
        for (let i = 0; i < gridSize; i++) {
            if (aGrid[i][j] == '') {
                aGrid[i][j] = 'X';
                score = minimax(aGrid, true)
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