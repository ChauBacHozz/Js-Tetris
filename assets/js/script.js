let game_grid = document.querySelector('#game-grid');
let grids_width = game_grid.offsetWidth;
let grids_height = game_grid.offsetHeight;

let squares_onrow = grids_width / 30;
let squares_oncol = grids_height / 30;
let grids = [];
// draw game grid
for (let i = 0; i < squares_oncol; i++) {
    for (let j = 0; j < squares_onrow; j++) {
        let grid = document.createElement('div');
        grid.className = 'grid';
        game_grid.appendChild(grid);
        grids.push(grid);
    }
}
// tetromino types
let oTetromino = [
    [0, 1, squares_onrow, 1 + squares_onrow],
    [0, 1, squares_onrow, 1 + squares_onrow],
    [0, 1, squares_onrow, 1 + squares_onrow],
    [0, 1, squares_onrow, 1 + squares_onrow],
]

let zTetromino = [
    [0, 1, 1 + squares_onrow, 2 + squares_onrow],
    [2, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow*2],
    [0, 1, 1 + squares_onrow, 2 + squares_onrow],
    [2, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow*2]
]

let rv_zTetromino = [
    [1, 2, squares_onrow, 1 + squares_onrow],
    [0, squares_onrow, 1 + squares_onrow, 1 + squares_onrow*2],
    [1, 2, squares_onrow, 1 + squares_onrow],
    [0, squares_onrow, 1 + squares_onrow, 1 + squares_onrow*2]
] 

let tTetromino = [
    [1, squares_onrow, 1 + squares_onrow, 2 + squares_onrow],
    [1, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow*2],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow*2],
    [1, squares_onrow, 1 + squares_onrow, 1 + squares_onrow*2]
]

let iTetromino = [
    [0, squares_onrow, squares_onrow*2, squares_onrow*3],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 3 + squares_onrow],
    [0, squares_onrow, squares_onrow*2, squares_onrow*3],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 3 + squares_onrow]
]

let lTetromino = [
    [0, 1, 1 + squares_onrow, 1 + squares_onrow*2],
    [2, squares_onrow, 1 + squares_onrow, 2 + squares_onrow],
    [1, 1 + squares_onrow, 1 + squares_onrow*2, 2 + squares_onrow*2],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, squares_onrow*2]
]

let rv_lTetromino = [
    [0, 1, squares_onrow, squares_onrow*2],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 2 + squares_onrow*2],
    [1, 1 + squares_onrow, squares_onrow*2, 1 + squares_onrow*2],
    [0, squares_onrow, 1 + squares_onrow, 2 + squares_onrow]
]

let tetrominos = [
    oTetromino,
    zTetromino,
    rv_zTetromino,
    tTetromino,
    iTetromino,
    lTetromino,
    rv_lTetromino
]
function draw (tet, pos) {
    tet.forEach(e => {
        grids[pos+e].classList.add('tetromino');
    })
}

function undraw (tet, pos) {
    tet.forEach(e => {
        grids[pos+e].classList.remove('tetromino');
    })
}
let rotation = 0;
let current = 4;
let tetromino = tetrominos[Math.floor(Math.random() * 7)];
// let tetromino = tetrominos[3];

// tetromino auto move down
setInterval(() => {
    checkEdge();
    undraw(tetromino[rotation], current)
    current += squares_onrow;
    draw(tetromino[rotation], current);
}, 500)
function checkEdge() {
    if (grids.length - (tetromino[rotation][3] + current) < squares_onrow + 1 ||
    tetromino[rotation].some(e=> grids[e + current + squares_onrow].classList.contains('taken'))
    ) {
        tetromino[rotation].forEach(e => {
            grids[e + current].classList.add('taken');
        })
        tetromino = tetrominos[Math.floor(Math.random() * 7)];
        current = 4;
        rotation = 0;
        return true;
    }
    return false;
}
function leftEdge(tetromino) {
    return tetromino.some(e => (e + current) % squares_onrow == 0)
}
function rightEdge(tetromino) {
    return tetromino.some(e => (e + current) % squares_onrow == 11)
}
function rotate(tetromino) {
    rotation = ++rotation  %  4;
}
function fLength(tetromino) {
    return tetromino[3] % squares_onrow - tetromino[0] % squares_onrow + 1;
}
function move(e) {
    if (e.keyCode == 32) {
        if (!checkEdge()) {
            undraw(tetromino[rotation], current);
            rotate()
            draw(tetromino[rotation], current)        
        }
    }
    if (e.keyCode == 37) {
        moveLeft()
    }
    if (e.keyCode == 39) {
        moveRight()
    }
    if (e.keyCode == 40) {
        moveDown()
    }
}

function moveDown() {
    checkEdge();
    undraw(tetromino[rotation], current)
    current += squares_onrow;
    draw(tetromino[rotation], current);
    console.log(fLength(tetromino[rotation]));
    
}

function moveLeft() {
    if (tetromino[rotation].every(e=> !grids[e + current - 1].classList.contains('taken')) &&
    !leftEdge(tetromino[rotation])){
        undraw(tetromino[rotation], current)
        current -= 1;
        draw(tetromino[rotation], current);
        
    }

}
function moveRight() {
    if (tetromino[rotation].every(e=> !grids[e + current + 1].classList.contains('taken')) &&
     !rightEdge(tetromino[rotation]))
    {
        undraw(tetromino[rotation], current)
        current += 1;
        draw(tetromino[rotation], current);
        
    }
}

document.addEventListener('keydown', move);