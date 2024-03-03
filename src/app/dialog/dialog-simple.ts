import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
    message: any;
}

@Component({
  selector: 'dialog-simple',
  templateUrl: 'dialog-simple.html',
  styleUrls: ['dialog-simple.scss'],
})
export class DialogSimpleComponent {
message: any;
  constructor(
    public dialogRef: MatDialogRef<DialogSimpleComponent>,
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  openDialog(msg: any): void {
    const dialogRef = this.dialog.open(DialogSimpleComponent, {
        height: '200px', 
        width: '300px', 
        
        data: {message: msg}
      });
  
      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
  }

  onNoClick(): void {
    console.log("closing..");
    console.log("data-.." + this.data);

    console.log("msgd-.." + this.message);
    this.dialogRef.close();
  }

}