import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/bootloader';

import './styles/index.css';
import { AppBrowserModule } from './app/app.browser.module';

declare const __PRODUCTION__: boolean;
declare const __DEV__: boolean;

if (__PRODUCTION__) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (__PRODUCTION__) {
  const main = () => {
    platformBrowserDynamic().bootstrapModule(AppBrowserModule);
  };

  bootloader(main);
}

if (__DEV__) {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule);
}
