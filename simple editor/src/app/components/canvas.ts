import {Component} from '@angular/core'

@Component ({
    selector: "my-canvas",
    template:`
    <div id="mainView">
			<canvas id = "canvas" class="task" width="10000" height="10000" ressize></canvas>
	</div><!--/main canvas-->
    `
})

export class CanvasComponent{
}