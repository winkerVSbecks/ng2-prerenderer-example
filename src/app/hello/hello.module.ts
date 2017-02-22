import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HelloRoutingModule } from './hello-routing.module';

import { HelloComponent, DialogResultExampleDialog } from './hello.component';

import { MdButtonModule } from '@angular/material/button';
import { MdDialogModule } from '@angular/material/dialog';
import { MdSnackBarModule } from '@angular/material/snack-bar';
import { MdSidenavModule } from '@angular/material/sidenav';
import { MdProgressBarModule } from '@angular/material/progress-bar';
// checkbox
// input
// md-button-toggle-group
// md-input-container

import { LiveAnnouncer } from '@angular/material/core/a11y/live-announcer';

import { FakeLiveAnnouncer } from './bs';

@NgModule({
  imports: [
    SharedModule,
    HelloRoutingModule,
    MdButtonModule.forRoot(),
    MdDialogModule.forRoot(),
    MdSnackBarModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdProgressBarModule.forRoot(),
  ],
  declarations: [
    HelloComponent,
    DialogResultExampleDialog,
  ],
  entryComponents: [DialogResultExampleDialog],
  providers: [{
    provide: LiveAnnouncer, useClass: FakeLiveAnnouncer,
  }],
})
export class HelloModule { }
