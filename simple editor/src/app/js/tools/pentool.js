var paper = require("../../js/lib/paper-full.js");
var config = require("../config.js").config;
var BaseTool = require("./basetool.js").BaseTool;

module.exports.PenTool = class PenTool extends BaseTool{
    constructor(){
        super();
        //mode set type segement 
        //path of contour
        this.path=null;
        this.currentMouse = null;
        //mouse down point
        this.mouseClick = null;
        //last point
        this.lastPoint = null;
        // mouse drag point
        this.dragPoint = null;
        //mouse move point
        this.movePoint = null;
        this.layer = null;
    }
    //method create new path
    newPath() {
        console.log("add new path");
        var path = new paper.Path();    //create new path from API of paperjs
        path.onDoubleClick = (event)=> {
            this.path.closed = true;
        }
        // get current layer
        let group = paper.project.activeLayer.currentGroup;
        if(group){
            group.addChild(path);
        }
        path.style = config.STYLES;
        return path;
    }
    //path of contour
    mouseDown(event) {
        var hit_result;
        this.mouseClick = new paper.Point(event.point);
        //create new contour or new path
        if(this.path==null || this.path.closed || this.layer != paper.project.activeLayer){
            this.layer = paper.project.activeLayer;
            if(this.path) this.path.fullySelected = false;
            this.path = this.newPath();
            this.path.moveTo(this.mouseClick);
            this.currentMouse = null;
            this.lastPoint = null;
        }else if(this.closed){
            this.path.closePath();
        }
        // add first point for contour when mouse click is null
        if (this.currentMouse == null){
            this.currentMouse = new paper.Point(event.point); // create new point from paperjs API and set for mouse click
            this.mouseClick = null;
        }
        //draw a line
        else {
            // find point in current point
            hit_result = paper.project.hitTest(event.point, config.HIT_OPTIONS);
            if(this.lastPoint != null){
                this.path.lineTo(this.mouseClick);
            }
        }
        this.path.fullySelected = true;
        
    }
    mouseDrag(event) {
        var point = new paper.Point(event.point);
        var lastSegment, x, y, presegment;
        if(this.mouseClick == null) return;
        lastSegment = this.path.lastSegment;
        if(config.CURRENT_MODE == config.MODE.CUBIC){
            presegment = this.path.segments[this.path.segments.length - 2];
            presegment.handleOut.x = this.lastPoint.x;
            presegment.handleOut.y = this.lastPoint.y;
        }
        var dx = point.x - lastSegment.point.x;
        var dy = point.y - lastSegment.point.y;
        lastSegment.handleIn.x = -dx;
        lastSegment.handleIn.y = -dy;
        this.path.fullySelected = true;
    }

    mouseUp(event){
        var point = new paper.Point(event.point);
        var lastSegment = this.path.lastSegment;
        this.lastPoint = new paper.Point(point.x - lastSegment.point.x, point.y - lastSegment.point.y);
        this.mouseClick = null;
        this.path.fullySelected = true;
    }

    mouseMove(event) {
        var hit_result = paper.project.hitTest(event.point, config.HIT_OPTIONS);
        this.closed = false;
        if(hit_result && this.path.segments.indexOf(hit_result.segment) == 0){
            var path = (new paper.Path.Circle({
                center: hit_result.segment.point,
                radius: 7,
                fillColor: 'blue'
            })).removeOnMove();
            this.closed = true;
        }
    }
}