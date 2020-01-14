function setup() {
  createCanvas(400, 400);
  gridSize = 3;

  grid = createGrid(gridSize);
  caseWidth = width / gridSize;
  caseHeight = height / gridSize;
  noFill();
  strokeWeight(3);

  players = ['X', 'O'];
  currentPlayer = 0;
  console.log('Number of players : ', players.length);

  par = createP('');
  humanPlayers = [1];

  // frameRate(1);
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

      if (grid[j][i] == 'O') {
        drawO(pos);
      } else if (grid[j][i] == 'X') {
        drawX(pos);
      }

    }
  }

  winner = null;
  winner = checkWinner(grid);
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