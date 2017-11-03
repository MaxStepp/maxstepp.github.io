

var el = document.querySelector('.graph-chart');

var options = {
    percent:  el.getAttribute('data-percent') || 25,
    size: el.getAttribute('data-size') || 150,
    lineWidth: el.getAttribute('data-line') || 10,
    rotate: el.getAttribute('data-rotate') || 0
};

var canvas = document.createElement('canvas');

if (typeof(G_vmlCanvasManager) !== 'undefined') {
    G_vmlCanvasManager.initElement(canvas);
}

var ctx = canvas.getContext('2d');
canvas.width = canvas.height = options.size;
el.appendChild(canvas);

ctx.translate(options.size / 2, options.size / 2); // change center
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

var radius = (options.size - options.lineWidth) / 2;
var drawCircle = function(color, lineWidth, percent) {
    percent = Math.min(Math.max(0, percent || 1), 1);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
};

drawCircle('#f1f1ee', options.lineWidth, 100 / 100);
drawCircle('#f6d656', options.lineWidth, options.percent / 100);

//Функция скрывающая/раскрывающая граф
function hideGraph() {
    if(document.querySelector(".ios-switch-hide").checked){
        document.querySelector(".main-page-wrapper__graph").style.visibility = "hidden" ;
    }else {
        document.querySelector(".main-page-wrapper__graph").style.visibility = "visible" ;
    }
}
//Функция изменяющая граф при изменение value и проверка значений
function changeGraph(input){
    if (input.value < 0) input.value = 0;
    if (input.value > 100) input.value = 100;
    options.percent = input.value;
    drawCircle('#f1f1ee', options.lineWidth, 100 / 100);
    drawCircle('#f6d656', options.lineWidth, options.percent / 100);
    if (options.percent == 0){
        drawCircle('#f1f1ee', options.lineWidth, 100 / 100);
    }
}
//Функция анимация графа от 1% до значения указанного в поле value
function animatedGraph() {
    if(document.querySelector(".ios-switch-animation").checked){
        drawCircle('#f1f1ee', options.lineWidth, 100 / 100);
        var finalValue = document.querySelector('.switch__value').value;//Конечное значение
        var startValue = 1;
        setInterval(function() {
            if (startValue < finalValue){
                startValue++;
                drawCircle('#f6d656', options.lineWidth, startValue / 100)}}, 50);} else {
        drawCircle('#f1f1ee', options.lineWidth, 100 / 100);
        drawCircle('#f6d656', options.lineWidth, options.percent / 100);
    }
};

