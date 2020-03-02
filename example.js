var program;

let rayX = 0.0;
let rayY = 0.0;
let incChangeEye = 0.02;

let id;

function main()
{
    handleKeys();

    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    program = initShaders(gl, "vshader", "fshader");
    gl.useProgram(program);

    gl.viewport( 0, 0, canvas.width, canvas.height );

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    render();
}

// handles keypresses
function handleKeys() {
    window.onkeydown = function(event)
    {
        let key = event.key;
        switch (key) {
            case "ArrowRight": {
                rayX += incChangeEye;
                break;
            }
            case "ArrowLeft": {
                rayX -= incChangeEye;
                break;
            }
            case "ArrowUp": {
                rayY += incChangeEye;
                break;
            }
            case "ArrowDown": {
                rayY -= incChangeEye;
                break;
            }
        }
    };
}

function updateEye() {
    gl.uniform1f(gl.getUniformLocation(program,
        "lightx"), rayX);
    gl.uniform1f(gl.getUniformLocation(program,
        "lighty"), rayY);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let buffer = gl.createBuffer();

    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    updateEye();

    gl.aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    id = requestAnimationFrame(render);
}