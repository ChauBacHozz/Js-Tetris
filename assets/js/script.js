var gr = document.querySelector('#game-grid');
var gr_width = gr.offsetWidth;
var sub_gr_width = 30;
var gr_height = gr.offsetHeight;

var squares_onrow = gr_width / sub_gr_width;
var squares_oncol = gr_height / sub_gr_width;

var count = 0;
for (let i = 0; i < squares_oncol + 2; i++) {
    for (let j = 0; j < squares_onrow; j++) {
        count++;
        var sub_gr = document.createElement('div');
        sub_gr.className = 'sub-gr';
        gr.appendChild(sub_gr);
    }
}
var sub_grs = Array.from(document.querySelectorAll('.sub-gr'));
const reverseLTetromino = [
    [1, 2, 1 + squares_onrow, 1 + squares_onrow*2],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 2 + squares_onrow * 2],
    [1, 1 + squares_onrow, squares_onrow * 2, 1 + squares_onrow * 2],
    [0, squares_onrow, 1 + squares_onrow, 2 + squares_onrow]
];

const lTetromino = [
    [0, 1, 1 + squares_onrow, 1 + squares_onrow * 2],
    [2, squares_onrow, 1 + squares_onrow, 2 + squares_onrow],
    [1, 1 + squares_onrow, 1 + squares_onrow * 2, 2 + squares_onrow * 2],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, squares_onrow * 2]
];

const tTetromino = [
    [1, squares_onrow, 1 + squares_onrow, 2 + squares_onrow],
    [1, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow * 2],
    [1, squares_onrow, 1 + squares_onrow, 1 + squares_onrow * 2]
];

const oTetromino = [
    [1, 2, 1 + squares_onrow, 2 + squares_onrow],
    [1, 2, 1 + squares_onrow, 2 + squares_onrow],
    [1, 2, 1 + squares_onrow, 2 + squares_onrow],
    [1, 2, 1 + squares_onrow, 2 + squares_onrow]
];

const iTetromino = [
    [1, 1 + squares_onrow, 1 + squares_onrow * 2, 1 + squares_onrow * 3],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 3 + squares_onrow], 
    [1, 1 + squares_onrow, 1 + squares_onrow * 2, 1 + squares_onrow * 3],
    [squares_onrow, 1 + squares_onrow, 2 + squares_onrow, 3 + squares_onrow] 
];

const reverseZTetromino = [
    [1, 2, squares_onrow, 1 + squares_onrow],
    [0, squares_onrow, 1 + squares_onrow, 1 + squares_onrow * 2],
    [1, 2, squares_onrow, 1 + squares_onrow],
    [0, squares_onrow, 1 + squares_onrow, 1 + squares_onrow * 2]
];

const zTetromino = [
    [0, 1, 1 + squares_onrow, 2 + squares_onrow],
    [2, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow * 2],
    [0, 1, 1 + squares_onrow, 2 + squares_onrow],
    [2, 1 + squares_onrow, 2 + squares_onrow, 1 + squares_onrow * 2]
];

const tetrominos = [
    reverseLTetromino,
    lTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
    reverseZTetromino,
    zTetromino
];

let current_pos = 5;

function draw(pos, tetris) {
    tetrominos.forEach(tetromino => {
        if (tetris === oTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.add('oTetromino');
            })
        }
        if (tetris === tTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.add('tTetromino');
            })
        }
        if (tetris === lTetromino || tetris === reverseLTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.add('lTetromino');
            })
        }
        if (tetris === iTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.add('iTetromino');
            })
        }
        if (tetris === zTetromino || tetris === reverseZTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.add('zTetromino');
            })
        }       
    });
}

function undraw(pos, tetris) {
    tetrominos.forEach(tetromino => {
        if (tetris === oTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.remove('oTetromino');
            })
        }
        if (tetris === tTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.remove('tTetromino');
            })
        }
        if (tetris === lTetromino || tetris === reverseLTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.remove('lTetromino');
            })
        }
        if (tetris === iTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.remove('iTetromino');
            })
        }
        if (tetris === zTetromino || tetris === reverseZTetromino) {
            tetris[0].forEach(x => {
                sub_grs[x + pos].classList.remove('zTetromino');
            })
        }       
    });
}

var tet = tetrominos[Math.floor(Math.random() * tetrominos.length)];
setInterval(() => {
    if (tet[0].some(x =>  sub_grs[current_pos + squares_onrow + x].classList.contains('taken'))) {
        tet[0].forEach(x => {
            sub_grs[current_pos + x].classList.add('taken');
        })
        tet = tetrominos[Math.floor(Math.random() * tetrominos.length)];
        current_pos = 5;
    }
    undraw(current_pos, tet)
    current_pos += squares_onrow;
    draw(current_pos, tet)
    if ( sub_grs.length - (current_pos + tet[0][3]) < squares_onrow){
        tet[0].forEach(x => {
            sub_grs[current_pos + x].classList.add('taken');
        })
        tet = tetrominos[Math.floor(Math.random() * tetrominos.length)];
        current_pos = 5;
    }
    
}, 800);

function moveLeft() {
    if (tet[0].every(x =>  !sub_grs[current_pos + squares_onrow + x].classList.contains('taken'))) {
        undraw(current_pos, tet);
        current_pos -= 1;
        draw(current_pos, tet);
        
    }
}

function moveRight() {
    if (tet[0].every(x =>  !sub_grs[current_pos + squares_onrow + x].classList.contains('taken'))) {
        undraw(current_pos, tet);
        current_pos += 1;
        draw(current_pos, tet);
        
    }
}

function moveDown() {
    if (tet[0].every(x =>  !sub_grs[current_pos + squares_onrow + x].classList.contains('taken'))
    || sub_grs.length - (current_pos + tet[0][3]) < squares_onrow) {
        undraw(current_pos, tet);
        current_pos += squares_onrow;
        draw(current_pos, tet);
        
    }
    else {
        
    }
}

function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    }
    if (e.keyCode === 39) {
        moveRight();
    }
    if (e.keyCode === 40) {
        moveDown();
    }
}
document.addEventListener('keydown', control);