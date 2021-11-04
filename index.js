const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.7
let timerId = 0

function startGame() {
    //removes snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //removes apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
    // re add new score
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    // reaadd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function createGrid() {
    for (let i = 0; i < width * width; i++) {
        //create element
        const square = document.createElement('div')
        //add styling to the element
        square.classList.add('square')
        //put the element into our grid
        grid.appendChild(square)
        //push it into a new squares array    
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) || //if you hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || // if you hit right 
        (currentSnake[0] % width === 0 && direction === -1) || // if you hit left
        (currentSnake[0] - width < 0 && direction === -width) || // if you hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId)

    //removes last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //adds square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it

    if (squares[currentSnake[0]].classList.contains('apple')) {
        //removes the class of apple 
        squares[currentSnake[0]].classList.remove('apple')
        //grow the snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow our snake array
        currentSnake.push(tail)
        //generate new apple 
        generateApple()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApple()

function control(e) {
    if (e.keyCode === 39) {
        // right presses
        direction = 1
    } else if (e.keyCode === 38) {
        // up pressed
        direction = -width
    } else if (e.keyCode === 37) {
        //left passed
        direction = -1
    } else if (e.keyCode === 40) {
        //down pressed
        direction = +width
    }
}

document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)