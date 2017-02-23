import {Component, Input,ViewChild, ChangeDetectorRef} from "@angular/core";
var paper = require("../js/lib/paper-full.js");
import {Layer} from "./layer"
export class Group {
    id: Number;
    name: string;
    group: any;
    layer: any;
}

export var LIST_GROUP: Group[] = [];

@Component ({
    selector: "web-group",
    templateUrl: './src/app/components/group.html',
    styles:[`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    `],
})

export class GroupComponent{
    index: number = 0;
    get isShowgroups(): boolean {
        if(paper.project == null || !paper.project.activeLayer) return false
        return paper.project.activeLayer.visible;
    }

    get groups(): any {
        if(!paper.project || !paper.project.activeLayer) return [];
        return paper.project.activeLayer.children.filter(function(value: any){
            return value.className == "Group";
        })
    }

    get currentLayer(): any {
        if(!paper.project) return null;
        return paper.project.activeLayer;
    }

    // get current group
    get currentGroup(): any {
        if(!this.currentLayer) return null;
        return this.currentLayer.currentGroup;
    }

    // set current group
    set currentGroup(group: any){
        this.currentLayer.currentGroup = group;
    }

    addGroup(name: string = null): void {
        if(!this.currentLayer) return;
        if(!this.groups.length) this.index = 0;
        let nameGroup = "Group "+ this.index;
        if(name) nameGroup = name;
        let group = new paper.Group();
        // set name
        group.name = nameGroup;
        // set current group
        this.currentLayer.currentGroup = group;
        this.index += 1;
    }

    deleteCurrentGroup(){
        if(!this.currentGroup) return;
        // group LIST_GROUP
        var groups = this.groups;
        // index of current group
        var index = this.currentGroup.index;
        // remove current group
        this.currentGroup.remove();
        // set new group as current group
        this.currentGroup =groups[Math.abs((index-1)%groups.length)];
        
    }
    
    mergeGroup(): void {
        // loop all object in layers
        var i = 0;
        while(this.currentLayer.groups.length > 1){
            let item = this.currentLayer.groups[i];
            // check object is current layer
            if(item == this.currentGroup) 
            {
                i++;
                continue;
            }
            // add item to current layer
            this.currentGroup.group.addChildren(item.layer.children);
            // remove layer
            // this.deleteGroup(item);
        }
        
    }

    selectedGroup(group: any){
        this.currentLayer.currentGroup = group;
        group.selected = true;
    }

    showGroup(group:any){
        console.log("show hide layer")
        group.visible = !group.visible;
    }
}