const selectBox = document.querySelector('.select-box')
const playerX = document.querySelector('.playerX')
const playerO = document.querySelector('.playerO')

const playBoard = document.querySelector('.play-board')
const allBox = document.querySelectorAll('section span')
const players = document.querySelector('.players')

const resultBox = document.querySelector('.result-box')
const wonText = resultBox.querySelector('.won-text')
const replayBtn = resultBox.querySelector('button')

let runBot = true

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute('onClick', 'clickedBox(this)')
  }
}

playerX.addEventListener('click', () => {
  selectBox.classList.add('hide')
  playBoard.classList.add('show')
})

playerO.addEventListener('click', () => {
  selectBox.classList.add('hide')
  playBoard.classList.add('show')
  players.setAttribute('class', 'players active player')
  //playBoard.setAttribute('class', 'players active player')
})

let playerXIcon = 'fas fa-times'
let playerOIcon = 'far fa-circle'

let playerSign = 'X'

// User click function
function clickedBox (element) {
  //console.log(element)
  if (runBot) {
    if (players.classList.contains('player')) {
      let sound = new Audio('yellow.mp3')
      sound.play()

      element.innerHTML = `<i class="${playerOIcon}"></i>`
      players.classList.remove('active')

      playerSign = 'O'
      element.setAttribute('id', playerSign)
    } else {
      let sound = new Audio('blue.mp3')
      sound.play()

      element.innerHTML = `<i class="${playerXIcon}"></i>`
      players.classList.add('active')

      element.setAttribute('id', playerSign)
    }
    selectWinner()

    playBoard.style.pointerEvents = 'none'

    element.style.pointerEvents = 'none'

    setTimeout(() => {
      bot(runBot)
    }, 1000)
  }
}

// Bot click function
function bot (runBot) {
  if (runBot) {
    playerSign = 'O'
    let emptyBoxes = []

    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount === 0) {
        emptyBoxes.push(i)
        //console.log(i + ' ' + 'has no children')
      }
    }

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]
    console.log(randomBox)

    if (emptyBoxes.length > 0) {
      if (players.classList.contains('player')) {
        let sound = new Audio('blue.mp3')
        sound.play()

        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`
        players.classList.add('active')

        playerSign = 'X'
        allBox[randomBox].setAttribute('id', playerSign)
      } else {
        let sound = new Audio('yellow.mp3')
        sound.play()

        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`
        players.classList.remove('active')

        allBox[randomBox].setAttribute('id', playerSign)
      }

      selectWinner()
    }

    allBox[randomBox].style.pointerEvents = 'none'

    playBoard.style.pointerEvents = 'auto'

    playerSign = 'X'

    //console.log(emptyBoxes)
  }
}

// Deciding winner
function getClass (boxNumber) {
  return document.querySelector('.box' + boxNumber).id
}

function checkThreeIDs (val1, val2, val3, sign) {
  if (
    getClass(val1) === sign &&
    getClass(val2) === sign &&
    getClass(val3) === sign
  ) {
    return true
  }
}

function selectWinner () {
  if (
    checkThreeIDs(1, 2, 3, playerSign) ||
    checkThreeIDs(4, 5, 6, playerSign) ||
    checkThreeIDs(7, 8, 9, playerSign) ||
    checkThreeIDs(1, 4, 7, playerSign) ||
    checkThreeIDs(2, 5, 8, playerSign) ||
    checkThreeIDs(3, 6, 9, playerSign) ||
    checkThreeIDs(1, 5, 9, playerSign) ||
    checkThreeIDs(3, 5, 7, playerSign)
  ) {
    //console.log(playerSign + ' ' + 'is the winner!')
    runBot = false
    //bot(runBot)

    wonText.innerHTML = `Player <span>${playerSign}</span> won the game!`

    playBoard.classList.remove('show')
    resultBox.classList.add('show')
  } else {
    if (
      getClass(1) !== '' &&
      getClass(2) !== '' &&
      getClass(3) !== '' &&
      getClass(4) !== '' &&
      getClass(5) !== '' &&
      getClass(6) !== '' &&
      getClass(7) !== '' &&
      getClass(8) !== '' &&
      getClass(9) !== ''
    ) {
      runBot = false

      wonText.innerHTML = `Match has been drawn!`

      playBoard.classList.remove('show')
      resultBox.classList.add('show')
    }
  }
}

// Replay Game
replayBtn.addEventListener('click', () => {
  window.location.reload()
})
