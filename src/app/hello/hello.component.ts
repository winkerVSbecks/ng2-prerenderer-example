import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
  selector: 'dialog-result-example-dialog',
  template: `<h1 md-dialog-title>Dialog</h1>
  <div md-dialog-content>What would you like to do?</div>
  <div md-dialog-actions>
    <button md-button (click)="dialogRef.close('Option 1')">Option 1</button>
    <button md-button (click)="dialogRef.close('Option 2')">Option 2</button>
  </div>`,
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}


@Component({
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent {
  count: number = 12;

  selectedOption: string;

  constructor(
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
  ) {}

  openSnackBar() {
    this.snackBar.open('🍕🍕🍕 Pizza Party 🍕🍕🍕');
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
