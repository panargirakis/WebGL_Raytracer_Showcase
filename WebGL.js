// EXTRA CREDIT:
//  refractions are supported. See the rayTracing.html file and README.md file.
//  The arrow keys are used for changing the x,y coordinates of the camera.
//  Soft reflections. Reflections are affected by the angle of intersection.

let program;

let rayX = 0.0;
let rayY = 0.5;
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

    program = initShaders(gl, "vshader", "fshader1");
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
                render();
                break;
            }
            case "ArrowLeft": {
                rayX -= incChangeEye;
                render();
                break;
            }
            case "ArrowUp": {
                rayY += incChangeEye;
                render();
                break;
            }
            case "ArrowDown": {
                rayY -= incChangeEye;
                render();
                break;
            }
            case "1": {
                program = initShaders(gl, "vshader", "fshader1");
                gl.useProgram(program);
                rayY = 0.5;
                rayX = 0.0;
                render();
                break;
            }
            case "2": {
                program = initShaders(gl, "vshader", "fshader2");
                rayY = 0.0;
                rayX = 0.0;
                gl.useProgram(program);
                render();
                break;
            }
            case "3": {
                program = initShaders(gl, "vshader", "fshader3");
                rayY = 1.0;
                rayX = 0.0;
                gl.useProgram(program);
                render();
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
}