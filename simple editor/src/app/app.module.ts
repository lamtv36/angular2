import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms"
import { AppComponent }  from './components/component';
import {MenuBarComponent} from "./components/menubar"
import {LeftSideBarComponent} from "./components/leftside"
import {CanvasComponent} from "./components/canvas"
import {RightSideComponent} from "./components/rightside"
import {MenuComponent} from "./components/menutemplate"
import {LayerComponent} from "./components/layer"
import {GroupComponent} from "./components/group"
import {StyleComponent} from "./components/style"

@NgModule({
  imports:[ 
    BrowserModule,
    FormsModule 
  ],
  declarations: [ 
    AppComponent, 
    MenuBarComponent,
    LeftSideBarComponent,
    CanvasComponent,
    RightSideComponent,
    MenuComponent,
    StyleComponent,
    LayerComponent,
    GroupComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
