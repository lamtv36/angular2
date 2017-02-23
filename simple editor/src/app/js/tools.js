var paper = require("./lib/paper-full.js");
debugger;
var PenTool = require("./tools/pentool.js").PenTool;
var EditTool = require("./tools/edittool.js").EditTool;
var TextTool = require("./tools/texttool.js").TextTool;
// get tool
var tools = {};
module.exports.ToolFactory = function ToolFactory(toolName){
    // var canvas = document.getElementById("canvas");
    var tool = tools[toolName];
    if(tool == undefined){
         if(toolName == "pt")
            tool = new PenTool();
        else if(toolName == "edt")
            tool = new EditTool();
        else if(toolName == "tt")
            tool = new TextTool();
        if(tool != undefined) tools[toolName] = tool;
    }
    tool.resetCursor();
    return tool;
}