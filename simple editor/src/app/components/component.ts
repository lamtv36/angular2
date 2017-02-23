import { Component, OnInit } from '@angular/core';

var loadapp = require("../js/loadapp.js");

@Component({
  selector: 'my-app',
  template: `
  	<menu-bar></menu-bar>
		<left-side></left-side>
		<my-canvas></my-canvas>
		<right-side></right-side>
		
		<menu-template></menu-template>
  `,
})
export class AppComponent implements OnInit { 
  ngOnInit() {
      loadapp.loadView();
  }
}
