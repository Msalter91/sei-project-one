// DOM Elements 
const container = document.querySelector('.game-container')
const startBtn = document.querySelector('.start')
const scoreSpan = document.querySelector('.score')
const livesLeft = document.querySelector('.lives')
const gameOverSplash = document.querySelector('.game-over')
const playAgain = document.querySelector('.continue')
const levelUpBox = document.querySelector('.level-up')
const levelUpPara = document.querySelector('.level-indicator')
const nextLevelButton = document.querySelector('.next-level')
const showLevel = document.querySelector('.level-now')
const audioElement = document.querySelector('audio')

// Grid Variables 
const cells = []
const gridWidth = 20
const cellCount = gridWidth * gridWidth

//Timing variables
let timerId = null
let mothershipId = null
let countRight = 0
let countLeft = 0
let gameTimer = null
let alienBombTimer = null
let mothershipGenerationId = null
let laserMovementId = null

//Position Arrays 
let alienPositions = []
let bombPosition = []
let laserPosition = []

// Single-Object Positions 
let mothershipPosition = null 
let playerPosition = null
let laser = null

//Game Variables
let score = 0
let isPlaying = false
let playerLives = 3
let level = 1
let baseSpeed = 200
let alienBombSpeed = 2000
let mothershipSpeed = 15000


// Game Functions

function generateAlien() {
  alienPositions.forEach(alien => {
    cells[alien].classList.add('aliens')
  })
}

function generateMothership () {
  mothershipGenerationId = setInterval(() => {
    mothershipPosition = gridWidth
    moveMothership()
  }, mothershipSpeed)
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

function reset () {
  gameOverSplash.style.display = 'none'
  startBtn.style.visibility = 'visible'
  cells.forEach(cell => {
    cell.classList.remove('aliens')
  })
  cells.forEach(cell => {
    cell.classList.remove('laser')
  })
  cells.forEach(cell => {
    cell.classList.remove('mothership')
  })
  cells.forEach(cell => {
    cell.classList.remove('bomb')
  })
  alienPositions = []
  laserPosition = []
  generateFirstAliens()
  generateSecondAliens()
  generateThirdAliens()
  playerLives = 3
  countLeft = 0
  countRight = 0
  score = 0
  level = 1
} 

function playNextLevel () {
  levelUpBox.style.display = 'none'
  startBtn.style.visibility = 'visible'
  cells.forEach(cell => {
    cell.classList.remove('aliens')
  })
  cells.forEach(cell => {
    cell.classList.remove('mothership')
  })
  cells.forEach(cell => {
    cell.classList.remove('bomb')
  })
  cells.forEach(cell => {
    cell.classList.remove('laser')
  })
  alienPositions = []
  laserPosition = []
  generateFirstAliens()
  generateSecondAliens()
  generateThirdAliens()
  countLeft = 0
  countRight = 0
  startBtn.innerHTML = `Start Level ${level}`
}

// Game Set-up Functions 

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    container.appendChild(cell)
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

function determineSpeed () {
  baseSpeed = 200 - (level * 10)
  alienBombSpeed = 2000 - (level * 50)
  mothershipSpeed = 15000 - (level * 700)
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
  }, baseSpeed)
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
  }, baseSpeed)
}

//Bomb Functions

function alienBombs () { 
  alienBombTimer = setInterval(() => {
    const randomAlien = alienPositions[Math.floor(Math.random() * alienPositions.length)]
    bombPosition.push(randomAlien)
    cells[randomAlien].classList.add('bomb')
  }, alienBombSpeed)
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


// Player Movments 

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
  cells[playerPosition].classList.remove('right')
  cells[playerPosition].classList.remove('player')
  playerPosition -- 
  cells[playerPosition].classList.add('player')
}

function moveRight () {
  cells[playerPosition].classList.remove('player')
  cells[playerPosition].classList.remove('right')
  playerPosition ++ 
  cells[playerPosition].classList.add('player')
  cells[playerPosition].classList.add('right')
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

function laserMovement () {
  removeLaser()
  moveLaserUp()
  generateLaser()
}

function winCondition () {
  if (alienPositions.length === 0) {
    clearInterval(gameTimer)
    clearInterval(timerId)
    clearInterval(alienBombTimer)
    clearInterval(mothershipId)
    clearInterval(mothershipGenerationId)
    clearInterval(laserMovementId)
    levelUpBox.style.display = 'flex'
    levelUpPara.innerHTML = `Congratulations you have beaten level ${level}.`
    level = level + 1
  }
}

function gameOver () {
  clearInterval(gameTimer)
  clearInterval(timerId)
  clearInterval(alienBombTimer)
  clearInterval(mothershipId)
  clearInterval(mothershipGenerationId)
  clearInterval(laserMovementId)
  gameOverSplash.style.display = 'flex'
}

function gamePlay () {
  startBtn.style.visibility = 'hidden'
  isPlaying = true
  determineSpeed()
  startAlienMovementRight()
  alienBombs()
  generateMothership()
  laserMovementId = setInterval(() => {
    laserMovement()
  }, 300)
  gameTimer = setInterval(() => {
    checkHit()
    alienBombMovement()
    checkBombHit()
    winCondition()
    checkLoss()
  }, 100)
  audioElement.currentTime = 80
  audioElement.play()
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

      playerLives -= 1
      livesLeft.innerHTML = playerLives

    } else if (cells[bomb].classList.contains('barrier-bottom')) {

      const bombToRemove = bombPosition.indexOf(bomb)
      bombPosition.splice(bombToRemove, 1)  
      cells[bomb].classList.remove('bomb') 
    } else {
      return
    }
  })
}

function checkLoss () {
  alienPositions.forEach(alien => {
    if (cells[alien].classList.contains('barrier-bottom')) {
      gameOver()
    } else if (playerLives === 0) {
      gameOver()
    }
  })
}

// Functions to run at start up
createGrid()
generatePLayer()
generateFirstAliens()
generateSecondAliens()
generateThirdAliens()
generateTopBarrier()
generateBottomBarrier()
showLevel.innerHTML = `${level}`



// Event listener

document.addEventListener('keydown', playerMovement)
document.addEventListener('keyup', shooting)
startBtn.addEventListener('click', gamePlay)
playAgain.addEventListener('click', reset)
nextLevelButton.addEventListener('click', playNextLevel)
