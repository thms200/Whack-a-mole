let locationArr = [];
let randomNumer;
let li = document.querySelectorAll("li");

let clickNumber = 0;
let repeatGame = null;
let addHoleValue = null;

let scoreValue = 0;
let score = document.querySelector(".score");

let start = document.querySelector(".start");
start.addEventListener("click", function () {
  start.innerHTML = "Gaming.."

  function makeLocation () {

    function makeRandom (arr, number) {
      let i = 0;
      while (arr.length < 2) {
        number = Math.floor(Math.random() * 9);
        if(!arr.includes(number)) {
          arr.push(number);
        };
        i++;
      };
    };

    if(locationArr.length === 0) {
      makeRandom(locationArr, randomNumer);
    } else {
      locationArr.shift();
      makeRandom(locationArr, randomNumer);
    };

    console.log(locationArr);
  }

  function addMole () {
    clickNumber++;
    li[locationArr[0]].firstElementChild.setAttribute("src", "mole.jpg");
    li[locationArr[0]].classList.add("mole");
  }

  function addHole () {
    li[locationArr[0]].firstElementChild.setAttribute("src", "hole.jpg");
    li[locationArr[0]].classList.remove("mole");
    if(clickNumber < 10) {
      repeatGame();
    };
  }

  (repeatGame = function playGame () { 
    makeLocation();
    setTimeout(addMole, 1000);
    addHoleValue = setTimeout(addHole, 4000);
  })();
});

for(let i = 0 ; i < li.length; i++) {
  li[i].addEventListener("click", function () {
    if(event.currentTarget.classList.contains("mole")) {
      event.currentTarget.firstChild.setAttribute("src", "hole.jpg");
      event.currentTarget.classList.remove("mole");
      if(addHoleValue !== null) {
        clearTimeout(addHoleValue);
        if(clickNumber < 10) {
          setTimeout(repeatGame,0)
        }
      }
      scoreValue += 10;
    }
  })
}


