document.addEventListener("DOMContentLoaded", (e) => {
  // Tracks X and O positions
  const gameBoard = (function () {
    const boardPositions = ["", "", "", "O", "X", "O", "", "", ""];

    const updateBoard = (moveChoice) =>
      (boardPositions[moveChoice] = gameController.playerShape);

    return {
      updateBoard,
      boardPositions,
      render: function () {
        displayController.render();
      },
    };
  })();

  // Renders the board and updates every play
  const displayController = (function () {
    //cache Dom

    let cachedPositions = [];
    for (let i = 0; i < gameBoard.boardPositions.length; i++) {
      cachedPositions[i] = document.getElementById(`zone${i + 1}`);
    }

    function render() {
      gameBoard.boardPositions.forEach(function (mark, index) {
        cachedPositions[index].innerText = mark;
      });
    }

    return { render };
  })(gameBoard);

  const player = (name, mark) => {
    const sayName = () => console.log(name);
    const takeTurn = () => {
      return mark;
    };
    return { takeTurn, sayName };
  };

  // Controls game state
  const gameController = (() => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");

    let playerShape = "";
    let moveChoice = "";

    gameBoard.render();
    playerShape = player1.takeTurn();

    const gameBoardDiv = document.querySelector(".gameBoardDiv");
    gameBoardDiv.addEventListener("click", (e) => {
      moveChoice = "";
      if (e.target.classList.contains("boardButtons")) {
        moveChoice = e.target.id;
        gameBoard.updateBoard(moveChoice);
        displayController.render();
        if (playerShape == "X") {
          playerShape = "O";
        } else if (playerShape == "O") {
          playerShape = "X";
        } else playerShape = "X";
      }
    });
    return { playerShape, moveChoice };
  })();
});
