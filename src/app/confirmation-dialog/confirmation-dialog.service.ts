import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstants } from 'src/environments/GlobalConstants';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    dialogSize: 'sm'|'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });

    console.log('title--->' + title);
    let isBE = GlobalConstants.errorMessage;
    console.log('is errorMessage BE--->' + isBE);
    
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;

    return modalRef.result;
  }

}
