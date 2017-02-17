import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HelloModule } from './hello/hello.module';

import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: './app.component.html',
})
export class AppComponent { }



@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    HttpModule,
    UniversalModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    HelloModule,
  ],
})
export class AppModule {
}
