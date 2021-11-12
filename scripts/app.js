// DOM Elements 
const container = document.querySelector('.game-container')
const startBtn = document.querySelector('.start')
console.log(startBtn)

// Grid Variables 
const cells = []
const gridWidth = 20
const cellCount = gridWidth * gridWidth

let playerPosition = null
let alienPositions = []
const playerX = playerPosition % gridWidth
let timerId = null
let countRight = 0
let countLeft = 0

let laserPosition = []

// Game Variables 

// Functions

function generateAlien() {
  alienPositions.forEach(alien => {
    cells[alien].classList.add('aliens')
  })
}

// Board Creation

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    container.appendChild(cell)
    cells.push(cell)
  }
}

function generatePLayer () {
  playerPosition = 390
  cells[playerPosition].classList.add('player')
}

function generateFirstAliens () {
  for (let i = 0; i <= 10; i++) {
    cells[i].classList.add('aliens')
    alienPositions.push(i)
  } 
}
function generateSecondAliens () {
  for (let i = 20; i <= 30; i++) {
    cells[i].classList.add('aliens')
    alienPositions.push(i)
  } 
}
function generateThirdAliens () {
  for (let i = 40; i <= 50; i++) {
    cells[i].classList.add('aliens')
    alienPositions.push(i)
  } 
  console.log(alienPositions)
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

  const aliensRight = alienPositions.map(alienPosition => {
    alienPosition --
    return alienPosition
  })
  alienPositions = aliensRight
  generateAlien()
}

function moveAlienDown() {
  alienPositions.forEach(alienPosition => {
    cells[alienPosition].classList.add('aliens')
    cells[alienPosition].classList.remove('aliens')
  })

  const aliensRight = alienPositions.map(alienPosition => {
    alienPosition += 20
    console.log(alienPositions)
    return alienPosition
  })
  alienPositions = aliensRight
  generateAlien()
}

function startAlienMovementRight () {
  timerId = setInterval(() => {
    countRight++
    if (countRight === 10) {
      clearInterval(timerId)
      moveAlienDown()
      countLeft = 0
      startAlienMovementLeft()
    } else {
      moveAlienRight()
    }
  }, 500)
}
function startAlienMovementLeft () {
  timerId = setInterval(() => {
    countLeft ++
    if (countLeft === 10) {
      clearInterval(timerId)
      moveAlienDown()
      countRight = 0
      startAlienMovementRight()
    } else {
      moveAlienLeft()
    }
  }, 500)
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
  if (e.code === 'Space' ) {
    shoot()
  }
}

function shoot() {
  const laserStart = (playerPosition - 20)
  laserPosition.push(laserStart)
  console.log(laserPosition)
 
  setInterval(() => {
    const laserMove = laserPosition.forEach(laser => {
      laser -= 20
      console.log(laserMove)
    })
  }, 500)  

  
} 


createGrid()
generatePLayer()
generateFirstAliens()
generateSecondAliens()
generateThirdAliens()
// startAlienMovementRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienRight()
// moveAlienDown()
// moveAlienLeft()
// moveAlienLeft()
// Events

document.addEventListener('keyup', playerMovement)
document.addEventListener('keyup', shooting)
startBtn.addEventListener('click', startAlienMovementRight)
