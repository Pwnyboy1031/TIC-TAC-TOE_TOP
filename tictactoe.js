document.addEventListener("DOMContentLoaded", (e) => {
  // Tracks X and O positions
  const gameBoard = (function () {
    let boardPositions = ["", "", "", "", "", "", "", "", ""];

    const updateBoard = (moveChoice) =>
      boardPositions.splice(moveChoice, 1, gameController.getPlayerTurn());

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
        if(mark === "X") {
          cachedPositions[index].innerHTML = `<img src='graphics/heart.svg'/>`;
        } else if (mark === "O") {
          cachedPositions[index].innerHTML = `<img src='graphics/skull.svg'/>`;
        }
      });
    }

    return { render, cachedPositions };
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
    let winner = "";
    let gameOver = false;

    // Determines whose turn it is
    function getPlayerTurn() {
      if (turnCount % 2 == 0) {
        return player2.mark;
      } else {
        return player1.mark;
      }
    }

    function checkWin() {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      winningCombos.forEach((combo) => {
        if (
          gameBoard.boardPositions[combo[0]] ===
            gameBoard.boardPositions[combo[1]] &&
          gameBoard.boardPositions[combo[1]] ===
            gameBoard.boardPositions[combo[2]] &&
          gameBoard.boardPositions[combo[0]] !== ""
        ) {
          winner = gameBoard.boardPositions[combo[0]];
          console.log(winner);
        }
      });
    }

    function checkDraw() {
      if (gameBoard.boardPositions.every((position) => position != "")) {
        console.log("Draw");
      }
    }

    function takeTurn() {
      if (!gameOver) {
        gameBoardDiv.addEventListener("click", (e) => {
          moveChoice = "";
          if (e.target.classList.contains("boardButtons")) {
            if (e.target.innerHTML != "") {
              // invalid move
              takeTurn();
              console.log(gameBoard.boardPositions);
            } else {
              // Valid move
              moveChoice = e.target.id.replace("zone", "");
              gameBoard.updateBoard(moveChoice);
              displayController.render();
              turnCount += 1;
              console.log(gameBoard.boardPositions);
              console.log(displayController.cachedPositions);
              checkWin();
              checkDraw();
              if (winner != "") gameOver = true;
              if(gameOver){
                gameBoardDiv.removeEventListener("click", takeTurn);
                displayController.cachedPositions.forEach(function(el) {
                   el.removeEventListener("click", takeTurn);
                   el.disabled = true;
                });
                if (winner == "X") {
                  document.getElementById("outcomeBanner").innerHTML = `<img src='/graphics/heart.svg'/>` + "&nbsp;is the winner!"
                } else document.getElementById("outcomeBanner").innerHTML = `<img src='/graphics/skull.svg'/>` + "&nbsp;is the winner!"
                
             }
             
             
            }
          }
        });
      } else gameBoardDiv.removeEventListener("click", takeTurn);
      
    }

    gameBoard.render();
    takeTurn();

    return { playerShape, moveChoice, getPlayerTurn, gameOver };
  })();
});
