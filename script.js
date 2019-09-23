let li = document.querySelectorAll("li"); // 이미지가 담긴 li tag
let isGaming = false; // start 버튼을 누르면, 게임 중에 다시 눌러도 reset되지 않게 방지함.

let clickNumber = 0; // 총 게임의 기회는 10번으로 제한
let addHoleValue = null; // 4초 뒤 두더지 제거(@setTimeout) 함수를 중지하기 위해 만든 변수

let scoreValue = 0; // 두더지 클릭 시 10점 추가
let score = document.querySelector(".score"); // score가 담긴 클라스 (@header-div)

let locationArr = []; //랜덤으로 선정된 위치를 저장하는 배열
let randomNumber; // 랜덤으로 위치 선정

//게임 반복
function playGame () { 
  makeLocation();
  setTimeout(addMole, 1000);
  addHoleValue = setTimeout(addHole, 4000);
};

//랜덤으로 위치 선정
function makeLocation () {

  function makeRandom (arr, number) {
    let i = 0;
    while (arr.length < 2) {
      number = Math.floor(Math.random() * 9);
      if(!arr.includes(number)) {
        arr.push(number);
      }
      i++;
    };
  };

  if(locationArr.length === 0) {
    makeRandom(locationArr, randomNumber);
  } else {
    locationArr.shift();
    makeRandom(locationArr, randomNumber);
  }
};

//두더지 추가 + clickNumber +1씩 증가
function addMole () {
  clickNumber++;
  li[locationArr[0]].firstElementChild.setAttribute("src", "mole.jpg");
  li[locationArr[0]].classList.add("mole");
};

//두더지 사라짐 + clickNumber 10이하면 게임 반복 + 10이상이면 점수나타내기 함수 실행
function addHole () {
  li[locationArr[0]].firstElementChild.setAttribute("src", "hole.jpg");
  li[locationArr[0]].classList.remove("mole");
  if(clickNumber < 10) {
    playGame();
  } else {
    showScore();
  };
};

//점수 화면에 보여주기 + start버튼의 값 "RESTART"로 변경 
function showScore () {
  start.innerHTML = "RESTART";
  score.innerHTML = "SCORE : " + scoreValue;
};

let start = document.querySelector(".start");
start.addEventListener("click", function () {
  if(isGaming === false) {
    isGaming = true;
    start.innerHTML = "Gaming..";
    playGame();    
  }

  //clickNumber가 10번 이상이면, clickNumber와 점수 reset, 게임 반복 함수 실행
  if(clickNumber >= 10) {
    clickNumber = 0;
    scoreValue = 0;
    start.innerHTML = "Gaming..";
    score.innerHTML = "SCORE : -";
    playGame();
  }
});

for(let i = 0 ; i < li.length; i++) {
  li[i].addEventListener("click", function () {
    if(event.currentTarget.classList.contains("mole")) {
      //두더지를 클릭할 경우, 구멍 이미지로 변경
      event.currentTarget.firstChild.setAttribute("src", "hole.jpg");
      event.currentTarget.classList.remove("mole");

      //setTimeout 함수로 구성된 두더지 사라지는 함수 중지, 게임 반복 함수 재 실행
      if(addHoleValue !== null) {
        clearTimeout(addHoleValue);
        if(clickNumber < 10) {
          playGame();
        }
      }
      
      scoreValue += 10; //클릭 시 점수 +10

      //clickNuber가 10일 경우 점수 나타내기
      if(clickNumber === 10) {
        start.innerHTML = "RESTART";
        score.innerHTML = "SCORE : " + scoreValue;
      }
    }
  });
};
