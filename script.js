let indexArr = [];
let randomIndex;
let li = document.querySelectorAll("li");

//9개의 위치를 랜덤으로 정하기
function selectLocation () {
  let i = 0;
  while (indexArr.length < 9) {
    randomIndex = Math.floor(Math.random() * 9);
    if(!indexArr.includes(randomIndex)) {
      indexArr.push(randomIndex);
    }
    i++;
  }
}

//3초마다 두더지 나오기 (단, 첫번째 두더지는 1초뒤에 실행)
function playGame () {
  selectLocation();
  setTimeout(function() {
    li[indexArr[0]].firstElementChild.setAttribute("src", "mole.jpg")
  },1000);

  for(let i = 1; i < li.length; i++) {
    (function(j){
      setTimeout(function() {
        li[indexArr[j]].firstElementChild.setAttribute("src", "mole.jpg")
        console.log(i)
      }, j * 3000);
    })(i)
  }
}
