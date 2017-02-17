import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import {
  isBrowser,
  UniversalModule,
  platformUniversalDynamic,
} from 'angular2-universal/browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HelloModule } from './hello/hello.module';

import { AppComponent } from './app.component';

export const platform = platformUniversalDynamic();


@NgModule({
  imports: [
    UniversalModule,
    AppRoutingModule,
    CoreModule,
    HelloModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}

export function main() {
  console.log('ℹ️ isBrowser', isBrowser);
  return platform.bootstrapModule(AppModule);
}
