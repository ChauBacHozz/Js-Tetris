var gr = document.querySelector('#game-grid');
var gr_width = gr.offsetWidth;
var gr_height = gr.offsetHeight;

console.log(gr_width + ' ' + gr_height) 
var count = 0;
for (let index = 0; index < (gr_width/30) * (gr_height/30); index++) {
    count++;
    var sub_gr = document.createElement('div');
    sub_gr.className = 'sub-gr';
    gr.appendChild(sub_gr);

}
console.log(count);
