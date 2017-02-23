import {Component, OnInit} from "@angular/core";
import {StyleService} from "../services/style.services";

// object font
export class Font {
    fontFamily: string;
}
  
// define list font 
export var LIST_FONT: Font[] = [
    {fontFamily: "Arial"},
    {fontFamily: "Courier"},
    {fontFamily: "Courier New"},
    {fontFamily: "Cuckoo"},
    {fontFamily: "Heather"},
    {fontFamily: "Westminster"},
    {fontFamily: "Verdana"},
    {fontFamily: "Univers"},
    {fontFamily: "Tubular"},
    {fontFamily: "Times"},
    {fontFamily: "Times New Roman"},
    {fontFamily: "Times New Roman PS"},
    {fontFamily: "Tahoma"},
    {fontFamily: "Serifa BT"},
   
]


@Component ({
    selector: "web-style",
    templateUrl: './src/app/components/style.html',
    providers: [StyleService]
})

export class StyleComponent implements OnInit {
    listFonts: Font[];
    constructor(private services:StyleService){}

    ngOnInit():void{
        this.services.getFonts().then(fonts => this.listFonts = fonts);
    }
    // fill color

    hasFillColor(state: boolean){

    }
    setStrokeColor(){

    }
}