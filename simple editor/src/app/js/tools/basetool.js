var paper = require("../../js/lib/paper-full.js");
var config = require("../config.js").config;


module.exports.BaseTool = class BaseTool {
    constructor(){
        this.tool = new paper.Tool();
        this.mousedown = this.mouseDown.bind(this);
        this.mousedrag = this.mouseDrag.bind(this);
        this.mouseup = this.mouseUp.bind(this);
        this.mousemove = this.mouseMove.bind(this);
        this.keydown = this.keyDown.bind(this);
        this.keyup = this.keyUp.bind(this);
        this.onFrame = this.onFrame.bind(this);
        this.tool.on(this);
    }
    mouseDown(event){
        console.log("mouse down");
    }
    mouseDrag(event){
        console.log("mouse drag");
    }
    mouseUp(event){
        console.log("mouse Up");
    }
    mouseMove(event){
        console.log("mouse move");
    }
    keyDown(event){
        console.log("mouse move");
    }
    keyUp(event){
        console.log("mouse move");
    }
    onFrame(event){
        console.log("onframe");
    }
    //build in function
    activate() {
        this.tool.activate();
    }
    // reset cursor for tool
    resetCursor(){
         console.log("reset cursor");
        $("#canvas").css({'cursor':'auto'});
     }
}