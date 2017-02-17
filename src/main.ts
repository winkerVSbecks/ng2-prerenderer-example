import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import './styles/index.css';
import { main } from './app/app.browser.module';

declare const __PRODUCTION__: boolean;
declare const __TEST__: boolean;

if (__PRODUCTION__) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (!__TEST__) {
  // platformBrowserDynamic().bootstrapModule(AppModule);
  var _window: any = window;
  let bootOnce = false;
  let bootTimer = null;

  _window.bootstrap = function bootstrap() {
    clearTimeout(bootTimer);
    if (bootOnce) { return; }
    bootOnce = true;
    console.time('boot');
    main().then(() => {
      console.timeEnd('boot');
    });
  };

  setTimeout(() => {
    _window.bootstrap()
  }, 2000);
}
