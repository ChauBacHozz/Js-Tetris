var gr = document.querySelector('#game-grid');
var gr_width = gr.offsetWidth;
var gr_height = gr.offsetHeight;

console.log(gr_width + ' ' + gr_height) 
var count = 0;
var pos = []
for (let i = 0; i < gr_height/30 + 2; i++) {
    let a = [];
    for (let j = 0; j < gr_width/30; j++) {
        count++;
        var sub_gr = document.createElement('div');
        sub_gr.className = 'sub-gr';
        gr.appendChild(sub_gr);
        a.push(j);
    }
    pos.push(a);
}
console.log(pos);
