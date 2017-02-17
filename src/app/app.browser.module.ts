import { NgModule } from '@angular/core';
import '../../prerender/universal-hotfix.ts';

import { UniversalModule, } from 'angular2-universal/browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HelloModule } from './hello/hello.module';

import { AppComponent } from './app.component';


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
export class AppBrowserModule {
}
