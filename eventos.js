//Creation of the variables to use the drawingKeyboard
var keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
};

//this works to fix the line continuity in the canvas
var state = 1;
//getting the canvas propeties
var square = document.getElementById("draw_area");
var paper = square.getContext("2d");
//position, also it has those values to determine the center
var x = 450;
var y = 250;
//get the color swatch properties
var colour = document.getElementById("colour");
//get the range properties
var size = document.getElementById("size");
//get the button clear properties
var btn_clear = document.getElementById("btn_clear");
//adding the event listeners 
document.addEventListener("mousedown", drawingMouse);
document.addEventListener("keydown", drawingKeyboard);
btn_clear.addEventListener("click",clear_Canvas);



//Function to clear the canvas
function clear_Canvas(){
    paper.clearRect(0,0, square.width, square.height);
}

//function to draw in the canvas
function drawLine(colour, size, xinitial, yinitial, xfinal, yfinal, canva)
{
    canva.beginPath();
    canva.strokeStyle = colour;
    canva.lineWidth = size;
    canva.moveTo(xinitial,yinitial);
    canva.lineTo(xfinal,yfinal)
    canva.stroke();
    canva.closePath();
}
//function to stop the mousemove event
function stop(event)
{
    if (event = true)
    {

        document.removeEventListener("mousemove",drawingMouse);
        document.removeEventListener("mousedown",drawingMouse);
        //this allows us to start again
        document.addEventListener("mousedown",drawingMouse);
        document.addEventListener("keydown",drawingKeyboard);
        //to save the last cordinates
        x = event.x;
        y = event.y;

    }
}

//To draw with the mouse
function drawingMouse(event)
{
    //this is to stop the skipping lines
    if(state == 1)
    {
        y = event.offsetY;
        x = event.offsetX;
        state = 0;
        
    }

    document.addEventListener("mousemove", drawingMouse);
    //console.log(event);
    //console.log("X = "+event.x +" Y = "+event.y);
    drawLine(colour.value, size.value , x, y, event.x, event.y, paper);
    y = event.y;
    x = event.x;
    document.addEventListener("mouseup",stop);
    state = 0;
    //alert(size.value);
    
       
}

/* 
---To Draw with the keyboard
Currently it has a problem, it doesn't work after you use 
the mouse click event 
*/
function drawingKeyboard(event)
{
    //console.log(event);
    var movement = 10;


    switch(event.keyCode)
    {
        case keys.UP:
        drawLine(colour, size , x, y, x, y - movement, paper);
        y = y - movement;
        break;

        case keys.DOWN:
            drawLine(colour,size, x, y, x, y + movement, paper);
            y = y + movement;
            break;
        case keys.LEFT:
            drawLine(colour,size, x, y, x - movement, y, paper);
            x = x - movement;
            break;
        case keys.RIGHT:
            drawLine(colour,size, x, y, x + movement, y, paper);
            x = x + movement;
            break;

        default:
            //console.log("other key");
            break;
        
    }

}