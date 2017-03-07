import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HelloRoutingModule } from './hello-routing.module';

import { HelloComponent, DialogResultExampleDialog } from './hello.component';

import { MdButtonModule } from '@angular/material/button';
import { MdDialogModule } from '@angular/material/dialog';
import { MdSnackBarModule } from '@angular/material/snack-bar';
import { MdSidenavModule } from '@angular/material/sidenav';
import { MdProgressBarModule } from '@angular/material/progress-bar';
import { MdInputModule } from '@angular/material/input';
import { MdCheckboxModule } from '@angular/material/checkbox';
import { MdButtonToggleModule } from '@angular/material/button-toggle';

import { LiveAnnouncer } from '@angular/material/core/a11y/live-announcer';

export class FakeLiveAnnouncer {
  announce() {
  }
}

@NgModule({
  imports: [
    SharedModule,
    HelloRoutingModule,
    MdButtonModule.forRoot(),
    MdDialogModule.forRoot(),
    MdSnackBarModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdProgressBarModule.forRoot(),
    MdInputModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdButtonToggleModule.forRoot(),
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
