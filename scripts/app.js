// DOM Elements 
const container = document.querySelector('.game-container')
const startBtn = document.querySelector('.start')
const scoreSpan = document.querySelector('.score')

// Grid Variables 
const cells = []
const gridWidth = 20
const cellCount = gridWidth * gridWidth

let playerPosition = null
let alienPositions = []
let bombPosition = []
// const playerX = playerPosition % gridWidth
let timerId = null
let countRight = 0
let countLeft = 0


let laser = null
let laserPosition = []
let mothershipPosition = null 
let mothershipId = null

let score = 0
let isPlaying = false

// Game Variables 

// Game Functions

function generateAlien() {
  alienPositions.forEach(alien => {
    cells[alien].classList.add('aliens')
  })
}

function generateMothership () {
  setInterval(() => {
    mothershipPosition = 20
    moveMothership()
  }, 15000)
}

function moveMothership () {
  mothershipId = setInterval(()=>  {
    cells[mothershipPosition].classList.remove('mothership')
    mothershipPosition = mothershipPosition + 1
    cells[mothershipPosition].classList.add('mothership')
    if (mothershipPosition > 39) {
      clearInterval(mothershipId)
      cells[mothershipPosition].classList.remove('mothership') 
    }
  }, 500)
}

function winCondition () {
  if (alienPositions.length === 0) {
    window.alert('Player Wins')
  }
}

// Game Generation Creation

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    container.appendChild(cell)
    cell.innerHTML = i
    cells.push(cell)
  }
}

function generatePLayer () {
  playerPosition = 390
  cells[playerPosition].classList.add('player')
}

function generateFirstAliens () {
  for (let i = gridWidth; i <= (gridWidth + 10); i++) {
    cells[i].classList.add('aliens')
    alienPositions.push(i)
  } 
}
function generateSecondAliens () {
  for (let i = (gridWidth * 2); i <= ((gridWidth * 2) + 10); i++) {
    cells[i].classList.add('aliens')
    alienPositions.push(i)
  } 
}
function generateThirdAliens () {
  for (let i = (gridWidth * 3); i <= ((gridWidth * 3) + 10); i++) {
    cells[i].classList.add('aliens')
    alienPositions.push(i)
  } 
}

function generateTopBarrier () {
  for (let i = 0; i <= (gridWidth - 1); i++) {
    cells[i].classList.add('barrier')
  } 
}

function generateBottomBarrier () {
  for (let i = (gridWidth * gridWidth) - 1; i >= (gridWidth * gridWidth) - gridWidth; i--) {
    cells[i].classList.add('barrier-bottom')
  }  
}

// Alien Movement

function moveAlienRight () {
  alienPositions.forEach(alienPosition => {
    cells[alienPosition].classList.add('aliens')
    cells[alienPosition].classList.remove('aliens')
  })
  const aliensRight = alienPositions.map(alienPosition => {
    alienPosition ++
    return alienPosition
  })
  alienPositions = aliensRight
  generateAlien()
}

function moveAlienLeft () {
  alienPositions.forEach(alienPosition => {
    cells[alienPosition].classList.add('aliens')
    cells[alienPosition].classList.remove('aliens')
  })

  const aliensLeft = alienPositions.map(alienPosition => {
    alienPosition --
    return alienPosition
  })
  alienPositions = aliensLeft
  generateAlien()
}

function moveAlienDown() {
  alienPositions.forEach(alienPosition => {
    cells[alienPosition].classList.add('aliens')
    cells[alienPosition].classList.remove('aliens')
  })

  const aliensDown = alienPositions.map(alienPosition => {
    alienPosition += gridWidth
    return alienPosition
  })
  alienPositions = aliensDown
  generateAlien()
}

function startAlienMovementRight () {
  // isPlaying = true
  timerId = setInterval(() => {
    countRight++
    if (countRight === (gridWidth - 10)) {
      clearInterval(timerId)
      moveAlienDown()
      countLeft = 0
      startAlienMovementLeft()
    } else {
      moveAlienRight()
    }
  }, 200)
}
function startAlienMovementLeft () {
  timerId = setInterval(() => {
    countLeft ++
    if (countLeft === (gridWidth - 10)) {
      clearInterval(timerId)
      moveAlienDown()
      countRight = 0
      startAlienMovementRight()
    } else {
      moveAlienLeft()
    }
  }, 200)
}

//Bomb Functions

function alienBombs () { 
  setInterval(() => {
    const randomAlien = alienPositions[Math.floor(Math.random() * alienPositions.length)]
    bombPosition.push(randomAlien)
    cells[randomAlien].classList.add('bomb')
  }, 5000)
}

function alienBombMovement () {
  removeBomb()
  moveBombDown()
  generateBomb()
}

function moveBombDown () {
  bombPosition = bombPosition.map(bomb => {
    bomb += gridWidth
    return bomb
  })
}

function removeBomb() {
  bombPosition.forEach(bomb => {
    cells[bomb].classList.remove('bomb')
  }) 
}

function generateBomb() {
  bombPosition.forEach(bomb => {
    cells[bomb].classList.add('bomb')
  })
}


// Player Actions

function playerMovement (e){
  if (e.code === 'ArrowRight') {
    if (playerPosition === cells.length - 1) {
      return
    } moveRight()
  } else if (e.code === 'ArrowLeft') {
    if 
    (playerPosition === cells.length - gridWidth) {
      return
    } moveLeft()
  }
}

function moveLeft () {
  cells[playerPosition].classList.remove('player')
  playerPosition -- 
  cells[playerPosition].classList.add('player')
}

function moveRight () {
  cells[playerPosition].classList.remove('player')
  playerPosition ++ 
  cells[playerPosition].classList.add('player')
}

// Shooting

function shooting (e) {
  if (!isPlaying) {
    return
  }
  if (e.code === 'KeyS' ) {
    shoot()
  } else e.preventDefault()
  return
}

function shoot() {
  laser = (playerPosition - gridWidth)
  laserPosition.push(laser)
  generateLaser()
} 


function moveLaserUp () {
  laserPosition = laserPosition.map(laser => {
    if (laser < (gridWidth - 1)) {
      const overshoot = laserPosition.indexOf(laser)
      laserPosition.splice(overshoot, 1)
    } 
    laser -= gridWidth
    return laser
  })
}

function removeLaser() {
  laserPosition.forEach(laser => {
    cells[laser].classList.remove('laser')
  }) 
}

function generateLaser() {
  laserPosition.forEach(laser => {
    cells[laser].classList.add('laser')
  })
}


function gamePlay () {
  startBtn.style.visibility = 'hidden'
  isPlaying = true
  startAlienMovementRight()
  alienBombs()
  generateMothership()
  setInterval(() => {
    checkHit()
    alienBombMovement()
    checkBombHit()
    winCondition()
  }, 100)
}




function laserMovement () {
  removeLaser()
  moveLaserUp()
  generateLaser()
}

// Collision Checks 

function checkHit() {
  laserPosition.forEach(laser => {
    if (cells[laser].classList.contains('aliens')) {
      cells[laser].classList.remove('laser')
      cells[laser].classList.remove('aliens')

      const deadAlien = alienPositions.indexOf(laser)
      alienPositions.splice(deadAlien, 1)
      
      const laserToRemove = laserPosition.indexOf(laser)
      laserPosition.splice(laserToRemove, 1) 

      score += 100
      scoreSpan.innerText = score

    } else if (cells[laser].classList.contains('barrier')) {
      const laserToRemove = laserPosition.indexOf(laser)
      laserPosition.splice(laserToRemove, 1)  
      cells[laser].classList.remove('laser')

    } else if (cells[laser].classList.contains('mothership')) {
      cells[laser].classList.remove('laser')
      cells[laser].classList.remove('mothership')
      clearInterval(mothershipId)
      
      const laserToRemove = laserPosition.indexOf(laser)
      laserPosition.splice(laserToRemove, 1) 

      score += 250
      scoreSpan.innerText = score 
    } else {
      return
    }
  })
}

function checkBombHit() {
  bombPosition.forEach(bomb => {
    if (cells[bomb].classList.contains('player')) {
      cells[bomb].classList.remove('player')
      cells[bomb].classList.remove('bomb')
      
      const bombToRemove = bombPosition.indexOf(bomb)
      bombPosition.splice(bombToRemove, 1) 

    } else if (cells[bomb].classList.contains('barrier-bottom')) {

      const bombToRemove = bombPosition.indexOf(bomb)
      bombPosition.splice(bombToRemove, 1)  
      cells[bomb].classList.remove('bomb')
      
    } else {
      return
    }
  })
}



createGrid()
generatePLayer()
generateFirstAliens()
generateSecondAliens()
generateThirdAliens()
generateTopBarrier()
generateBottomBarrier()
setInterval(() => {
  laserMovement()
}, 300)


// Events

document.addEventListener('keydown', playerMovement)
document.addEventListener('keyup', shooting)
startBtn.addEventListener('click', gamePlay)
