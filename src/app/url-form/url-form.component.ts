import { ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Subscription, take } from 'rxjs';
import { AgentService } from '../service/agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../model/agent/agent';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { GlobalConstants } from 'src/environments/GlobalConstants';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class URLFormComponent implements OnInit {

  form: any;
  isButtonDisabled: any;
  spinner: any;

  hyperlink: any;
  noURL: any;

  constructor(
    private router: Router,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  donate() {
    this.spinner = true;
    this.router.navigateByUrl('donate');
     }

  verify() {
    this.spinner = true;
    (window as any).open("https://scamadviser.com/check-website/" + this.hyperlink);    }

  initForm() {
    this.form = this.formBuilder.group({
      desc: [undefined],
    });
    
  }

  onSubmit() {
    this.hyperlink = undefined;
    this.noURL = undefined;

    console.log('form data--> ', this.form.value);
    this.form.value.desc;
   
    let str = this.form.value.desc;

    console.log('str--> ', str);
    this.hyperlink = this.agentService.getScamURL(str);

    if (!this.hyperlink) {
      this.noURL = "No URL detected";
    }
  }
}

