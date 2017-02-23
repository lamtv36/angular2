import {Component, Input, OnInit, ViewChild, ChangeDetectorRef} from "@angular/core";
import {LayerService} from "../services/layer.services";
import {Group} from "./group";
// import {GroupComponent} from "./group"
var paper = require("../js/lib/paper-full.js");

export class Layer {
    id: Number;
    name: string;
    layer: any;
    groups: Group[] = [];
}

export var LIST_LAYER: Layer[] = [];

@Component ({
    selector: "web-layer",
    templateUrl: './src/app/components/layer.html',
    styles:[`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    `],
    providers: [LayerService]
})

export class LayerComponent implements OnInit {
    // @ViewChild(GroupComponent) group: GroupComponent;
    index: number = 0;
    groups: Group[]=[];
    constructor(private services: LayerService, private cdr: ChangeDetectorRef) {
     }

     get layers(): Layer[]{
         if(paper.project == null) return [];
         let layers = paper.project.layers;
         if(layers.length == 1 && layers[0].name == null) layers[0].name="Default Layer";
         return layers;
     }

     get currentLayer():any{
         if(paper.project == null) return [];
         return paper.project.activeLayer;
     }
    ngAfterViewInit(){
        this.cdr.detectChanges();
    }

    ngOnInit():void{
        // this.services.getLayers().then(layers => this.layers = layers);
        
    }

    addLayer(name: string = null): void {
        if(!this.layers.length) this.index = 0;
        let nameLayer = "Layer "+ this.index;
        if(name) nameLayer = name;
        console.log("add layer");
        let layer = new paper.Layer();
        // set name layer
        layer.name = nameLayer;
        this.index += 1;
    }

    deleteCurrentLayer(){
        if(paper.project == null) return;
        if(paper.project.activeLayer) paper.project.activeLayer.remove();
    }
    
    mergeLayer(): void {
        // project is null
        if(paper.project == null) return;
        // loop all object in layers
        var i = 0;
        while(paper.project.layers.length > i){
            let layer = paper.project.layers[i];
            // check object is current layer
            console.log(layer.visible);
            if(layer == paper.project.activeLayer || !layer.visible) 
            {
                i++;
                continue;
            }
            // add item to current layer
            paper.project.activeLayer.addChildren(layer.children);
            // remove layer
            layer.remove();
        }
        
    }

    selectedLayer(layer: any){
        layer.activate();
    }

    showLayer(layer:any){
        console.log("show hide layer")
        layer.visible = !layer.visible;
    }
}