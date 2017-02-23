var paper = require("../../js/lib/paper-full.js");
var config = require("../config.js").config;
var BaseTool = require("./basetool.js").BaseTool;

var values = {
	paths: 50,
	minPoints: 5,
	maxPoints: 15,
	minRadius: 30,
	maxRadius: 90
};

var segment, path;
segment = path = null;
var movePath = false;

module.exports.EditTool = class EditTool extends BaseTool {
    constructor() {
        super();
        this.selections = [];
    }
    mouseDown(event) {
        var hitResult = paper.project.hitTest(event.point, config.HIT_OPTIONS);
        console.log(hitResult);
        if (!hitResult){
            this.deselectedAll();
            return;
        }
        if (event.modifiers.alt) {
           let index = this.selections.indexOf(hitResult);
           if(index == -1){
               hitResult.item.selected = false;
               hitResult.item.fullySelected = true;
               this.selections.push(hitResult);
           }
           else {
               this.selections.slice(index, 1);
               hitResult.fullySelected = false;
               return;
           }
        } else{
            this.deselectedAll();
             this.selections = [];
        }

        if (hitResult) {
            hitResult.item.selected = false;
            hitResult.item.fullySelected = true;
            this.selections.push(hitResult);
        }
    }
    mouseMove(event) {
        if (event.item)
            event.item.selected = true;
    }
    mouseDrag(event) {
        if(!this.selections.length) return;
        for(let item of this.selections){
             if (item.type=='segment') {
                item.segment.point.x += event.delta.x;
                item.segment.point.y += event.delta.y;
            } 
            else if(item.type=="handle-in"){
                item.segment.handleIn.x += event.delta.x;
                item.segment.handleIn.y += event.delta.y;
            }
            else if(item.type=="handle-out"){
                item.segment.handleOut.x += event.delta.x;
                item.segment.handleOut.y += event.delta.y;
            }
            else{
                item.item.position.x += event.delta.x;
                item.item.position.y += event.delta.y;
            }   
        }
    }

    deselectedAll(){
        var layers = paper.project.layers;
        for(let layer of layers){
            for(let item of layer.children){
                item.fullySelected = false;
            }
        }
        this.selections = [];
    }
}