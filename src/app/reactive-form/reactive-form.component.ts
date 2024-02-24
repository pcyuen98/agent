import { ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Subscription, take } from 'rxjs';
import { AgentService } from '../service/agent.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  form: any;
  agent: any;
  position: GeolocationPosition | null = null;
  position2: GeolocationPosition | null = null;
  toggle = false;
  sampleURL: any = "//www.openstreetmap.org/export/embed.html?bbox=101.68899520000001,3.0765351,101.6989952,3.0865351&marker=3.0815351,101.6939952&layer=mapnik";
  
  currentPositionUrl: SafeResourceUrl | null = null;
  currentDummyPositionUrl: SafeResourceUrl | null = null;
  watchSubscription: Subscription | null = null;
  error: GeolocationPositionError | null = null;
  safeUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    readonly geolocation$: GeolocationService,
    private agentService: AgentService,
    public readonly domSanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentDummyPosition();

    this.agent = this.getHTTPAgent();
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    console.log("getCurrentPosition...");
    this.geolocation$.pipe(take(1)).subscribe(
        position => {
            this.currentPositionUrl = this.getUrl(position);
            this.changeDetectorRef.markForCheck();
            console.log("this.currentPositionUrl-->" + this.currentPositionUrl);

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
  return this.domSanitizer.bypassSecurityTrustResourceUrl(gpsURL,);
}

  initForm() {
    this.form = this.formBuilder.group({
      fullName: [undefined],
      email: [undefined],
      contactNumber: [undefined],
      address: new FormGroup({
        fullAddress: new FormControl(),
        country: new FormControl(),
        state: new FormControl(),
        city: new FormControl(),
      }),
    });

    this.form.disable();
  }

  getHTTPAgent(): any {
    this.agent = this.agentService.getHTTPAgent().subscribe((data: any) => {
      console.log(data); this.agent = data;

      

      console.log("this.form.value-->" + this.form.value);
  
      console.log("this.agent-->" + this.agent);
     this.form.patchValue(JSON.parse(this.agent));


      this.agent.disable;
      
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);
      }
    );

    return this.agent;
  }

  onSubmit() {
    console.log('form data: ', this.form.value);

    let serializedForm = JSON.stringify(this.form.value);
    //serializedForm.fullName = serializedForm.fullName + "2";
    console.log('serializedForm: ', this.form.value);

    this.form.patchValue(serializedForm);
    this.form.value.fullName = "fullname2";
    console.log('form data after: ', this.form.value);
  }

  private getUrlDummy(): SafeResourceUrl {
    const longitude = 101.7182277;
    const latitude = 3.121707;

    return this.domSanitizer.bypassSecurityTrustResourceUrl(
        `//www.openstreetmap.org/export/embed.html?bbox=${longitude -
            0.005},${latitude - 0.005},${longitude + 0.005},${latitude +
            0.005}&marker=${latitude},${
            longitude
        }&layer=mapnik`,
    );
}

  getCurrentDummyPosition() {

            this.sampleURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.sampleURL, );
            console.log("before:--->'" + this.sampleURL + "'");
      }
}

