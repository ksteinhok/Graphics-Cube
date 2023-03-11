var canvas = undefined;
var gl = undefined;
var time = 0.0;

function init() {
    canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.1, 0.1, 0.1, 1.0);

    square = new Square(gl);

    square.P = mat4();
    square.MV = mat4();

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    time += 1.0;

    square.MV = rotateX(time);

    square.render();

    requestAnimationFrame(render);
}

window.onload = init;