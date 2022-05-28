let turn = "X";
let count = 0;
let gameover = false;
let audioturn = new Audio("turn.wav");
let audiowin = new Audio("winner.wav");
let audioover = new Audio("gameover.wav");

const changeturn = () => {
  return turn === "X" ? "0" : "X";
};

const checkwin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  win.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtexts[e[0]].innerText + " won";
      gameover = true;
      count=0;
      audiowin.play();
    }
  });
};

let box = document.getElementsByClassName("box");
Array.from(box).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && gameover==false) {
      boxtext.innerText = turn;
      count += 1;
      turn = changeturn();
      checkwin();
      if (count == 9) {
        audioover.play();
        gameover = true;
        count = 0;
        document.getElementsByClassName("info")[0].innerText = "Game Draw";
      }
      if (!gameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
        audioturn.play();
      }
    }
  });
});

reset.addEventListener("click", () => {
  if (gameover) {
    audiowin.load();
    let boxtext = document.querySelectorAll(".boxtext");
    Array.from(boxtext).forEach((element) => {
      element.innerText = "";
    });
    turn = "X";
    gameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  }
  else{
      if (count!=0){
        alert("You Can Not Reset Game Now, You Have To Finish First.");
      }
  }
});
