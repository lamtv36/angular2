import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
require("../../../node_modules/jquery/dist/jquery.js");
require("../../../node_modules/bootstrap/dist/js/bootstrap.js");
require("./js/config.js");
require("./js/tools.js");
require("./js/loadapp.js");