let attempts = 10;
        let score = 0;
        let treasurePosition;
        let gameActive = true;
    
        function initializeGame() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'treasure-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        grid.appendChild(cell);
    }
    treasurePosition = Math.floor(Math.random() * 25);
    updateDisplay();
}

function handleCellClick(event) {
    if (!gameActive) return;
    
    const clickedIndex = parseInt(event.target.dataset.index);
    attempts--;

    if (clickedIndex === treasurePosition) {
        event.target.innerHTML = '💎';
        score += attempts * 10;
        gameActive = false;
        document.getElementById('hint').textContent = 'Congratulations! You found the treasure! 🎉';
    } else {
        const distance = getDistance(clickedIndex, treasurePosition);
        event.target.innerHTML = '❌';
        updateHint(distance);
    }

    if (attempts <= 0 && gameActive) {
        gameActive = false;
        document.getElementById('hint').textContent = 'Game Over! The treasure was not found 😢';
        revealTreasure();
    }

    updateDisplay();
}

function getDistance(index1, index2) {
    const row1 = Math.floor(index1 / 5);
    const col1 = index1 % 5;
    const row2 = Math.floor(index2 / 5);
    const col2 = index2 % 5;
    const direction = getDirection(row1, col1, row2, col2);
    return { distance: Math.abs(row1 - row2) + Math.abs(col1 - col2), direction: direction };
}

function getDirection(row1, col1, row2, col2) {
    if (row1 === row2 && col1 < col2) return 'right';
    if (row1 === row2 && col1 > col2) return 'left';
    if (col1 === col2 && row1 < row2) return 'down';
    if (col1 === col2 && row1 > row2) return 'up';
    return 'unknown';
}

function updateHint(distance) {
    const hint = document.getElementById('hint');
    if (distance.distance <= 2) {
        hint.textContent = `Very hot! The treasure is near! 🔥 It's to the ${distance.direction} of your current position.`;
    } else if (distance.distance <= 4) {
        hint.textContent = `Warm! Getting closer! 😊 It's to the ${distance.direction} of your current position.`;
    } else {
        hint.textContent = `Cold! Try another spot! ❄️ It's to the ${distance.direction} of your current position.`;
    }
}

function updateDisplay() {
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('score').textContent = score;
}

function revealTreasure() {
    const cells = document.querySelectorAll('.treasure-cell');
    cells[treasurePosition].innerHTML = '💎';
}

function resetGame() {
    attempts = 10;
    gameActive = true;
    document.getElementById('hint').textContent = 'Start hunting for the treasure! 🔍';
    initializeGame();
}

// Initialize the game when the page loads
initializeGame();