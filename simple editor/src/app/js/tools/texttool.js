var paper = require("../../js/lib/paper-full.js");
var config = require("../config.js").config;
var BaseTool = require("./basetool.js").BaseTool;


module.exports.TextTool = class TextTool extends BaseTool{
    constructor(){
        super();
        this.loadView();
        this.cText = null;
    }

    loadView(){
        console.log("text tool");
        //set position of canvas
    }

    mouseDown(event){
        var hit_result = paper.project.hitTest(event.point, config.HIT_OPTIONS);
        if(hit_result){
            this.cText = hit_result.item;
        }
        else{
            this.cText = new paper.PointText(new Point(event.point));
            this.cText.style = config.STYLE_TEXT;
            this.cText.fullySelected = true;
        }
    }

    mouseUp(event){

    }
;
    mouseDrag(event){
        
    }

    keyDown(event){
        console.log(event.key)
        console.log(event.character)
        if(event.key == "delete"||event.key == "backspace"){
            if(this.cText){
                this.cText.content = this.cText.content.slice(0, this.cText.content.length - 1)
            }else{
                this.cText = null;
            }
        }
        if(event.key == "control"){
            return;
        }
        if(this.cText){
            console.log(event);
            this.cText.content += event.character;
        }
    }

    keyUp(event){

    }

    resetCursor(){
        $("#canvas").css({'cursor':'text'});
    }
}