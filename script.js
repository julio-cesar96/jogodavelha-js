// initial data
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player  = '';
let warning = '';
let isPlaying = false;

reset();

// events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});


// functions
function itemClick(event) {
    const item = event.target.getAttribute('data-item');
    if (isPlaying && board[item] === '') {
        board[item] = player;
        renderBoard();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    for(let i in board) {
        board[i] = '';
    }

    isPlaying = true;

    renderBoard();
    renderInfo();
}

function renderBoard() {
    for (let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = board[i];
    }

    checkGame();

}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
     if (checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        isPlaying = false;
     } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        isPlaying = false;
     } else if (isFull()) {
        warning = 'Deu empate';
        isPlaying = false;
     }
}

function checkWinnerFor(player) {
    let possibility = [
        'a1, a2, a3',
        'b1, b2, b3',
        'c1, c2, c3',

        'a1, b1, c1',
        'a2, b2, c2',
        'a3, b3, c3',

        'a1, b2, c3',
        'a3, b2, c1'
    ];

    for(let w in possibility) {
        let possibilityArray = possibility[w].split(',');
        let hasWon = possibilityArray.every(option => board[option] === player);
        if (hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for (let i in board) {
        if (board[i] === '') {
            return false;
        }
    }

    return true;
}