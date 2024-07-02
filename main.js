// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 down!!
// 랜던번호가 > 유저번호 up!!
// reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다


let randomNumber = 0;
let userInput = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let answerButton = document.getElementById("answer-button");
let resultImage = document.querySelector(".result-image");
let resultText = document.querySelector(".result-text");
let resultAnswer = document.querySelector(".result-answer");

let chanceArea = document.getElementById("chance-area");
let chances = 3;
let gameOver = false;

let history = [];


const pickRandomNumber = () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(randomNumber);
  return randomNumber;
}

const play = () => {
  let userNumber = parseInt(userInput.value);

  if (userNumber < 1 || userNumber > 100) {
    resultImage.style.backgroundImage = "url(/assets/images/number.gif)";
    resultText.textContent = "1~100 사이의 숫자를 입력해주세요";
    return;
  }

  if (history.includes(userNumber)) {
    resultImage.style.backgroundImage = "url(/assets/images/number.gif)";
    resultText.textContent = "이미 입력했던 숫자입니다.";
    return;
  }

  chances--;
  chanceArea.textContent = `남은 찬스 : ${chances}번`;

  if (chances < 1) {
    if (userNumber === randomNumber) {
      resultImage.style.backgroundImage = "url(/assets/images/clap.gif)";
      resultText.textContent = "맞춰버렸습니다~";
      gameOver = true;
    } else {
      resultImage.style.backgroundImage = "url(/assets/images/gameover.gif)"
      resultText.textContent = "게임오버!! 마셔라~ 마셔라~ 마셔라~"
      resultAnswer.textContent = `정답은 ${randomNumber} 입니다.`
      gameOver = true;
    }

  }

  if (gameOver) {
    playButton.disabled = true;
    return;
  }

  if (userNumber < randomNumber) {
    resultImage.style.backgroundImage = "url(/assets/images/up.gif)";
    resultText.textContent  = "Up!!"
  } else if (userNumber > randomNumber) {
    resultImage.style.backgroundImage = "url(/assets/images/down.gif)";
    resultText.textContent  = "Down!!"
  } else {
    resultImage.style.backgroundImage = "url(/assets/images/clap.gif)";
    resultText.textContent  = "맞춰버렸습니다~"
    playButton.disabled = true;
  }

  history.push(userNumber);
}

const reset = () => {
  // user Input 초기화
  userInput.value = "";
  // result Image 초기화
  resultImage.style.backgroundImage = "url(/assets/images/start.gif)";
  // result Text 초기화
  resultText.textContent = "숫자를 맞춰보세요!"
  //result Answer 초기화
  resultAnswer.textContent = "";
  // playButton 활성화
  playButton.disabled = false;
  // chance 초기화
  chances = 3;
  chanceArea.textContent = `남은 찬스 : ${chances}번`;
  // gameOver 초기화
  gameOver = false;
  // history 초기화
  history = [];
  // 새로운 랜덤번호 지정
  pickRandomNumber();
}

pickRandomNumber();

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", () => {
  userInput.value = "";
});
answerButton.addEventListener("click", () => {
  resultAnswer.textContent = `정답은 ${randomNumber} 입니다.`
});