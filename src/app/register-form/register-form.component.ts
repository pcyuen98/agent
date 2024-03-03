import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { AgentService } from '../service/agent.service';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';
import { DialogSimpleComponent } from '../dialog/dialog-simple';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  desc_email : any;
  desc_email_template = "Hi Sir/Madam, I may not available to reply your message now. If you are new to me, please fill up the form below and i will get back to you soonest possible.        ";
  dialog: any;
  form: any;
  isButtonDisabled: any;
  spinner: any;

  hyperlink: any;
  url: any;
  noURL: any;

  constructor(
    private dialogComponent: DialogSimpleComponent,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private agentService: AgentService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  verify() {
    this.spinner = true;
    }

  initForm() {
    this.form = this.formBuilder.group({
      email: [undefined],
      desc: [undefined],
    });
    
  }

  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  onSubmit() {
    this.spinner = true;
    this.desc_email = undefined;
    let email = this.form.value.email;
    this.form.value.desc = this.desc_email;
    console.log('email--> ', email);
    console.log('form data--> ', this.form.value);

    let serializedForm = JSON.stringify(this.form.value);
    console.log('serializedForm: ', this.form.value);
  
    this.form.patchValue(serializedForm);
  
    this.agentService.registerPost(serializedForm).subscribe((data: any) => {
      console.log("data===>" + data);
      this.spinner = undefined;
      let url = GlobalConstants.agentURL + data;
      this.desc_email = this.desc_email_template + url;

      this.form.controls['desc'].disabled;
      this.form.controls['desc'].setValue(this.desc_email);
      this.dialogComponent.openDialog("Registration Successful. Please check your email");  
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);  
       this.dialogComponent.openDialog(GlobalMethods.getError(error));    
      }
    );

  }
}

