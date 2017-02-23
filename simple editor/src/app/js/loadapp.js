var paper = require("./lib/paper-full.js");
var tools = require("./tools.js");
var configs = require("./config.js");
var setTextColor = configs.setTextColor;
var setStylePath = configs.setStylePath;
var config = configs.config;
var setMode = configs.setMode;

module.exports.loadView = function loadView(){
    paper.setup("canvas");
    paper.install(window);
    // call back tool
    var classTools = $("#tools");
    var i;
    for(i = 0; i < classTools[0].children.length; i++){
        classTools[0].children[i].onclick = function(){
            var tool = $(".currentTools");
            tool[0].classList.remove("currentTools");
            tool[0].classList.remove("active");
            this.classList.add("currentTools");
            this.classList.add("active");
            currentTool = tools.ToolFactory(this.id);
            currentTool.activate();
        }
    }
    //reload all path
    function reloadPath(){
        // get all layers
        var layers = paper.project.layers;
        // set current style for all layer;
        for(let layer of layers){
            for(let item of layer.children){
                if(item.className == "Group"){
                    for(let subitem of item.children){
                        if(subitem.className=="Path"){
                            subitem.style = config.STYLES;
                        }
                    }
                }
                else if(item.className=="Path"){
                    item.style = config.STYLES;
                }
                else if(item.className=="PointText"){
                    item.style = config.STYLE_TEXT;
                }
            }
        }
    }
    // set current mode
    function loadEvent(){
        var label, item, checkbox;
        // fill color
        item = $("#fillcolor")[0];
        label = item.children[0];
        checkbox = label.children[0];
        checkbox.onclick = function(event){
            let inputcolor = this.parentElement.parentElement.children[1];
            if(this.checked){
                inputcolor.removeAttribute("disabled");
                config.STYLES.fillColor = inputcolor.value;
                reloadPath();
            }
            else{
                config.STYLES.fillColor = config.BACKGROUND_COLOR;
                inputcolor.setAttribute("disabled", "disabled");
                reloadPath();
            }
        }
        item.children[1].onchange = function(event){
            config.STYLES.fillColor = this.value;
            reloadPath();
        }
        // stroke color
        item = $("#strokecolor")[0];
        label = item.children[0];
        checkbox = label.children[0];
        checkbox.onclick = function(event){
            console.log("show hide stroke color")
            let inputcolor = this.parentElement.parentElement.children[1];
            
            if(this.checked){
                inputcolor.removeAttribute("disabled");
                config.STYLES.strokeColor = inputcolor.value;
                reloadPath();
            }
            else{
                inputcolor.setAttribute("disabled", "disabled");
                config.STYLES.strokeColor = config.BACKGROUND_COLOR;
                reloadPath();
            }
        }
        item.children[1].onchange = function(event){
            config.STYLES.strokeColor = this.value;
            reloadPath();
        }
        // text color
        item = $("#textcolor")[0];
        label = item.children[0];
        checkbox = label.children[0];
        checkbox.onclick = function(event){
            let inputcolor = this.parentElement.parentElement.children[1];
            if(this.checked){
                inputcolor.removeAttribute("disabled");
                config.STYLE_TEXT.fillColor = this.value;
                reloadPath();
            }
            else{
                inputcolor.setAttribute("disabled", "disabled");
                reloadPath();
            }
        }
        item.children[1].onchange = function(event){
            config.STYLE_TEXT.fillColor = this.value;
            reloadPath();
        }
        // line width
        item = $("#linewidth")[0];
        label = item.children[0];
        checkbox = label.children[0];
        checkbox.onclick = function(event){
            let inputcolor = this.parentElement.parentElement.children[1];
            if(!this.checked){
                inputcolor.removeAttribute("disabled");
                // config.TEXT_COLOR = inputcolor.value;
            }
            else{
                inputcolor.setAttribute("disabled", "disabled");
            }
        }
        item.children[1].onchange = function(event){
            config.STYLES.strokeWidth = this.value;
            reloadPath();
        }
        // font size
        item = $("#fontsize")[0];
        label = item.children[0];
        checkbox = label.children[0];
        checkbox.onclick = function(event){
            let inputcolor = this.parentElement.parentElement.children[1];
            if(!this.checked){
                inputcolor.removeAttribute("disabled");
                config.STYLE_TEXT.fontSize = inputcolor.value;
                reloadPath();
            }
            else{
                inputcolor.setAttribute("disabled", "disabled");
            }
        }
        item.children[1].onchange = function(event){
            debugger;
            config.STYLE_TEXT.fontSize = this.value;
            reloadPath();
        }

        // font family
    item = $("#fontfamily")[0];
    label = item.children[0];
    checkbox = label.children[0];
    checkbox.onclick = function(event){
        let inputcolor = this.parentElement.parentElement.children[1].children[0];
        if(this.checked){
            inputcolor.removeAttribute("disabled");
            config.TEXT_COLOR = inputcolor.value;
            reloadPath();
        }
        else{
            inputcolor.setAttribute("disabled", "disabled");
        }
    }
    item.children[1].children[0].onchange = function(event){
        config.STYLE_TEXT.fontFamily = this.value;
        reloadPath();
    }
    }
    loadEvent();

    // menu bar right click

}
