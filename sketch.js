let thetaX = thetaY = thetaZ = 0.0; // initialize rotation to zero
let transX = transY = transZ = 0.0; // initialize translation to zero
let d = 0; // initialize shear 0
let sx = sy = sz = 1.0; // initiliaze scale 1
let resetButton;
let cnv;
let myFont;
    
function setup() {
  
  cnv = createCanvas(720, 480, WEBGL);
  setupGUI(); // set up buttons and all

}


function draw() {
  init(); // setup background and lights
  
  push();
  translate_mat(transX, transY, transZ);
  rotateX_mat(-thetaY); // can you see why this is negative thetaY?
  rotateY_mat(thetaX); // can you see why I am using thetaX for rotation about Y axis?
  rotateZ_mat(thetaZ); // no rotation about Z implemented.
  shear_mat(d);
  scale_mat(sx, sy, sz);
  torus(200, 5, 5, 5);
  torus(100, 20, 24, 16);
  torus(150, 8, 15, 10);
  drawFrame(); // draw a coordinate frame also
  pop();  

}

function setupGUI()
{

  resetButton = createButton('reset');
  resetButton.mousePressed(reset); // call reset function when pressed 
  
  cnv.mouseWheel(changeSize); //call changeSize() only when scrolling is performed on canvas.
  
  createP('Click and drag left mouse button for rotation.');
  createP('Click and drag right mouse button for translation.');
  createP('Click and drag middle mouse button or use wheel for zooming.');
  createP('Press the left arrow to increase shear and right arrow to decrease');
  
}

function changeSize(event)
{  
  if (event.deltaX > 0) {
    sx = sx + 0.1;
  }  else {
    sx = sx - 0.1;
  }
  if (event.deltaY > 0) {
    sy = sy + 0.1;
  } else {
    sy = sy -0.1;
  }
  if (event.deltaZ > 0){
    sz = sz + 0.1;
  } else {
    sz = sz - 0.1;
  }
}
  
function init()
{
  background(0);
  setupLights();
  angleMode(DEGREES);  
}

function reset()
{
  // the following has the effect of setting transformation matrix to identity
 
  thetaX = thetaY = thetaZ = 0.0; 
  transX = transY = transZ = 0.0;
  sx = sy = sz = 1.0;
  d = 0;
  
}

function setupLights()
{
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
  
  ambientLight(50);
  directionalLight(255, 0, 0, 0, -10, 0); //red light
  pointLight(0, 0, 255, locX, locY, 250); //blue light
  specularMaterial(250);
}

//following function is called anytime mouse is dragged
function mouseDragged() 
{
  let dx = mouseX - pmouseX; 
  let dy = mouseY - pmouseY;

  if (mouseButton === LEFT)
    {
      thetaX += dx/2.0;
      thetaY += dy/2.0;
    }
 
  if (mouseButton === RIGHT)
    {
      transX += dx/2.0;
      transY += dy/2.0;
    }
  
  if (mouseButton === CENTER)
    {
      transZ += dy/2.0;
    }
	
}

function keyPressed() {
  if (keyCode == LEFT_ARROW){
    d = d+0.5;
  }
  if (keyCode == RIGHT_ARROW){
    d = d-0.5;
  }
}

function translate_mat(transX, transY, transZ)
{
  applyMatrix(1, 0, 0, 1, transX, transY, transZ)
}

function rotateX_mat(thetaY)
{
  let ctx = cos(-thetaY);
  let stx = sin(-thetaY);
  
  applyMatrix( 1.0, 0.0, 0.0, 0.0,
               0.0, ctx, -stx,  0.0,
               0.0, stx,  ctx,  0.0,
               0.0, 0.0, 0.0, 1.0);
}

function rotateY_mat(thetaX)
{
  let cty = cos(thetaX);
  let sty = sin(thetaX);
  
  applyMatrix( cty, 0.0, sty, 0.0,
               0.0, 1.0, 0.0, 0.0,
              -sty, 0.0, cty, 0.0,
               0.0, 0.0, 0.0, 1.0);
  
}

function rotateZ_mat(thetaZ)
{
  let ctz = cos(thetaZ);
  let stz = sin(thetaZ);
  
  applyMatrix( ctz, -stz, 0.0, 0.0,
               stz,  ctz, 0.0, 0.0,
               0.0,  0.0, 1.0, 0.0,
               0.0,  0.0, 0.0, 1.0);
  
}

function scale_mat(sx, sy, sz) {
   applyMatrix(  sx, 0.0, 0.0, 0.0,
               0.0,  sy, 0.0, 0.0,
               0.0,  0.0, sz, 0.0,
               0.0,  0.0, 0.0, 1.0);
}
function shear_mat(d){
    applyMatrix(  1.0, d, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0);
}


function drawFrame()
{
  strokeWeight(2.0);

  stroke('red');
  line(0.0, 0.0, 0.0, 50.0, 0.0, 0.0); // x-axis
  stroke('blue');
  line(0.0, 0.0, 0.0, 0.0, 50.0, 0.0); //y-axis
  stroke('green');
  line(0.0, 0.0, 0.0, 0.0, 0.0, 50.0); //z-axis
  
}
//following is defined to ensure that the right click context menu does not open on canvas when using right mouse button
document.oncontextmenu = function() {
  return false;
} 