function setup() {
  createCanvas(400, 400);
  gridSize = 4;

  grid = createGrid(gridSize);
  caseWidth = width / gridSize;
  caseHeight = height / gridSize;
  noFill();
  strokeWeight(3);

  players = ['X', 'O'];
  currentPlayer = 0;
  console.log('Number of players : ', players.length);

  par = createP('');
  humanPlayers = [0];


  // frameRate(10);
}

function draw() {
  background(220);
  strokeWeight(3);
  drawGrid(gridSize);

  available = [];

  if (humanPlayers.includes(currentPlayer)) {
    par.html("Human's turn to play with " + players[currentPlayer])
  } else {
    par.html("AI's turn to play with " + players[currentPlayer])
  }


  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let pos = {};
      pos.x = i;
      pos.y = j;

      if (grid[j][i] == '') {
        available.push(pos);
      } else if (grid[j][i] == 'O') {
        drawO(pos);
      } else if (grid[j][i] == 'X') {
        drawX(pos);
      }

    }
  }

  winner = null;
  winner = checkWinner(grid, true);

  if (available.length === 0 || winner) {
    par.html("End of game");
    createP('The winner is : ' + winner);
    noLoop();
  } else {
    if (!humanPlayers.includes(currentPlayer)) {
      aiPlay(currentPlayer);
    }
  }


}