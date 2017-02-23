import {Component, ViewChild, ChangeDetectorRef} from "@angular/core"
import {LayerComponent} from "./layer"
import {GroupComponent} from "./group"
var paper = require("../js/lib/paper-full.js");

@Component ({
    selector: "right-side",
    template:  `
    <div id="rightSide">
        <div class="panel-group">
            <web-layer></web-layer>
            <web-group></web-group>
            <web-style></web-style>
            <div class="panel panel-primary">
                <div class="panel-heading" data-toggle="collapse" data-target="#panel-option">Options</div>
                <div id="panel-option" class="panel-body" style="padding: 1px 1px 1px 1px;">
                    <div class="container-fluid">
                    </div> <!--/mode curve -->
                </div>
            </div> <!--/option panel -->
        </div> <!--/panel group -->
    </div> <!--/right side bar -->
    `,
    
})

export class RightSideComponent{
    // init reference to group component and layer component
    @ViewChild(GroupComponent) group: GroupComponent;
    @ViewChild(LayerComponent) layer: LayerComponent;
    constructor(private cdr: ChangeDetectorRef){
        
    }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  hasShowGroups(){
    //   if(this.layer.currentLayer != null) return this.layer.currentLayer.layer.visible;
      return true;
  }

  getCurrentLayer(){
      if(paper.project) {
          if(paper.project.activeLayer.name == null) paper.project.activeLayer.name = "Default Layer";
          return paper.project.activeLayer;
      }
  }
}