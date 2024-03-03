import { ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Subscription, take } from 'rxjs';
import { AgentService } from '../service/agent.service';
import { ActivatedRoute } from '@angular/router';
import { Agent } from '../model/agent/agent';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { GlobalConstants } from 'src/environments/GlobalConstants';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  form: any;
  agent: any;
  user: any;
  position: GeolocationPosition | null = null;
  position2: GeolocationPosition | null = null;
  toggle = false;
  displayURL: any;

  currentPositionUrl: SafeResourceUrl | null = null;
  currentDummyPositionUrl: SafeResourceUrl | null = null;
  watchSubscription: Subscription | null = null;
  error: GeolocationPositionError | null = null;
  safeUrl: any;

  id: any;
  method: any;
  isButtonDisabled: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    readonly geolocation$: GeolocationService,
    private agentService: AgentService,
    public readonly domSanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.method = this.route.snapshot.paramMap.get("method");
    console.log("method==>" + this.method);

    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id==>" + this.id);
    
    this.initForm();
  }

  getCurrentPosition() {
    console.log("getCurrentPosition...");
    this.geolocation$.pipe(take(1)).subscribe(
        position => {
            this.currentPositionUrl = this.getUrl(position);
            this.changeDetectorRef.markForCheck();
            console.log("this.currentPositionUrl-->" + this.currentPositionUrl);

            this.displayURL = this.currentPositionUrl;
        },
        error => {
            console.log("getCurrentPosition error..." + error);
            this.error = error;
            this.changeDetectorRef.markForCheck();
        },
    );
}

private getUrl(position: GeolocationPosition): SafeResourceUrl {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;

  let gpsURL = `//www.openstreetmap.org/export/embed.html?bbox=${longitude -
  0.005},${latitude - 0.005},${longitude + 0.005},${latitude +
  0.005}&marker=${position.coords.latitude},${
  position.coords.longitude
}&layer=mapnik`;

 this.safeUrl = gpsURL;
 
 console.log("safeUrl--->" + this.safeUrl);
 this.submitToBE();

  return this.domSanitizer.bypassSecurityTrustResourceUrl(gpsURL,);
}

submitToBE() {
  console.log('form data--> ', this.form.value);
  this.form.value.user_id = this.id;
  this.form.value.gpsUrl = this.safeUrl;
  console.log('form data after--->: ', this.form.value);
  let serializedForm = JSON.stringify(this.form.value);
  //serializedForm.fullName = serializedForm.fullName + "2";
  console.log('serializedForm: ', this.form.value);

  this.form.patchValue(serializedForm);

  this.agentService.addPost(serializedForm);
  this.confirmationDialogService.confirm(GlobalConstants.successMessage, "Submission is successful");
  this.form.disable();
  this.isButtonDisabled = "disabled";

}
  initForm() {
    this.form = this.formBuilder.group({
      fullName: [undefined],
      email: [undefined],
      contactNumber: [undefined],
      url: [undefined],
      desc: [undefined],
      gpsUrl: [undefined],
      user_id: [undefined],
      address: new FormGroup({
        fullAddress: new FormControl(),
        country: new FormControl(),
        state: new FormControl(),
        city: new FormControl(),
      }),
    });
    
    let isView: boolean =  ( this.method == "view");
    if (isView) {
      this.agent = this.getHTTPAgent(this.id);
      this.form.disable();
      this.isButtonDisabled = true;
    }
    else {
      this.getHTTPUser(this.id);
    }
    
  }

  getHTTPAgent(id: any): any {
    this.agent = this.agentService.getHTTPAgent(id).subscribe((data: any) => {
      console.log(data); this.agent = data;

      console.log("this.form.value-->" + this.form.value);
  
      console.log("this.agent-->" + this.agent);
     this.form.patchValue(JSON.parse(this.agent));
     this.agent = JSON.parse(this.agent);

     this.byPassURLSecurity(this.agent.gpsURL);

     this.agent.disable;
      
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);
      }
    );

    return this.agent;
  }

  getHTTPUser(id: any): any {
    this.agent = this.agentService.getHTTPUser(id).subscribe((data: any) => {
      console.log(data); this.user = data;

      this.user = JSON.parse(this.user);
      console.log("this.user-->" + this.user);
      console.log("this.user email-->" + this.user.email);
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);
      }
    );

    return this.agent;
  }

  onSubmit() {

    this.getCurrentPosition();
  }

  byPassURLSecurity(url: any) {
     console.log("url from db-->" + url);
       
     this.displayURL = this.domSanitizer.bypassSecurityTrustResourceUrl(url, );
            console.log("before:--->'" + this.displayURL + "'");
      }
}

