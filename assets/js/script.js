let game_grid = document.querySelector('#game-grid');
let game_score = document.querySelector('#score');
let grids_width = game_grid.offsetWidth;
let grids_height = game_grid.offsetHeight;
let lose_scr = document.querySelector('#lose-scr')
let start_btn = document.querySelector('#start-btn');
let squares_onrow = grids_width / 30;
let squares_oncol = grids_height / 30;
let rows = [];
let grids = [];
let points = 0;
let colors = ['lightcoral', 'lightgreen', 'lightblue','lightseagreen','lightsalmon'];
// draw game grid
for (let i = 0; i < squares_oncol * squares_onrow; i+=squares_onrow) {
    let row = [];
    for (let j = 0; j < squares_onrow; j++) {
        row.push(i + j);
        let grid = document.createElement('div');
        grid.className = 'grid';
        game_grid.appendChild(grid);
        grids.push(grid);
    }
    rows.push(row);
}
for (let i = 0; i < squares_onrow*4; i++) {
    grids[i].setAttribute("style", "visibility: hidden;");
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
function draw (tet, pos,col) {

    tet.forEach(e => {
        
        grids[pos+e].style.background = color;
    })
}

function undraw (tet, pos) {
    tet.forEach(e => {
        grids[pos+e].style.background = 'white';
    })
}
let rotation = 0;
let current = 4;
let tetromino = tetrominos[Math.floor(Math.random() * 7)];
let gameLoop = 0;
let color = colors[Math.floor(Math.random() * 5)];
// tetromino auto move down
function gameLooping() {
    gameLoop = setInterval(() => {
        checkLose();
        checkEdge();
        undraw(tetromino[rotation], current)
        current += squares_onrow;
        draw(tetromino[rotation], current, color);
    }, 500)

};
function checkEdge() {
    if (grids.length - (tetromino[rotation][3] + current) < squares_onrow + 1 ||
    tetromino[rotation].some(e=> grids[e + current + squares_onrow].classList.contains('taken'))
    ) {
        tetromino[rotation].forEach(e => {
            grids[e + current].classList.add('taken');
        })
        color = colors[Math.floor(Math.random() * 5)];
        tetromino = tetrominos[Math.floor(Math.random() * 7)];
        current = 4;
        rotation = 0;
        // console.log(tetromino);
        
        if (takenRow().length != 0) {
            let tRow_arr = takenRow();
            let count = 0;
            for (let i = 0; i < tRow_arr.length; i++) {
                tRow_arr[i].forEach(x => {
                    grids[x].classList.remove('taken');
                    grids[x].style.background = 'white';
                                        
                })
                count++;
            }
            for (let j = tRow_arr[0][0] - 1; j >= 0; j--) {
                if (grids[j].classList.contains('taken')) {
                    grids[j].classList.remove('taken');
                    grids[j + squares_onrow*count].classList.add('taken');
                    let cl = grids[j].style.background;
                    grids[j].style.background = 'white';
                    grids[j + squares_onrow*count].style.background = cl;
                }                       
            }
            points += count * 10;
            game_score.innerHTML = points;
           
        }
        return true;
    }
    return false;
}

// check pieces position
function leftEdge(tetromino) {
    return tetromino.some(e => (e + current) % squares_onrow == 0)
}
function rightEdge(tetromino) {
    return tetromino.some(e => (e + current) % squares_onrow == 11)
}
// move tetromino around
function rotate() {
    if (!checkEdge()) {
        if (!(leftEdge(tetromino[(rotation + 1) % 4]) 
        && rightEdge(tetromino[(rotation + 1) % 4]))) {
            undraw(tetromino[rotation], current);
            rotation = ++rotation % 4;
            draw(tetromino[rotation], current);
        }
    }

}
function move(e) {
    if (e.keyCode == 32) {
        rotate();
    }
    if (e.keyCode == 37) {
        moveLeft();
    }
    if (e.keyCode == 39) {
        moveRight();
    }
    if (e.keyCode == 40) {
        moveDown();
    }
}

function moveDown() {
    checkEdge();
    undraw(tetromino[rotation], current)
    current += squares_onrow;
    draw(tetromino[rotation], current, color);
    
}

function moveLeft() {
    if (tetromino[rotation].every(e=> !grids[e + current - 1].classList.contains('taken')) &&
    !leftEdge(tetromino[rotation])){
        undraw(tetromino[rotation], current)
        current -= 1;
        draw(tetromino[rotation], current, color);
        
    }
    
}
function moveRight() {
    if (tetromino[rotation].every(e=> !grids[e + current + 1].classList.contains('taken')) &&
     !rightEdge(tetromino[rotation]))
    {
        undraw(tetromino[rotation], current)
        current += 1;
        draw(tetromino[rotation], current, color);
        
    }
}
document.addEventListener('keydown', move);

function takenRow() {
    let tRow = [];
    rows.forEach(e => {
        if (e.every(x => grids[x].classList.contains('taken'))){
            tRow.push(e);
        }
    })
    return tRow;
}

start_btn.onclick = () => {
    if (gameLoop == 0) {
        grids.forEach(x => {
            x.classList.remove('taken');
            x.classList.remove('tetromino');
            lose_scr.setAttribute("style", "display: none;");
            points = 0;
            game_score.innerHTML = points;
        })
        gameLooping();
    } else if (gameLoop == -1) {
        gameLooping();
    } else {
        clearInterval(gameLoop);
        gameLoop = -1;  
    }
    
}
function checkLose() {
    for (let i = squares_onrow * 3; i < squares_onrow * 4; i++) {
        if (grids[i].classList.contains('taken')) {
            clearInterval(gameLoop);
            gameLoop = 0;
            lose_scr.setAttribute("style", "display: block;");

        }        
    }
}