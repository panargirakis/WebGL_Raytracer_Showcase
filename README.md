# Structure and implementation notes:

The program starts by initializing the canvas and the webgl elements. By default, image number 1 is rendered. There are 3 different fragment shaders, one for each image. Only one vertex shader is used for all images. The main() function in the fragment shaders calls the initialize() function once and then the getRay() function for the main ray of each pixel and all subsequent reflection and refraction rays. The getRay() function calculates the color of each ray and the direction and intensity of reflection/refraction rays. getRay() calls getIntersectionSphere() and getIntersectionPlane() to calculate ray intersections.

## The program is comprised of 2 code files.

1) File rayTracing.html contains all the html code and defines the various html elements, the vertex shader and the 3 fragment shaders.
2) File WebGL.js contains the webgl code and the handlers for keystrokes.

# ~~~~~~~~~~USAGE~~~~~~~~~:

Open the rayTracing.html file using a WebGL compatible browser.

## Controls available to the user:
    1) 1: render image 1
    2) 2: render image 2
    3) 3: render image 3

## Extra credit controls:
    4) ArrowUP: increment camera y position in the positive direction
    5) ArrowDOWN: increment camera y position in the negative direction
    6) ArrowLEFT: increment camera x position in the negative direction
    7) ArrowRIGHT: increment camera x position in the positive direction

# Other Extra Credit features:

Refractions are supported. Refracted rays change direction only once when intersecting an object but are traced for multiple object intersections. To illustrate the feature, an additional refractive sphere is added in image 3. This sphere is the one all the way to the right of the canvas.
To support refractions, each object has a transparency and refractive index coefficient. The refractive index is passed into the refract() function.

# Notes on Color:
Two different modes of reflection/refraction color calculation are implemented in the main() function of each shader. The mode is chosen by commenting/uncommenting the corresponding line in code.

Mode 1:
**The color of a reflected ray is calculated irrespectively of the color of the object it bounces on.** This is the naive implementation. It implies that a purely red object, for example, will reflect all colors equally well.
'reflectionColor += recursiveRays[i].color * recursiveRays[i-1].reflectedRayIntensity;'

Mode 2:
**The color of a reflected ray is affected by the color of the object it bounces on.** This is the default for images 1,2. It implies that a black object will produce no reflections, a purely red object will only reflect red. In other words, the color of the reflecting object is multiplied with the color of the reflected ray.
'reflectionColor += recursiveRays[i-1].color * recursiveRays[i].color * recursiveRays[i].reflectedRayIntensity;'



