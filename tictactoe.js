document.addEventListener("DOMContentLoaded", (e) => {
  // Tracks X and O positions
  const gameBoard = (function () {
    let boardPositions = ["", "", "", "", "", "", "", "", ""];

    const updateBoard = (moveChoice) =>
      (boardPositions.splice(moveChoice,1,gameController.getPlayerTurn()))

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
      cachedPositions[i] = document.getElementById(`zone${i}`);
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
    return { sayName, name, mark };
  };

  // Controls game state
  const gameController = (() => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");
    const gameBoardDiv = document.querySelector(".gameBoardDiv");

    let playerShape = "";
    let moveChoice = "";
    let turnCount = 1;

    function getPlayerTurn() {
      if (turnCount % 2 == 0) {
        return player2.mark;
      } else {
        return player1.mark;
      }
    }

    function takeTurn() {
      gameBoardDiv.addEventListener("click", (e) => {
        moveChoice = "";
        if (e.target.classList.contains("boardButtons")) {
          moveChoice = e.target.id.replace("zone", "");
          gameBoard.updateBoard(moveChoice);
          displayController.render();
          turnCount +=1;
        }
      });  
    }

    gameBoard.render();
    takeTurn();


    return { playerShape, moveChoice, getPlayerTurn};
  })();
});
