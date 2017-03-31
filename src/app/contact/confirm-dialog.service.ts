import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

@Injectable()
export class ConfirmDialogService {
  constructor(
    private _dialog: MdDialog
  ) { }

  public confirm(): Observable<boolean> {
    let dialogRef: MdDialogRef<ConfirmDialogComponent>;
    dialogRef = this._dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      width: '480px',
      height: '144px',
      position: {
        top: '200px',
        left: 'calc(50% - 240px)'
      }
    });
    return dialogRef.afterClosed();
  }

}

